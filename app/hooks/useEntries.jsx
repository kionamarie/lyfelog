import { useContext } from "react";
import { EntriesContext } from "../../contexts/EntriesContext";

export function useEntries() {
  const context = useContext(EntriesContext);

  if (!context) {
    throw new Error("useEntries must be used within a EntriesProvider");
  }

  return context;
}

export default useEntries;
