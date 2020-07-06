import * as WebBrowser from "expo-web-browser";

import { Card, Text } from "@ui-kitten/components";
import { Image, ImageBackground, View } from "react-native";

import React from "react";

function ArticleListItem({ title, description, source, imageUrl, url, ampUrl }) {
  const Header = (props) => <ImageBackground source={{ uri: imageUrl }} style={{ height: 220 }} />;

  const openUrl = () => {
    WebBrowser.openBrowserAsync(ampUrl || url);
  };

  return (
    <Card style={{ margin: 8 }} header={Header} onPress={openUrl}>
      <View style={{ marginHorizontal: -8 }}>
        <Text category="c1">
          <Image
            style={{ height: 16, width: 16 }}
            source={{
              uri: source.iconUrl
            }}
          />{" "}
          {source.name}
        </Text>
        <Text category="h6">{title}</Text>
      </View>
    </Card>
  );
}

export default React.memo(ArticleListItem);
