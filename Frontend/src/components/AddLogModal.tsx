import React, { useState } from "react";
import { createLog } from "../services/logService";
import type { LogEntry } from "../types";

interface Props {
  onLogAdded: () => void;
}

const defaultLog: Partial<LogEntry> = {
  level: "info",
  message: "",
  resourceId: "",
  timestamp: new Date().toISOString().slice(0, 16),
  traceId: "",
  spanId: "",
  commit: "",
  metadata: { parentResourceId: "" },
};

export const AddLogModal: React.FC<Props> = ({ onLogAdded }) => {
  const [open, setOpen] = useState(false);
  const [log, setLog] = useState<Partial<LogEntry>>(defaultLog);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Update logs json file
  const updateField = (field: keyof LogEntry, value: unknown) => {
    setLog((prev) => ({ ...prev, [field]: value }));
  };

  // Handle add log submit
  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      if (
        !log.level ||
        !log.message ||
        !log.resourceId ||
        !log.timestamp ||
        !log.traceId ||
        !log.spanId ||
        !log.commit
      ) {
        setError("Please fill all required fields.");
        setLoading(false);
        return;
      }

      const payload: LogEntry = {
        ...(log as LogEntry),
        metadata: { parentResourceId: log.metadata?.parentResourceId || "" },
      };

      await createLog(payload);
      onLogAdded();
      setOpen(false);
      setLog(defaultLog);
    } catch (e) {
      console.log("Error: ", e);
      setError("Failed to add log. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
        onClick={() => setOpen(true)}
      >
        + Add Log
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-gray-500 w-full max-w-lg p-6 rounded-lg shadow-xl relative">
            <h2 className="text-xl font-bold mb-4">Add New Log Entry</h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-left">
                <label className="text-sm font-semibold">Level</label>
                <select
                  className="w-full p-2 border rounded mt-2"
                  value={log.level}
                  onChange={(e) => updateField("level", e.target.value)}
                >
                  <option value="" disabled>
                    Select log level
                  </option>
                  <option value="error">Error</option>
                  <option value="warn">Warn</option>
                  <option value="info">Info</option>
                  <option value="debug">Debug</option>
                </select>
              </div>

              <div className="text-left">
                <label className="text-sm font-semibold">Timestamp</label>
                <input
                  type="datetime-local"
                  className="w-full p-2 border rounded mt-2"
                  value={log.timestamp?.slice(0, 16) || ""}
                  onChange={(e) =>
                    updateField(
                      "timestamp",
                      new Date(e.target.value).toISOString()
                    )
                  }
                />
              </div>

              <div className="col-span-2 text-left">
                <label className="text-sm font-semibold">Message</label>
                <input
                  type="text"
                  placeholder="Describe the log message clearly"
                  className="w-full p-2 border rounded mt-2"
                  value={log.message}
                  onChange={(e) => updateField("message", e.target.value)}
                />
              </div>

              <div className="text-left">
                <label className="text-sm font-semibold">Resource ID</label>
                <input
                  type="text"
                  placeholder="e.g., resource_123"
                  className="w-full p-2 border rounded mt-2"
                  value={log.resourceId}
                  onChange={(e) => updateField("resourceId", e.target.value)}
                />
              </div>

              <div className="text-left">
                <label className="text-sm font-semibold">Commit</label>
                <input
                  type="text"
                  placeholder="e.g., f6e9c1d"
                  className="w-full p-2 border rounded mt-2"
                  value={log.commit}
                  onChange={(e) => updateField("commit", e.target.value)}
                />
              </div>

              <div className="text-left">
                <label className="text-sm font-semibold">Trace ID</label>
                <input
                  type="text"
                  placeholder="Unique trace identifier"
                  className="w-full p-2 border rounded mt-2"
                  value={log.traceId}
                  onChange={(e) => updateField("traceId", e.target.value)}
                />
              </div>

              <div className="text-left">
                <label className="text-sm font-semibold">Span ID</label>
                <input
                  type="text"
                  placeholder="Span within the trace"
                  className="w-full p-2 border rounded mt-2"
                  value={log.spanId}
                  onChange={(e) => updateField("spanId", e.target.value)}
                />
              </div>

              <div className="col-span-2 text-left">
                <label className="text-sm font-semibold">
                  Parent Resource ID
                </label>
                <input
                  type="text"
                  placeholder="Optional parent resource identifier"
                  className="w-full p-2 border rounded mt-2"
                  value={log.metadata?.parentResourceId || ""}
                  onChange={(e) =>
                    updateField("metadata", {
                      parentResourceId: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {error && (
              <p className="text-red-600 mt-2 text-left font-bold bg-white px-2 rounded">
                {error}
              </p>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded text-black hover:bg-gray-400 hover:border-transparent shadow-md transition-all"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 hover:border-transparent shadow-md transition-all"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Adding..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
