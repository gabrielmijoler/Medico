"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import useNavigationLoading from "@/app/hooks/useNavigationLoading";

export default function RouterLoading() {
  const { startNavigating } = useNavigationLoading();
  const router = useRouter();

  useEffect(() => {
    const _push = router.push.bind(router);
    const _replace = router.replace.bind(router);

    router.push = (href, options) => {
      startNavigating(() => {
        _push(href, options);
      });
    };
    router.replace = (href, options) => {
      startNavigating(() => {
        _replace(href, options);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
