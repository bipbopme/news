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
import LoadingScreen from "../shared/LoadingScreen";
import React from "react";
import themedStyles from "../../styles";
import { useDimensions } from "@react-native-community/hooks";
import useSWR from "swr";

const MenuIcon = (props) => <Icon {...props} name="menu" />;

function ArticleList({ navigation, route }) {
  // const name = route.params.name;
  const dimensions = useDimensions();
  const styles = useStyleSheet(themedStyles);

  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR(
    "https://news.svcs.bipbop.me/api/articles/?sourceIds=the-new-york-times,washington-post,cnn,reuters",
    fetcher
  );

  function renderItem({ item }) {
    return <ArticleListItem key={item.id} {...item} navigation={navigation} />;
  }

  const MenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={() => navigation.openDrawer()} />
  );

  return (
    <SafeAreaView style={[styles.safeAreaView, { marginBottom: -40 }]}>
      <TopNavigation
        style={styles.topNavigation}
        title="Today"
        alignment={Platform.select({ android: "start", default: "center" })}
        accessoryLeft={dimensions.window.width < 1024 ? MenuAction : null}
      />
      <Divider />
      {data ? (
        <List
          style={{ flex: 1 }}
          contentContainerStyle={{
            padding: 8
          }}
          data={data}
          renderItem={renderItem}
        />
      ) : (
        <LoadingScreen error={error} />
      )}
    </SafeAreaView>
  );
}

export default ArticleList;
