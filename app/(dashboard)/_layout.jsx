import { StyleSheet } from "react-native";
import UserOnly from "../../components/UserOnly";
import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

const _layout = () => {
  return (
    <UserOnly>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="today"
          options={{
            title: "Today",
            tabBarIcon: ({ color, focused }) => {
              return focused ? (
                <MaterialCommunityIcons
                  name="flower-tulip"
                  size={24}
                  color="black"
                />
              ) : (
                <MaterialCommunityIcons
                  name="flower-tulip-outline"
                  size={24}
                  color="black"
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="entries"
          options={{
            title: "Log Entries",
            tabBarIcon: ({ color, focused }) => {
              return focused ? (
                <Ionicons name="journal" size={24} color="black" />
              ) : (
                <Ionicons name="journal-outline" size={24} color="black" />
              );
            },
          }}
        />
        <Tabs.Screen
          name="logout"
          options={{
            title: "Log Out",
            tabBarIcon: ({ color, focused }) => {
              return focused ? (
                <MaterialCommunityIcons name="logout" size={24} color="black" />
              ) : (
                <MaterialCommunityIcons
                  name="logout-variant"
                  size={24}
                  color="black"
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="entries/[id]"
          options={{
            title: "[id]",
            href: null,
          }}
        />
      </Tabs>
    </UserOnly>
  );
};

export default _layout;
