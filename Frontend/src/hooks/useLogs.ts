import { useCallback, useEffect, useState } from "react";
import { fetchLogs } from "../services/logService";
import type { LogEntry, LogFilters } from "../types";

export const useLogs = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filters, setFilters] = useState<LogFilters>({});
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const loadLogs = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchLogs(filters);
      setLogs(data);
      setNoResults(data.length === 0);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Use effect to fetch the logs data
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      loadLogs();
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [filters, loadLogs]);

  const clearFilters = () => setFilters({});

  return {
    logs,
    filters,
    setFilters,
    clearFilters,
    loading,
    noResults,
    refetchLogs: loadLogs,
  };
};
