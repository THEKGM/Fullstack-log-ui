const StaticData = {
  data: [
    {
      level: "error",
      message: "Failed to connect to database.",
      resourceId: "server-001",
      timestamp: "2025-07-06T10:15:00Z",
      traceId: "trace-001",
      spanId: "span-001",
      commit: "abc123",
      metadata: {
        parentResourceId: "server-root",
      },
    },
    {
      level: "info",
      message: "User login successful.",
      resourceId: "auth-service",
      timestamp: "2025-07-06T10:20:00Z",
      traceId: "trace-002",
      spanId: "span-002",
      commit: "def456",
      metadata: {
        parentResourceId: "auth-root",
      },
    },
    {
      level: "warning",
      message: "High memory usage detected.",
      resourceId: "analytics-01",
      timestamp: "2025-07-06T10:30:00Z",
      traceId: "trace-003",
      spanId: "span-003",
      commit: "ghi789",
      metadata: {
        parentResourceId: "analytics-root",
      },
    },
  ],
};

export default StaticData;
