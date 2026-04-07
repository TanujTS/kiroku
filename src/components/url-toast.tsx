"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function UrlToast() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const error = searchParams?.get("error");
    const toastMsg = searchParams?.get("toast");

    if (error === "unauthorized") {
      toast.error("Please login to access the dashboard!");
      cleanUrl("error");
    }

    if (toastMsg === "welcome_back") {
      toast.success("Welcome back!");
      cleanUrl("toast");
    }

    function cleanUrl(param: string) {
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.delete(param);
        router.replace(url.pathname + url.search, { scroll: false });
      }
    }
  }, [searchParams, router]);

  return null;
}
