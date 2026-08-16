import { useState, useEffect } from "react";

/**
 * Returns true only after mounting on the client.
 * Guarantees SSR rendering compatibility with no browser global access during render.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}
