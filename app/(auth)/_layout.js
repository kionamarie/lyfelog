import { StyleSheet } from "react-native";
import GuestOnly from "../../components/GuestOnly";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <GuestOnly>
      <Stack screenOptions={{ headerShown: false}}></Stack>
    </GuestOnly>
  );
};

export default _layout;

