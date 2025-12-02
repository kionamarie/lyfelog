import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { useEntries } from "../hooks/useEntries";
import { Link, useRouter } from "expo-router";
import log from "../../assets/log.png";
import { ActivityIndicator } from "react-native";
import { databases } from "../../lib/appwrite";
import Entypo from "@expo/vector-icons/Entypo";

const PROMPT_COLLECTION_ID = "reflectionprompts"; // Table
const DATABASE_ID = "692e6d84002e497aeeff"; // Entries DB

// Function to retrieve all cached prompts
export async function getCachedReflectionPrompt() {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      PROMPT_COLLECTION_ID
    );

    const prompts = response.documents.map((doc) => doc.question);

    if (prompts.length === 0) {
      // Fallback if Appwrite is empty
      return "What made you smile today?";
    }

    // Randomly select a prompt from the cached list
    const randomIndex = Math.floor(Math.random() * prompts.length);
    return prompts[randomIndex];
  } catch (e) {
    console.error("Appwrite Prompt Retrieval Error:", e);
    // Fallback if Appwrite fails
    return "How did you use your time intentionally today?";
  }
}

const today = () => {
  const [loading, setLoading] = useState(false);
  const [reflection, setReflection] = useState("");
  const [selectedMood, setSelectedMood] = useState(null);
  const [reflectionPrompt, setReflectionPrompt] = useState(null);

  const { createEntry } = useEntries();
  const router = useRouter();

  // Use effect for fetching Reflection prompts
  useEffect(() => {
    const fetchPrompt = async () => {
      setLoading(true);
      try {
        // Call the new reliable function
        const prompt = await getCachedReflectionPrompt();
        setReflectionPrompt(prompt);
      } catch (e) {
        console.error("Failed to load prompt:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompt();
  }, []);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const today = new Date().toLocaleDateString("en-US", options);

  const moods = [
    { emoji: "😞", value: 1 },
    { emoji: "😐", value: 2 },
    { emoji: "😊", value: 3 },
    { emoji: "😁", value: 4 },
    { emoji: "🤩", value: 5 },
  ];

  async function handleSubmit() {
    if (!reflection.trim() || !selectedMood) return;

    setLoading(true);

    try {
      await createEntry({
        today,
        reflectionPrompt,
        reflection,
        mood: selectedMood,
      });
      router.push(`/entries`);
      setReflection("");
      setSelectedMood(null);
    } catch (error) {
      console.error("Failed to save entry:", error);
      Alert.alert("Error", "There was a problem saving your entry.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Link href="/" style={styles.homeButton}>
          <Entypo name="home" size={32} color="white" />
        </Link>
        <Image source={log} style={styles.image} />
        <View style={styles.contentContainer}>
          <Text style={styles.heading}>{today}</Text>
          <Text style={styles.mood_question}>How are you feeling?</Text>
          <View style={styles.moodContainer}>
            {moods.map((mood) => (
              <Pressable
                key={mood.value}
                style={[
                  styles.mood,
                  selectedMood === mood.value && styles.selectedMood,
                ]}
                onPress={() => setSelectedMood(mood.value)}
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
              </Pressable>
            ))}
          </View>
          <Text style={styles.reflection_heading}>Reflection</Text>
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#FFFFFF"
              style={styles.promptBox}
            />
          ) : (
            <View style={styles.promptBox}>
              <Text style={styles.promptText}>{reflectionPrompt}</Text>
            </View>
          )}
          <TextInput
            style={styles.reflectionInput}
            placeholderTextColor="#ccc"
            value={reflection}
            onChangeText={setReflection}
            multiline={true}
          />
          <Pressable
            style={styles.createButton}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.createButtonText}>
              {" "}
              {loading ? "Saving..." : "Save Entry"}
            </Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default today;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "floralwhite",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontFamily: "Futura",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
    alignContent: "center",
    textAlign: "center",
  },
  mood_question: {
    fontFamily: "Futura",
    fontSize: 18,
    color: "white",
    marginBottom: 10,
  },
  reflection_heading: {
    fontFamily: "Futura",
    fontSize: 18,
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  createButton: {
    height: 50,
    width: 150,
    backgroundColor: "darkgoldenrod",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
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
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  moodContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  mood: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  selectedMood: {
    backgroundColor: "rgba(233, 207, 80, 1)",
    transform: [{ scale: 1.1 }],
  },
  moodEmoji: {
    fontSize: 30,
  },
  reflectionInput: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: "100%",
    height: 150,
    borderRadius: 8,
    padding: 10,
    color: "white",
    fontSize: 16,
    textAlignVertical: "top",
    textAlign: "center",
  },
  createButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Futura",
  },
  promptBox: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: "100%",
    height: 100,
    borderRadius: 8,
    padding: 10,
  },
  promptText: {
    color: "white",
    fontSize: 16,
    textAlignVertical: "top",
    textAlign: "center",
    fontWeight: "bold",
  },
  homeButton: {
    position: "absolute",
    top: 70,
    left: 35,
    zIndex: 1,
  },
});
