import { AddLogModal } from "../components/AddLogModal";
import { FilterBar } from "../components/FilterBar";
import { LogTable } from "../components/LogTable";
import { useLogs } from "../hooks/useLogs";

const LogsPage = () => {
  const {
    logs,
    filters,
    setFilters,
    clearFilters,
    loading,
    noResults,
    refetchLogs,
  } = useLogs();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Log Viewer</h1>
      {/* Add log button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Log Viewer</h1>
        <AddLogModal onLogAdded={refetchLogs} />
      </div>
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
