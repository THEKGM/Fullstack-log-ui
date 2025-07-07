import { FilterBar } from "../components/FilterBar";
import { LogTable } from "../components/LogTable";
import { useLogs } from "../hooks/useLogs";

const LogsPage = () => {
  const { logs, filters, setFilters, clearFilters, loading, noResults } =
    useLogs();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Log Viewer</h1>
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        clearFilters={clearFilters}
      />
      <LogTable logs={logs} loading={loading} noResults={noResults} />
    </div>
  );
};

export default LogsPage;
