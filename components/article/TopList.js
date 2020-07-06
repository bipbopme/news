import {
  Divider,
  Text,
  useStyleSheet
} from "@ui-kitten/components";
import { Platform, SafeAreaView, View } from "react-native";

import LoadingScreen from "../shared/LoadingScreen";
import React from "react";
import TopListItem from "./TopListItem";
import themedStyles from "../../styles";
import useSWR from "swr";

function ArticleTopList({ title, categoryId }) {
  const styles = useStyleSheet(themedStyles);

  const fetcher = (url, categoryId) => fetch(url + `&categoryId=${categoryId}`).then((r) => r.json());
  const { data, error } = useSWR(
    ["https://news.svcs.bipbop.me/api/articles/top?sourceIds=the-new-york-times", categoryId],
    fetcher
  );

  if (!data) {
    return <LoadingScreen error={error} />;
  }

  return (
    <View style={{ paddingVertical: 24 }}>
      <Text category="h5" style={{ marginLeft: 16 }}>{title}</Text>
      {data.map((article) => (
        <TopListItem key={article.id} {...article} />
      ))}
    </View>
  );
}

export default ArticleTopList;
