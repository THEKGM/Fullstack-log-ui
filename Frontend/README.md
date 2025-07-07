# 🔍 Full Stack Log Viewer

This is a full-stack application that allows ingestion, filtering, and display of structured log entries. It mimics the behavior and usability of professional logging dashboards like Grafana, Datadog, or Splunk — designed for developer teams needing clarity and precision in log monitoring.

---

## 📁 Project Structure

```
log-ui/
├── frontend/        # React + TypeScript + Tailwind
└── backend/         # Node.js + Express + JSON file persistence
```

## 🔢 Folder Structure Overview frontend

````
src/
├── components/      # FilterBar, LogTable, AddLogModal
├── hooks/           # useLogs hook to fetch and manage log state
├── services/        # Axios wrapper for backend log API
├── types.ts         # TypeScript interfaces for LogEntry and Filters
├── pages/           # LogsPage - combines all components
├── App.tsx          # Entry point for the app
├── main.tsx         # Vite bootstrapping
└── index.css        # TailwindCSS base

---

## 🚀 Live Features

✅ Dynamic log filtering (by level, message, resourceId, timestamp)
✅ Full-text search
✅ Color-coded log level UI
✅ Debounced search input
✅ Graceful empty state handling
✅ Static header + scrollable table
✅ Dummy data load (dev testing)
✅ File-based persistence (no database)

---

## 🛠️ Installation Guide

### 1. Clone the repo

```bash
git clone https://github.com/THEKGM/Fullstack-log-ui.git
cd log-ui
````

---

### 2. Backend Setup

```bash
cd backend
npm install
```

📂 Also ensure `logs.json` exists in this folder. If not, create it manually:

```bash
echo "[]" > logs.json
```

Start the backend:

```bash
npm start
```

📡 Runs on: `http://localhost:3000`

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:

```
VITE_API_BASE_URL=http://localhost:3000
```

Start frontend:

```bash
npm run dev
```

🌐 Access frontend: `http://localhost:5173`

---

## 🧠 Design Decisions

### 🔄 File-based Persistence

We used Node's `fs` module for writing/reading logs in `logs.json`. This enables:

- Minimal dependencies
- Manual control over I/O and filtering
- Learning opportunity to manipulate data arrays in memory

🛡 Includes basic validation & error handling for missing/invalid fields.

---

### 🎨 Frontend UI

Inspired by dashboards like **Datadog** and **Grafana**:

- Uses **Tailwind CSS** for fast styling
- Filters update dynamically without reloads
- Logs colored based on severity (error = red, info = blue, etc.)
- UI is responsive for typical desktop usage
- Custom React Hooks and service layers for clean logic separation

---

---

## 📈 Features Implemented

| Feature                                              | Status |
| ---------------------------------------------------- | ------ |
| View all logs (reverse-chronological)                | ✅     |
| Full-text search on `message`                        | ✅     |
| Filter by `level`, `resourceId`, and timestamp range | ✅     |
| Combine multiple filters (AND logic)                 | ✅     |
| Visual styling per `level` (color-coded)             | ✅     |
| Clear filters button                                 | ✅     |
| Debounced search input (300ms)                       | ✅     |
| Empty states: no data / no result / loading          | ✅     |
| Table view with scroll and sticky headers            | ✅     |
| Add Log Modal (form input) with POST request         | ✅     |
| Form validation and feedback                         | ✅     |
| New logs appear after adding                         | ✅     |

---

## 🧪 Optional Features

If enabled:

- `Load Dummy Logs` button posts sample logs to test UI
- Skeleton table loader when fetching
- Empty state visuals

---

## 🧪 Testing (Optional)

If you implement unit tests (e.g. backend filters), add:

```bash
cd backend
npm test
```

---

## 📎 Notes

- Ensure both servers are running:
  - Backend: `http://localhost:3000`
  - Frontend: `http://localhost:5173`
- All logs are stored in `backend/logs.json`

---

## 👨‍💻 Author

Made by **[Keyur Moradiya]**  
GitHub: [github.com/thekgm](https://github.com/thekgm)

---
