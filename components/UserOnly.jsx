import { useEffect } from "react";
import { useUser } from "../app/hooks/useUser";
import { useRouter } from "expo-router";

const UserOnly = ({ children }) => {
  const { user, authChecked } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (authChecked && user === null) {
      router.replace("/login");
    }
  }, [user, authChecked]);

  return children;
};

export default UserOnly;
