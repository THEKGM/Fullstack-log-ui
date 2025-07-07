import React from "react";
import type { LogEntry } from "../types";

interface Props {
  logs: LogEntry[];
  loading: boolean;
  noResults: boolean;
}

// Dynamic Color panel
const getRowStyle = (level: string) => {
  switch (level) {
    case "error":
      return "bg-red-50 text-red-700 border-red-500";
    case "warning":
      return "bg-yellow-50 text-yellow-700 border-yellow-500";
    case "info":
      return "bg-blue-50 text-blue-700 border-blue-500";
    case "debug":
      return "bg-gray-50 text-gray-600 border-gray-500";
    default:
      return "border-transparent";
  }
};

export const LogTable: React.FC<Props> = ({ logs, loading, noResults }) => {
  // Call when logs are load (Logs Skeleton)
  if (loading)
    return (
      <div className="overflow-x-auto border rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Head */}
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              {[
                "Level",
                "Timestamp",
                "Message",
                "Resource ID",
                "Trace Info",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-sm font-medium text-gray-500"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table body */}
          <tbody className="divide-y divide-gray-200 animate-pulse">
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="bg-white">
                {[20, 28, 56, 24, 40].map((w, j) => (
                  <td key={j} className="px-4 py-3">
                    <div className={`h-4 w-${w} bg-gray-300 rounded`}></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

  // Call when No results found
  if (noResults)
    return (
      <div className="flex flex-col items-center justify-center text-center p-6 rounded-lg border border-dashed border-gray-300 bg-gray-50 text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 mb-2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75h.008v.008H9.75V9.75zM14.25 9.75h.008v.008h-.008V9.75zM12 15.75a6 6 0 100-12 6 6 0 000 12z"
          />
        </svg>
        <p className="text-lg font-medium mb-1">No logs found</p>
        <p className="text-sm text-gray-500">
          Try adjusting the filters or date range.
        </p>
      </div>
    );

  // Call when logs has no length
  if (logs.length === 0) {
    return (
      <div className="text-center text-gray-400 p-10 border border-dashed rounded-lg">
        <p>No logs available yet.</p>
      </div>
    );
  }

  return (
    <div className="border rounded shadow overflow-auto max-h-[50vh]">
      <table className="min-w-full table-fixed text-sm">
        {/* Table head */}
        <thead className="sticky top-0 bg-gray-100 text-gray-700 z-10">
          <tr className="border-l-4 border-gray-500 uppercase tracking-wider">
            {[
              "Level",
              "Message",
              "Resource",
              "Timestamp",
              "Trace ID",
              "Span ID",
              "Commit",
              "Metadata",
            ].map((h, i) => (
              <th key={i} className="p-3">
                {h}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table body */}
        <tbody className="divide-y">
          {logs.map((log, i) => (
            <tr
              key={i}
              className={`border-l-4  ${getRowStyle(
                log.level
              )} hover:bg-gray-200 transition-colors`}
            >
              <td className="p-3 font-medium">{log.level}</td>
              <td className="p-3 break-words max-w-xs truncate">
                {log.message}
              </td>
              <td className="p-3">{log.resourceId}</td>
              <td className="p-3 whitespace-nowrap">
                {new Date(log.timestamp).toLocaleString()}
              </td>
              <td className="p-3 break-all">{log.traceId}</td>
              <td className="p-3 break-all">{log.spanId}</td>
              <td className="p-3 break-all">{log.commit}</td>
              <td className="p-3 whitespace-pre-wrap text-xs text-gray-800">
                {JSON.stringify(log.metadata)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
