import { Image, StyleSheet, View, Pressable } from "react-native";
import { Link } from "expo-router";
import logo from "../assets/logo.png";
import { useAudio } from "../contexts/AudioContext";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function App() {
  const { isPlaying, toggleSound } = useAudio();

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleSound} style={styles.muteButton}>
        <Ionicons
          name={isPlaying ? "volume-high" : "volume-mute"}
          size={32}
          color="rgba(32, 75, 38, 1)"
        />
      </Pressable>
      <Image source={logo} style={styles.image} />
      <Link href={"/login"} style={[styles.login, styles.buttonText]}>
        Join / Login
      </Link>
      <Link href={"/today"} style={[styles.profile, styles.buttonText]}>
        Log
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(254, 252, 243, 1)",
    alignItems: "center",
    justifyContent: "center",
  },
  muteButton: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 1,
  },
  login: {
    position: "absolute",
    top: 150,
    width: 300,
    height: 50,
    backgroundColor: "rgba(32, 75, 38, 1)",
    borderRadius: 25,
  },
  buttonText: {
    textAlign: "center",
    paddingVertical: 7,
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    fontFamily: "Futura",
  },
  image: {
    width: "100%",
    height: 500,
    marginBottom: 15,
  },
  profile: {
    position: "absolute",
    top: 650,
    width: 250,
    height: 50,
    backgroundColor: "darkgoldenrod",
    borderRadius: 25,
    borderColor: "rgba(233, 207, 80, 1)",
    borderWidth: 2,
  },
});
