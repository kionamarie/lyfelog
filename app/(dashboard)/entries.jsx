import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import useEntries from "../hooks/useEntries";
import log from "../../assets/log.png";

const entries = () => {
  const { entries } = useEntries();
  const router = useRouter();

  const moodMap = {
    1: "😞",
    2: "😐",
    3: "😊",
    4: "😁",
    5: "🤩",
  };

  return (
    <View style={styles.container}>
      <Image source={log} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Log Entries</Text>
        <FlatList
          data={entries}
          keyExtractor={(item) => item.$id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Pressable
              style={styles.entryCard}
              onPress={() => router.push(`/entries/${item.$id}`)}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.moodEmoji}>{moodMap[item.mood]}</Text>
                <Text style={styles.date}>{item.today}</Text>
              </View>
              <Text style={styles.reflection} numberOfLines={2}>
                {item.reflection}
              </Text>
            </Pressable>
          )}
        />
      </View>
    </View>
  );
};

export default entries;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    fontFamily: "Futura",
    color: "rgba(255, 255, 255, 1)",
  },
  listContent: {
    paddingBottom: 16,
  },
  entryCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  reflection: {
    fontSize: 16,
    color: "#333",
  },
  date: {
    fontSize: 14,
    color: "#666",
    fontWeight: "bold",
  },
  moodEmoji: {
    fontSize: 24,
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
