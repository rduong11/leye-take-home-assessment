import { Text, StyleSheet, View, useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { COLORS } from "@/constants/colors";

interface BlogPostContentProps {
  title: string;
  created_at: string;
  updated_at: string;
  content: string;
}

const tagStyles = {
  img: {
    width: 375,
    height: 250,
  },
  body: {
    padding: 10,
    margin: 10,
    fontSize: 17,
    color: COLORS.secondary_text,
    fontFamily: "Public-Sans-Regular",
  },
  p: { marginBottom: 16 },
  a: {
    padding: 10,
    color: COLORS.green_primary,
  },
};

export default function BlogPostContent({
  title,
  created_at,
  updated_at,
  content,
}: BlogPostContentProps) {
  const { width } = useWindowDimensions();
  return (
    <View>
      <Text style={styles.h1}>{title}</Text>
      <Text style={styles.dateText}>
        Created at: {created_at}, updated at: {updated_at}
      </Text>
      {content && (
        <RenderHtml
          contentWidth={width}
          source={{ html: content }}
          tagsStyles={tagStyles}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  h1: {
    margin: 10,
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.text,
    fontFamily: "Public-Sans-Bold",
  },
  dateText: {
    margin: 10,
    fontSize: 15,
    color: COLORS.text,
    fontFamily: "Public-Sans-Light",
  },
  loadingCircle: {
    flex: 1,
    justifyContent: "center",
  },
});
