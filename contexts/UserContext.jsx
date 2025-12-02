import { createContext, useEffect, useState } from "react";
import { account } from "../lib/appwrite";
import { ID } from "appwrite";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  async function getInitialUserValue() {
    try {
      const response = await account.get();
      setUser(response);
    } catch (error) {
      setUser(null);
    } finally {
      setAuthChecked(true);
    }
  }

  useEffect(() => {
    getInitialUserValue();
  }, []);

  async function login(email, password) {
    try {
      await account.createEmailPasswordSession(email, password);
      const response = await account.get();
      setUser(response);
      console.log("user logged in");
    } catch (error) {
      console.log(error.message);
    }
  }

  async function register(email, password) {
    try {
      await account.create(ID.unique(), email, password);
      console.log("user registered");
    } catch (error) {
      console.log(error.message);
    }
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
    console.log("user logged out");
  }

  return (
    <UserContext.Provider
      value={{ user, login, register, logout, authChecked }}
    >
      {children}
    </UserContext.Provider>
  );
}
