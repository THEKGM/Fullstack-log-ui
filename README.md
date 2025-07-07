# 📈 Log Ingestion & Querying System

A full-stack log viewer dashboard that allows you to ingest, filter, and visualize logs easily—built with **React + Vite + Tailwind CSS** on the frontend and **Node.js + Express + TypeScript** on the backend.
No external database required. All logs are managed in a single JSON file for simplicity.

---

## 🛠️ Tech Stack

| Layer     | Tools & Libraries                              |
| --------- | ---------------------------------------------- |
| Frontend  | React, Vite, TypeScript, Tailwind CSS          |
| Backend   | Node.js, Express.js, TypeScript, fs module     |
| Utilities | Axios, Day.js, React Modal, Vite Env Variables |

---

## 🧹 Key Features

✅ Full-featured Log Filtering
✅ Add Logs via Modal Form
✅ Filter by: `message`, `level`, `resourceId`, `timestamp`
✅ Real-time search with debouncing
✅ Visual log styling by severity (`error`, `warn`, `info`, `debug`)
✅ Clean, responsive UI with sticky table headers
✅ Logs saved to a persistent `logs.json` file
✅ Scrollable table with colored badges
✅ Graceful empty states, loading skeletons
✅ Modular folder structure
✅ Environment-driven API configuration

---

## 📂 Folder Structure

```
.
├── Backend/               # Node.js + Express backend
│   ├── logs.json          # Persistent log storage
│   ├── server.ts          # Main server entry
│   └── utils/             # File handling helpers
├── log-ui/                # React frontend (Vite)
│   ├── src/
│   │   ├── components/    # FilterBar, LogTable, AddLogModal
│   │   ├── hooks/         # useLogs hook
│   │   ├── services/      # Axios API handlers
│   │   ├── types.ts       # TypeScript types
│   │   └── pages/         # LogsPage
└── README.md
```

---

## 🚀 Getting Started

### 🖥️ 1. Clone the Repository

```bash
git clone https://github.com/THEKGM/Fullstack-log-ui.git
cd fullstack-log-ui
```

---

### 📦 2. Backend Setup

```bash
cd Backend
npm install
npm start
```

* Runs on: `http://localhost:3000`
* Logs are stored in: `logs.json`

---

### 🎨 3. Frontend Setup

```bash
cd log-ui
npm install
npm run dev
```

* Runs on: `http://localhost:5173`
* Uses Vite + Tailwind + Axios

---

## 🧰 Features Demo

### 🔍 Filtering

* Search by `message`
* Filter by `log level` (error, warn, info, debug)
* Filter by `resource ID`
* Filter by date range

### ➕ Add Logs

* Use the **Add Log** button to open a modal
* Fill in all log fields
* Logs are instantly added to the table and saved to file

---

## 🧱 Design Choices

* **No external DB**: Simplified dev setup and portability
* **In-memory filtering**: Fast and flexible
* **Tailwind UI**: Clean layout with minimal styling overhead
* **Sticky headers**: Better UX for large log sets

---

## 💡 Inspired By

This project draws inspiration from tools like:

* **Grafana Loki**
* **Datadog Logs**
* **Splunk**

But keeps it lightweight and open-source.

---

## ✨ Future Enhancements (Optional)

* [ ] Real-time log ingestion via WebSocket
* [ ] Analytics Dashboard (e.g., chart logs by level)
* [ ] Dockerize frontend + backend
* [ ] Unit testing for core filter logic

---

## 🙌 Acknowledgements

Thanks to modern logging tools for inspiring this developer-friendly simulation of real-time log viewers.
