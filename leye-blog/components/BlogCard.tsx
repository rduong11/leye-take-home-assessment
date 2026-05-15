import { Link } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";
import { ReactNode } from "react";

interface BlogImageType {
  url: string;
  alt_text: string;
}

interface BlogCardProps {
  id: number;
  title: string;
  created_at: string;
  featured_image: BlogImageType;
  children?: ReactNode;
}

export default function BlogCard({
  id,
  title,
  created_at,
  featured_image,
  children,
}: BlogCardProps) {
  return (
    <View key={id}>
      <Link href={`/details/${id}`}>
        <View style={styles.blogContainer}>
          <View>
            {children}
            <Image source={{ uri: featured_image.url }} style={styles.image} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.text}>{created_at}</Text>
          </View>
        </View>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  blogContainer: {
    padding: 5,
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 10,
  },
  image: {
    padding: 10,
    width: 175,
    height: 125,
    borderRadius: 5,
    alignSelf: "center",
  },
  textContainer: {
    padding: 10,
    flex: 1,
  },
  title: {
    padding: 10,
    fontSize: 17,
    color: COLORS.text,
    fontFamily: "Public-Sans-Bold",
  },
  text: {
    padding: 10,
    fontSize: 15,
    color: COLORS.secondary_text,
    fontFamily: "Public-Sans-Regular",
  },
});
