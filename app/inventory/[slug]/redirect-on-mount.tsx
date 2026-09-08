"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/** `replace`, not `push` — the legacy URL should not sit in the back button. */
export default function RedirectOnMount({ to }: { to: string }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(to);
  }, [router, to]);

  return null;
}
