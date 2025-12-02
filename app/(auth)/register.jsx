import { StyleSheet, Text, View, Image } from "react-native";
import { useState } from "react";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";
import { useUser } from "../hooks/useUser.jsx";
import Entypo from "@expo/vector-icons/Entypo";
import log from "../../assets/log.png";

const register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();
  const { register, login } = useUser();

  const handleSubmit = async () => {
    try {
      await register(email, password);
      await login(email, password); // Login after registering
      router.replace("/today");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Link href="/" style={styles.homeButton}>
        <Entypo name="home" size={32} color="white" />
      </Link>
      <Image source={log} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>New Account</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        ></TextInput>
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        ></TextInput>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.button}>Register</Text>
        </TouchableOpacity>
        <Link href="/login" style={styles.subtext} replace>
          <Text>Already joined? Login instead.</Text>
        </Link>
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    </View>
  );
};

export default register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  homeButton: {
    position: "absolute",
    top: 100,
    left: 50,
    zIndex: 1,
  },
  title: {
    color: "rgba(254, 252, 243, 1)",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    fontFamily: "Futura",
  },
  input: {
    backgroundColor: "rgba(254, 252, 243, 1)",
    borderWidth: 1,
    borderColor: "rgba(233, 207, 80, 0.8)",
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
    width: "100%",
  },
  button: {
    fontFamily: "Futura",
    color: "rgba(254, 252, 243, 1)",
    fontSize: 20,
    fontWeight: "bold",
    height: 60,
    width: 115,
    backgroundColor: "darkgoldenrod",
    borderRadius: 25,
    textAlign: "center",
    paddingTop: 14,
    marginTop: 35,
    marginBottom: 30,
  },
  subtext: {
    color: "rgba(254, 252, 243, 1)",
    fontFamily: "Futura",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  error: {
    color: "red",
    marginTop: 50,
  },
  contentContainer: {
    width: "85%",
    height: "80%",
    padding: 20,
    backgroundColor: "rgba(139, 69, 19, 0.7)",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "rgba(233, 207, 80, 0.8)",
    borderWidth: 1,
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
