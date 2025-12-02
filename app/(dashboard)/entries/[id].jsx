import {
  StyleSheet,
  Text,
  Image,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import useEntries from "../../hooks/useEntries";
import log from "../../../assets/log.png";

const EntryDetails = () => {
  const [entry, setEntry] = useState(null);
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const { fetchEntryById, deleteEntry } = useEntries();
  const router = useRouter();

  const moodMap = {
    1: "😞",
    2: "😐",
    3: "😊",
    4: "😁",
    5: "🤩",
  };

  const handleDelete = async () => {
    await deleteEntry(id);
    setEntry(null);
    router.replace("/entries");
  };

  useEffect(() => {
    async function loadEntry() {
      if (id) {
        try {
          const entryData = await fetchEntryById(id);
          setEntry(entryData);
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      }
    }
    loadEntry();
    return () => setEntry(null);
  }, [id]);

  if (!entry) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="darkgoldenrod" />
        <Text>Loading log entry...</Text>
      </View>
    );
  }

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }
  if (!entry) {
    return <Text style={styles.errorText}>Entry not found.</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={log} style={styles.image} />
      <View style={styles.contentContainer}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.moodEmoji}>{moodMap[entry.mood]}</Text>
            <Text style={styles.date}>{entry.today}</Text>
          </View>
          <Text style={styles.reflectionLabel}>
            Reflection Prompt: {entry.reflectionPrompt}
          </Text>
          <Text style={styles.reflection}>{entry.reflection}</Text>
          <Pressable style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default EntryDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  date: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
  },
  moodEmoji: {
    fontSize: 30,
  },
  reflectionLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "Futura",
    color: "#333",
  },
  reflection: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
    color: "#333",
  },
  deleteButton: {
    backgroundColor: "#d9534f",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 10,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
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
});
