import {
  Divider,
  Icon,
  List,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet
} from "@ui-kitten/components";
import { Platform, SafeAreaView } from "react-native";

import ArticleListItem from "./ListItem";
import ListItemSwicher from "./ListItemSwitcher";
import LoadingScreen from "../shared/LoadingScreen";
import React from "react";
import TopList from "./TopList";
import themedStyles from "../../styles";
import { useDimensions } from "@react-native-community/hooks";
import useSWR from "swr";

const MenuIcon = (props) => <Icon {...props} name="menu" />;

const listInsertions = {
  0: { key: "top-1", type: "top", props: { title: "Top Stories", categoryId: 1 } },
  3: { key: "top-2", type: "top", props: { title: "Politics", categoryId: 2 } },
  6: { key: "top-3", type: "top", props: { title: "Health", categoryId: 3 } },
  9: { key: "top-4", type: "top", props: { title: "Business", categoryId: 4 } },
  12: { key: "top-5", type: "top", props: { title: "Sports", categoryId: 5 } },
  15: { key: "top-6", type: "top", props: { title: "Science", categoryId: 6 } },
  18: { key: "top-7", type: "top", props: { title: "Tech", categoryId: 7 } },
  21: { key: "top-8", type: "top", props: { title: "Style", categoryId: 8 } },
  24: { key: "top-9", type: "top", props: { title: "Entertainment", categoryId: 9 } },
  27: { key: "top-10", type: "top", props: { title: "Travel", categoryId: 10 } },
  30: { key: "top-11", type: "top", props: { title: "Food", categoryId: 11 } },
  33: { key: "top-12", type: "top", props: { title: "Opinion", categoryId: 12 } }
};

function buildList(articles) {
  const list = [];

  articles.forEach((a, i) => {
    if (listInsertions[i]) {
      list.push(listInsertions[i]);
    }

    list.push({ id: a.id, type: "article", props: a });
  });

  return list;
}

function ArticleList({ navigation, route }) {
  // const name = route.params.name;
  const dimensions = useDimensions();
  const styles = useStyleSheet(themedStyles);

  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR(
    "https://news.svcs.bipbop.me/api/articles/?sourceIds=the-new-york-times",
    fetcher
  );

  let list = null;

  if (data) {
    list = buildList(data);
  }

  function renderItem({ item }) {
    const key = `${item.type}-${item.id}`;

    return <ListItemSwicher key={key} item={item} />
  }

  const MenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={() => navigation.openDrawer()} />
  );

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <TopNavigation
        style={styles.topNavigation}
        title="News"
        alignment={Platform.select({ android: "start", default: "center" })}
        accessoryLeft={dimensions.window.width < 1024 ? MenuAction : null}
      />
      <Divider />
      {list ? (
        <List
          style={{ flex: 1 }}
          contentContainerStyle={{
            padding: 8,
            maxWidth: 500,
            alignSelf: "center"
          }}
          data={list}
          renderItem={renderItem}
        />
      ) : (
        <LoadingScreen error={error} />
      )}
    </SafeAreaView>
  );
}

export default ArticleList;
