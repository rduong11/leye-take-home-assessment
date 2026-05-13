import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RenderHtml from "react-native-render-html";

const colors = {
  text: "#3A3036",
};

interface BlogPost {
  ID: number;
  title: string;
  created_at: string;
  updated_at: string;
  content: string;
}

export default function Details() {
  const [blogPost, setBlogPost] = useState<BlogPost>();
  const { blogId } = useLocalSearchParams();
  const { width } = useWindowDimensions();

  useEffect(() => {
    async function fetchBlogContent() {
      try {
        const response = await fetch(
          "https://www.lettuce.com/wp-json/lettuce/blog-content",
        );
        const data = await response.json();
        const post = data.find((item: BlogPost) => item.ID === Number(blogId));
        setBlogPost(post);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBlogContent();
  }, [blogId]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text style={styles.h1}>{blogPost?.title}</Text>
          <Text style={styles.dateText}>
            Created at: {blogPost?.created_at}, updated at:{" "}
            {blogPost?.updated_at}
          </Text>
          {blogPost?.content && (
            <RenderHtml
              contentWidth={width}
              source={{ html: blogPost.content }}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  h1: {
    margin: 10,
    fontSize: 30,
    fontWeight: "bold",
    color: colors.text,
    fontFamily: "Public-Sans-Bold",
  },
  dateText: {
    margin: 10,
    fontSize: 15,
    color: colors.text,
    fontFamily: "Public-Sans-Light",
  },
});
