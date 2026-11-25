import { useCallback, useEffect, useRef, useState } from "react";
import { API_BASE_URL } from "../../constants/api/apiRoute";

const PROBE_URL = API_BASE_URL.PROD;
const PROBE_TIMEOUT_MS = 5000;
const OFFLINE_RETRY_MS = 10000;

/**
 * Resolves true when the API host answers, false when the request fails or
 * times out. `no-cors` keeps the check free of CORS rules: an opaque reply
 * still proves the network path works.
 */
async function probeConnection() {
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    return false;
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), PROBE_TIMEOUT_MS);
  try {
    await fetch(PROBE_URL, {
      method: "HEAD",
      mode: "no-cors",
      cache: "no-store",
      signal: controller.signal,
    });
    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Tracks whether the app can reach the internet.
 *
 * The browser's online/offline events give the first signal. Going offline is
 * trusted at once; coming back online is confirmed by a request to the API
 * host, and while offline that request repeats in the background so the app
 * notices a restored connection even when no event fires.
 *
 * Returns { isOnline, isChecking, retry }.
 */
function useNetworkStatus({ debounceMs = 500 } = {}) {
  const [isOnline, setIsOnline] = useState(() =>
    typeof navigator === "undefined" ? true : navigator.onLine,
  );
  const [isChecking, setIsChecking] = useState(false);
  const debounceRef = useRef(null);
  const checkingRef = useRef(false);
  const mountedRef = useRef(true);

  const retry = useCallback(async () => {
    if (checkingRef.current) return;
    checkingRef.current = true;
    setIsChecking(true);
    const reachable = await probeConnection();
    checkingRef.current = false;
    if (!mountedRef.current) return;
    setIsChecking(false);
    setIsOnline(reachable);
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    const schedule = (fn) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(fn, debounceMs);
    };
    const handleOffline = () => schedule(() => setIsOnline(false));
    const handleOnline = () => schedule(retry);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      mountedRef.current = false;
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [debounceMs, retry]);

  // While offline, keep checking quietly in the background.
  useEffect(() => {
    if (isOnline) return undefined;
    const id = setInterval(retry, OFFLINE_RETRY_MS);
    return () => clearInterval(id);
  }, [isOnline, retry]);

  return { isOnline, isChecking, retry };
}

export default useNetworkStatus;
