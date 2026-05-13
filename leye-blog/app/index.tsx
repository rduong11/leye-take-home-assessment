import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface BlogPostType {
  topics: string[];
  updated_at: string;
  title: string;
  ID: number;
  featured_image: BlogImageType;
}

interface BlogImageType {
  url: string;
  alt_text: string;
}

const colors = {
  text: "#3A3036",
  secondary_text: "#41424A",
  underline: "#EDEDEB",
  green_primary: "#258834",
};

const filters = ["All Articles", "Guides", "Openings"];

export default function Index() {
  const [blogPosts, setBlogPosts] = useState<BlogPostType[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("All Articles");

  useEffect(() => {
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
    fetchBlogPosts();
  }, []);
  return (
    <SafeAreaView>
      <Text style={styles.h1}>Newsfeed</Text>
      <View style={styles.buttonNavContainer}>
        {filters.map((filter) => (
          <Pressable key={filter} onPress={() => setActiveFilter(filter)}>
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
      <ScrollView style={styles.container}>
        {blogPosts
          .filter((blog) =>
            activeFilter === "All Articles"
              ? true
              : blog.topics?.includes(activeFilter),
          )
          .map((blog) => (
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
    fontSize: 17,
    color: colors.text,
    fontFamily: "Public-Sans-Bold",
  },
  text: {
    padding: 10,
    fontSize: 15,
    color: colors.secondary_text,
    fontFamily: "Public-Sans-Regular",
  },
  textContainer: {
    padding: 10,
    flex: 1,
  },
  blogContainer: {
    padding: 5,
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
  buttonNavContainer: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderBottomWidth: 1.5,
    borderColor: colors.underline,
  },
  activeButton: {
    padding: 10,
    fontSize: 18,
    color: colors.green_primary,
    borderBottomWidth: 3,
    fontFamily: "Public-Sans-Semi-Bold",
    borderColor: colors.green_primary,
  },
});
