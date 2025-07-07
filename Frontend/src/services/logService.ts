import axios from "axios";
import type { LogEntry, LogFilters } from "../types";

const API_BASE = import.meta.env.VITE_API_BASE_URL; // adjust if needed

// For fetch/get logs
export const fetchLogs = async (filters: LogFilters): Promise<LogEntry[]> => {
  const response = await axios.get(`${API_BASE}/logs`, { params: filters });
  return response.data;
};

// For create log
export const createLog = async (log: LogEntry) => {
  const res = await axios.post(`${API_BASE}/logs`, log);
  return res.data;
};
