import React from "react";
import type { LogFilters } from "../types";

interface Props {
  filters: LogFilters;
  setFilters: (filters: LogFilters) => void;
  clearFilters: () => void;
}

export const FilterBar: React.FC<Props> = ({
  filters,
  setFilters,
  clearFilters,
}) => {
  // Update filter function
  const updateFilter = (key: keyof LogFilters, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="bg-slate-500 rounded-lg shadow p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* Message field */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Message</label>
          <input
            type="text"
            placeholder="Search message..."
            className="rounded p-2 border border-gray-300"
            value={filters.message || ""}
            onChange={(e) => updateFilter("message", e.target.value)}
          />
        </div>

        {/* Level Field */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Level</label>
          <select
            className="rounded p-2 border border-gray-300"
            value={filters.level || ""}
            onChange={(e) => updateFilter("level", e.target.value)}
          >
            <option value="">All Levels</option>
            <option value="error">Error</option>
            <option value="warning">Warn</option>
            <option value="info">Info</option>
            <option value="debug">Debug</option>
          </select>
        </div>

        {/* Resource ID Field */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Resource ID</label>
          <input
            type="text"
            placeholder="e.g., server-123"
            className="rounded p-2 border border-gray-300"
            value={filters.resourceId || ""}
            onChange={(e) => updateFilter("resourceId", e.target.value)}
          />
        </div>

        {/* Start Timestamp Field */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Start Timestamp</label>
          <input
            type="datetime-local"
            className="rounded p-2 border border-gray-300"
            value={filters.timestamp_start || ""}
            onChange={(e) => updateFilter("timestamp_start", e.target.value)}
          />
        </div>

        {/* End Timestamp Field */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">End Timestamp</label>
          <input
            type="datetime-local"
            className="rounded p-2 border border-gray-300"
            value={filters.timestamp_end || ""}
            onChange={(e) => updateFilter("timestamp_end", e.target.value)}
          />
        </div>
      </div>

      {/* Clear Filter Trigger */}
      <div className="mt-4 text-right">
        <button
          onClick={clearFilters}
          className="bg-red-100 text-red-700 px-4 py-2 rounded hover:bg-red-200 hover:border-transparent hover:scale-105 transition-all"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};
