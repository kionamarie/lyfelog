import { Stack } from "expo-router";
import { UserProvider } from "../contexts/UserContext";
import { EntriesProvider } from "../contexts/EntriesContext";
import { AudioProvider } from "../contexts/AudioContext";

export default function Layout() {
  return (
    <AudioProvider>
      <UserProvider>
        <EntriesProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </EntriesProvider>
      </UserProvider>
    </AudioProvider>
  );
}

