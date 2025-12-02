import { StyleSheet } from "react-native";
import { useEffect } from "react";
import { useUser } from "../app/hooks/useUser";
import { useRouter } from "expo-router";

const GuestOnly = ({ children }) => {
  const { user, authChecked } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (authChecked && user !== null) {
      router.replace("/profile");
    }
  }, [user, authChecked]);

  return children;
};

export default GuestOnly;
