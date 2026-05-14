import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RenderHtml from "react-native-render-html";

const colors = {
  text: "#3A3036",
  secondary_text: "#41424A",
  green_primary: "#258834",
};

const tagStyles = {
  img: {
    width: 375,
    height: 250,
  },
  body: {
    padding: 10,
    margin: 10,
    fontSize: 17,
    color: colors.secondary_text,
    fontFamily: "Public-Sans-Regular",
  },
  p: { marginBottom: 16 },
  a: {
    padding: 10,
    color: colors.green_primary,
  },
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
          color={colors.green_primary}
          style={isLoading ? styles.loadingCircle : null}
        />
      ) : (
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
                tagsStyles={tagStyles}
              />
            )}
          </View>
        </ScrollView>
      )}
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
  loadingCircle: {
    flex: 1,
    justifyContent: "center",
  },
});
