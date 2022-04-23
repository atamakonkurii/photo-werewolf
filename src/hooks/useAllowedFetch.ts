import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

export const useAllowedFetch = () => {
  const router = useRouter();
  const [isAllowedFetch, setIsAllowedFetch] = useState<boolean>(false);

  useEffect(() => {
    if (router.asPath !== router.route) {
      setIsAllowedFetch(true);
    }
  }, [router]);

  return isAllowedFetch;
};
