import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const colors = {
  text: "#3A3036",
};

export default function Details() {
  const [blogTitle, setBlogTitle] = useState<string>();
  const [blogCreatedDate, setBlogCreatedDate] = useState<string>();
  const [blogUpdatedDate, setBlogUpdatedDate] = useState<string>();
  const [blogContent, setBlogContent] = useState<string>();

  useEffect(() => {
    fetchBlogContent();
  }, []);

  async function fetchBlogContent() {
    try {
      const response = await fetch(
        "https://www.lettuce.com/wp-json/lettuce/blog-content",
      );

      const data = await response.json();
      setBlogTitle(data.title);
      setBlogCreatedDate(data.created_at);
      setBlogUpdatedDate(data.updated_at);
      setBlogContent(data.content);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <SafeAreaView>
      <View>
        <Text style={styles.h1}>{blogTitle}</Text>
        <Text>
          Created at: {blogCreatedDate}, updated at: {blogUpdatedDate}
        </Text>
        <Text>{blogContent}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.text,
  },
});
