import * as WebBrowser from "expo-web-browser";

import { Card, Text } from "@ui-kitten/components";
import { ImageBackground, View } from "react-native";

import React from "react";

function ArticleListItem({ title, description, sourceId, image, url, ampUrl }) {
  console.log(image);
  const Header = (props) => <ImageBackground source={{ uri: image }} style={{ height: 220 }} />;

  const openUrl = () => {
    WebBrowser.openBrowserAsync(ampUrl || url);
  };

  return (
    <Card style={{ margin: 8 }} header={Header} onPress={openUrl}>
      <View style={{ marginHorizontal: -8 }}>
        <Text category="s2">{sourceId}</Text>
        <Text category="h6">{title}</Text>
      </View>
    </Card>
  );
}

export default React.memo(ArticleListItem);
