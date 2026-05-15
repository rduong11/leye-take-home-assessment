import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/colors";
import { API_URL } from "@/constants/api";
import BlogPostContent from "@/components/BlogPostContent";

interface BlogPostType {
  ID: number;
  title: string;
  created_at: string;
  updated_at: string;
  content: string;
}

export default function Details() {
  const [blogPost, setBlogPost] = useState<BlogPostType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { blogId } = useLocalSearchParams();

  useEffect(() => {
    async function fetchBlogContent() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const post = data.find(
          (item: BlogPostType) => item.ID === Number(blogId),
        );
        setBlogPost(post);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBlogContent();
  }, [blogId]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.green_primary}
          style={styles.loadingCircle}
        />
      ) : (
        <ScrollView>
          {blogPost && (
            <BlogPostContent
              title={blogPost.title}
              created_at={blogPost.created_at}
              updated_at={blogPost.updated_at}
              content={blogPost.content}
            />
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingCircle: {
    flex: 1,
    justifyContent: "center",
  },
});
