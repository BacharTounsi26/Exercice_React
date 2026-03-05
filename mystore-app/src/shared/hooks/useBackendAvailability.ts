import { useCallback, useEffect, useState } from "react";
import { API_URL } from "@/shared/utils/apiBase";

const HEALTHCHECK_TIMEOUT_MS = 3000;

export function useBackendAvailability() {
  const [isChecking, setIsChecking] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);

  const check = useCallback(async () => {
    setIsChecking(true);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), HEALTHCHECK_TIMEOUT_MS);

    try {
      await fetch(`${API_URL}/categories?_limit=1`, {
        signal: controller.signal,
        cache: "no-store",
      });
      setIsAvailable(true);
    } catch {
      setIsAvailable(false);
    } finally {
      clearTimeout(timeout);
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    check();
  }, [check]);

  return { isChecking, isAvailable, retry: check };
}
