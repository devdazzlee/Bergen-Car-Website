const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || "http://localhost:4001";

export type FieldErrors = Record<string, string>;

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly fields?: FieldErrors,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type ErrorBody = {
  error?: string;
  fields?: FieldErrors;
};

async function request<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });

  const body = (await res.json().catch(() => ({}))) as T & ErrorBody;

  if (!res.ok) {
    throw new ApiError(
      body.error || "Something went wrong. Please try again.",
      res.status,
      body.fields,
    );
  }

  return body;
}

function authHeaders(token: string): HeadersInit {
  return { Authorization: `Bearer ${token}` };
}

export function submitLead(payload: Record<string, unknown>) {
  return request<{ success: true; id: string; message: string }>("/api/leads", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function subscribeNewsletter(email: string) {
  return request<{ success: true; id: string; message: string }>(
    "/api/newsletter",
    {
      method: "POST",
      body: JSON.stringify({ email }),
    },
  );
}

export type DashboardForm =
  | "contact"
  | "location-contact"
  | "sell"
  | "trade"
  | "financing"
  | "service"
  | "test-drive"
  | "newsletter";

export type DashboardFormFilter = "all" | DashboardForm;

export type DashboardInquiry = {
  id: string;
  form: DashboardForm;
  formLabel: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  createdAt: string;
  details: Array<{ label: string; value: string }>;
};

export type DashboardStats = {
  total: number;
  byForm: Record<DashboardForm, number>;
};

export type DashboardInquiriesResponse = {
  items: DashboardInquiry[];
  total: number;
  page: number;
  limit: number;
  stats: DashboardStats;
};

export function dashboardLogin(email: string, password: string) {
  return request<{ token: string; email: string }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function fetchDashboardSession(token: string) {
  return request<{ email: string }>("/api/auth/me", {
    headers: authHeaders(token),
  });
}

export function fetchDashboardInquiries(
  token: string,
  params: {
    type?: DashboardFormFilter;
    q?: string;
    from?: string;
    to?: string;
    page?: number;
    limit?: number;
  } = {},
) {
  const search = new URLSearchParams();
  if (params.type && params.type !== "all") search.set("type", params.type);
  if (params.q) search.set("q", params.q);
  if (params.from) search.set("from", params.from);
  if (params.to) search.set("to", params.to);
  if (params.page) search.set("page", String(params.page));
  if (params.limit) search.set("limit", String(params.limit));
  const query = search.toString();
  return request<DashboardInquiriesResponse>(
    `/api/dashboard/inquiries${query ? `?${query}` : ""}`,
    { headers: authHeaders(token) },
  );
}

export async function downloadDashboardExport(
  token: string,
  params: {
    type?: DashboardFormFilter;
    q?: string;
    from?: string;
    to?: string;
  } = {},
  format: "csv" | "pdf" = "csv",
) {
  const search = new URLSearchParams();
  if (params.type && params.type !== "all") search.set("type", params.type);
  if (params.q) search.set("q", params.q);
  if (params.from) search.set("from", params.from);
  if (params.to) search.set("to", params.to);
  const query = search.toString();
  const path =
    format === "pdf" ? "/api/dashboard/export/pdf" : "/api/dashboard/export";
  const res = await fetch(`${API_BASE}${path}${query ? `?${query}` : ""}`, {
    headers: authHeaders(token),
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as ErrorBody;
    throw new ApiError(
      body.error || "Could not export inquiries.",
      res.status,
      body.fields,
    );
  }
  const blob = await res.blob();
  const stamp = new Date().toISOString().slice(0, 10);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `bergen-inquiries-${stamp}.${format}`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}
