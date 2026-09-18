"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { WeaknessDashboard } from "@/lib/types";

interface CacheEntry {
  data: WeaknessDashboard;
  timestamp: number;
}

let globalCache: CacheEntry | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache

export function useWeakness() {
  const [data, setData] = useState<WeaknessDashboard | null>(globalCache?.data || null);
  const [isLoading, setIsLoading] = useState<boolean>(!globalCache);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async (forceRefresh = false) => {
    // Check in-memory cache
    const now = Date.now();
    if (!forceRefresh && globalCache && now - globalCache.timestamp < CACHE_TTL_MS) {
      setData(globalCache.data);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/weakness/dashboard", {
        headers: { "Cache-Control": forceRefresh ? "no-cache" : "default" },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch dashboard: ${res.statusText}`);
      }

      const json: WeaknessDashboard = await res.json();
      globalCache = { data: json, timestamp: now };
      setData(json);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const refetch = useCallback(() => {
    return fetchDashboard(true);
  }, [fetchDashboard]);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}
