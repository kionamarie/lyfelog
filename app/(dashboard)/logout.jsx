import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useUser } from "../hooks/useUser.jsx";
import { useRouter } from "expo-router";
import log from "../../assets/log.png";

const Logout = () => {
  const { logout } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={log} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.email}>Going for a walk?</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Futura",
    fontWeight: "bold",
    color: "white",
    fontSize: 25,
    textAlign: "center",
  },
  button: {
    height: 75,
    width: 200,
    backgroundColor: "darkgoldenrod",
    justifyContent: "center",
    borderRadius: 8,
    borderColor: "rgba(233, 207, 80, 1)",
    borderWidth: 2,
  },
  email: {
    fontFamily: "Futura",
    fontWeight: "bold",
    color: "white",
    fontSize: 25,
    textAlign: "center",
    marginBottom: 20,
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  contentContainer: {
    width: "85%",
    padding: 20,
    backgroundColor: "rgba(139, 69, 19, 0.7)",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "rgba(233, 207, 80, 0.8)",
    borderWidth: 1,
  },
});
