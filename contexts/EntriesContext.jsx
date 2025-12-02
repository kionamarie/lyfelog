import { createContext, useEffect, useState } from "react";
import { databases } from "../lib/appwrite";
import { ID, Permission, Query, Role } from "appwrite";
import { useUser } from "../app/hooks/useUser";

const DATABASE_ID = "692e6d84002e497aeeff";
const COLLECTION_ID = "entries";

export const EntriesContext = createContext();

export function EntriesProvider({ children }) {
  const [entries, setEntries] = useState([]);
  const { user } = useUser();

  async function fetchEntries() {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal("userId", user.$id)]
      );

      setEntries(response.documents);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    if (user) {
      fetchEntries();
    } else {
      setEntries([]);
    }
  }, [user]);

  async function fetchEntryById(id) {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        COLLECTION_ID,
        id
      );
      return response;
    } catch (error) {
      console.log(error.message);
    }
  }

  async function createEntry(data) {
    try {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        { ...data, userId: user.$id },
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ]
      );
      await fetchEntries(); // Re-fetch entries after creating a new one
    } catch (error) {
      console.log(error.message);
    }
  }

  async function deleteEntry(id) {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      await fetchEntries(); // Re-fetch entries after deleting
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <EntriesContext.Provider
      value={{
        entries,
        fetchEntries,
        fetchEntryById,
        createEntry,
        deleteEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
}
