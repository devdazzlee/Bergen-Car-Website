import { resolveApiBase } from "./api-base";

export type DealerRating = {
  combinedRating: number;
  totalReviews: number;
};

export function isLiveDealerRating(
  rating: DealerRating | null | undefined,
): rating is DealerRating {
  return (
    !!rating &&
    Number.isFinite(rating.combinedRating) &&
    rating.combinedRating > 0 &&
    rating.combinedRating <= 5 &&
    Number.isFinite(rating.totalReviews) &&
    rating.totalReviews > 0
  );
}

export async function getDealerRating(): Promise<DealerRating | null> {
  const url = `${resolveApiBase()}/api/rating`;
  try {
    const res = await fetch(url, {
      cache: "force-cache",
    });
    if (!res.ok) return null;
    const body = (await res.json()) as { data?: DealerRating | null };
    return isLiveDealerRating(body.data) ? body.data : null;
  } catch {
    return null;
  }
}
