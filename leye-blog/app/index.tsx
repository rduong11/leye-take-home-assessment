import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface BlogPostType {
  // topic: BlogPostTopics[] | undefined;
  // created_at: string;
  updated_at: string;
  title: string;
  ID: number;
  featured_image: BlogImageType;
}

interface BlogImageType {
  url: string;
  alt_text: string;
}

// interface BlogPostTopics {
//   topic: string;
// }
const colors = {
  text: "#3A3036",
  secondary_text: "#41424A",
};

export default function Index() {
  const [blogPosts, setBlogPosts] = useState<BlogPostType[]>([]);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  async function fetchBlogPosts() {
    try {
      const response = await fetch(
        "https://www.lettuce.com/wp-json/lettuce/blog-content",
      );

      const data = await response.json();

      setBlogPosts(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <SafeAreaView>
      <Text style={styles.h1}>Newsfeed</Text>
      <ScrollView style={styles.container}>
        {blogPosts.map((blog) => (
          <View key={blog.ID}>
            <Link href={`/details/${blog.ID}`}>
              <View style={styles.blogContainer}>
                <Image
                  source={{ uri: blog.featured_image.url }}
                  style={styles.image}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{blog.title}</Text>
                  <Text style={styles.text}>{blog.updated_at}</Text>
                </View>
              </View>
            </Link>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
  },
  h1: {
    padding: 10,
    fontSize: 35,
    color: colors.text,
    fontFamily: "Public-Sans-Bold",
  },
  title: {
    padding: 10,
    fontSize: 20,
    color: colors.text,
    fontFamily: "Public-Sans-Semi-Bold",
  },
  text: {
    padding: 10,
    fontSize: 18,
    color: colors.secondary_text,
    fontFamily: "Public-Sans-Regular",
  },
  textContainer: {
    padding: 10,
    flex: 1,
  },
  blogContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 10,
  },
  image: {
    padding: 10,
    width: 175,
    height: 120,
    borderRadius: 5,
    alignSelf: "center",
  },
});
