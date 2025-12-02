import { createContext, useState, useEffect, useContext } from "react";
import { Audio } from "expo-av";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let soundObject = null;

    async function loadAndPlaySound() {
      try {
        const { sound: newSound } = await Audio.Sound.createAsync(
          require("../assets/nature.mp3"),
          { isLooping: true }
        );
        soundObject = newSound;
        setSound(soundObject);
        await soundObject.playAsync();
        setIsPlaying(true);
      } catch (error) {
        console.error("Failed to load or play sound", error);
      }
    }

    loadAndPlaySound();

    return () => {
      if (soundObject) {
        soundObject.unloadAsync();
      }
    };
  }, []);

  const toggleSound = async () => {
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <AudioContext.Provider value={{ isPlaying, toggleSound }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
