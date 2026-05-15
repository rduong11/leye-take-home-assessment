import { useEffect, useState } from "react";
import { Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/colors";
import { API_URL } from "@/constants/api";
import { msToDay } from "@/utils/date";
import { filters } from "@/constants/topicFilters";
import NavContent from "@/components/NavContent";
import NewPill from "@/components/NewPill";
import BlogCard from "@/components/BlogCard";

interface BlogPostMapType {
  topics: string[];
  created_at: string;
  title: string;
  ID: number;
  featured_image: BlogImageType;
}

interface BlogImageType {
  url: string;
  alt_text: string;
}

export default function Index() {
  const [blogPosts, setBlogPosts] = useState<BlogPostMapType[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("All Articles");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const response = await fetch(API_URL);

        const data = await response.json();

        setBlogPosts(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBlogPosts();
  }, []);

  return (
    <SafeAreaView style={styles.SAVContainer}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.green_primary}
          style={styles.loadingCircle}
        />
      ) : (
        <>
          <Text style={styles.h1}>Newsfeed</Text>
          <NavContent
            filters={filters}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
          <ScrollView style={styles.container}>
            {blogPosts
              .filter((blog) =>
                activeFilter === "All Articles"
                  ? true
                  : blog.topics?.includes(activeFilter),
              )
              .map((blog) => (
                <BlogCard
                  key={blog.ID}
                  id={blog.ID}
                  title={blog.title}
                  created_at={blog.created_at}
                  featured_image={blog.featured_image}
                >
                  {msToDay(blog.created_at) <= 7 && <NewPill />}
                </BlogCard>
              ))}
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SAVContainer: {
    flex: 1,
  },
  container: {
    padding: 10,
    margin: 10,
  },
  h1: {
    padding: 10,
    fontSize: 35,
    color: COLORS.text,
    fontFamily: "Public-Sans-Bold",
  },
  loadingCircle: {
    flex: 1,
    justifyContent: "center",
  },
});
