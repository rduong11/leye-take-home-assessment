import { Text, Pressable, View, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "@/constants/colors";

interface NavContentProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function NavContent({
  filters,
  activeFilter,
  onFilterChange,
}: NavContentProps) {
  return (
    <View style={styles.buttonNavContainer}>
      {filters.map((filter) => (
        <Pressable key={filter} onPress={() => onFilterChange(filter)}>
          <Text
            style={[
              styles.text,
              filter === activeFilter ? styles.activeButton : null,
            ]}
          >
            {filter}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonNavContainer: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderBottomWidth: 1.5,
    borderColor: COLORS.underline,
  },
  text: {
    padding: 10,
    fontSize: 15,
    color: COLORS.secondary_text,
    fontFamily: "Public-Sans-Regular",
  },
  activeButton: {
    padding: 10,
    fontSize: 18,
    color: COLORS.green_primary,
    borderBottomWidth: 3,
    fontFamily: "Public-Sans-Semi-Bold",
    borderColor: COLORS.green_primary,
  },
});
