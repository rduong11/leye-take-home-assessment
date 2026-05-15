import { Text, StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export default function NewPill() {
  return <Text style={styles.newPill}>NEW!</Text>;
}

const styles = StyleSheet.create({
  newPill: {
    fontSize: 15,
    borderRadius: 22,
    backgroundColor: COLORS.green_primary,
    fontFamily: "Public-Sans-Semi-Bold",
    color: COLORS.white,
    position: "absolute",
    top: 18,
    left: 15,
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 4,
    zIndex: 1,
  },
});
