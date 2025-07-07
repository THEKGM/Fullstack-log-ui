import express from "express";
import fs from "fs/promises";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import StaticData from "./StaticData.js";

const { data } = StaticData;

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOG_FILE = path.join(__dirname, "logs.json");

app.use(cors());
app.use(express.json());

// Ensure logs.json exists
const ensureLogFileExists = async () => {
  try {
    await fs.access(LOG_FILE);
  } catch {
    await fs.writeFile(LOG_FILE, JSON.stringify([]));
  }
};

app.post("/seed", (req, res) => {
  fs.writeFileSync("./logs.json", JSON.stringify(data, null, 2));
  res.status(201).json({ message: "Sample logs loaded." });
});

// Read logs
const readLogs = async () => {
  const data = await fs.readFile(LOG_FILE, "utf-8");
  return JSON.parse(data);
};

// Write logs
const writeLogs = async (logs) => {
  await fs.writeFile(LOG_FILE, JSON.stringify(logs, null, 2));
};

// POST /logs
app.post("/logs", async (req, res) => {
  const log = req.body;
  const requiredFields = [
    "level",
    "message",
    "resourceId",
    "timestamp",
    "traceId",
    "spanId",
    "commit",
    "metadata",
  ];
  if (!requiredFields.every((key) => log[key] !== undefined)) {
    return res.status(400).json({ error: "Missing required log fields." });
  }

  try {
    const logs = await readLogs();
    logs.push(log);
    await writeLogs(logs);
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ error: "Failed to store log." });
  }
});

// GET /logs
app.get("/logs", async (req, res) => {
  try {
    const logs = await readLogs();
    let result = [...logs];

    const {
      message,
      level,
      resourceId,
      timestamp_start,
      timestamp_end,
      traceId,
      spanId,
      commit,
    } = req.query;

    if (message) {
      result = result.filter((log) =>
        log.message.toLowerCase().includes(message.toLowerCase())
      );
    }
    if (level) {
      result = result.filter((log) => log.level === level);
    }
    if (resourceId) {
      result = result.filter((log) => log.resourceId === resourceId);
    }
    if (timestamp_start && timestamp_end) {
      result = result.filter(
        (log) =>
          new Date(log.timestamp) >= new Date(timestamp_start) &&
          new Date(log.timestamp) <= new Date(timestamp_end)
      );
    }
    if (traceId) {
      result = result.filter((log) => log.traceId === traceId);
    }
    if (spanId) {
      result = result.filter((log) => log.spanId === spanId);
    }
    if (commit) {
      result = result.filter((log) => log.commit === commit);
    }

    result.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve logs." });
  }
});

await ensureLogFileExists();

app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
