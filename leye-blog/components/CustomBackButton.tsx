import { View, Pressable, StyleSheet } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";

const CustomBackButton = () => {
  const router = useRouter();
  return (
    <View>
      <Pressable style={styles.buttonCircle} onPress={() => router.back()}>
        <Feather name="arrow-left" size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default CustomBackButton;

const styles = StyleSheet.create({
  buttonCircle: { backgroundColor: "#FFF", borderRadius: 50, padding: 10 },
});
