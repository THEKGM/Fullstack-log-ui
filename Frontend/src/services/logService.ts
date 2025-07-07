import axios from "axios";
import type { LogEntry, LogFilters } from "../types";

const API_BASE = import.meta.env.VITE_API_BASE_URL; // adjust if needed

export const fetchLogs = async (filters: LogFilters): Promise<LogEntry[]> => {
  const response = await axios.get(`${API_BASE}/logs`, { params: filters });
  return response.data;
};
