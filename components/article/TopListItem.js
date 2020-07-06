import * as WebBrowser from "expo-web-browser";

import { Card, Text } from "@ui-kitten/components";
import { Image, ImageBackground, View } from "react-native";

import React from "react";

function TopListItem({ title, description, source, imageUrl, url, ampUrl }) {
  const Header = (props) => <ImageBackground source={{ uri: imageUrl }} style={{ height: 220 }} />;

  const openUrl = () => {
    WebBrowser.openBrowserAsync(ampUrl || url);
  };

  return (
    <Card style={{ marginHorizontal: 8, marginVertical: 4 }} onPress={openUrl}>
      <View style={{ marginHorizontal: -8, flexDirection: "row" }}>
        <View style={{ flex: 1, paddingRight: 8 }}>
          <Text category="c1">
            <Image
              style={{ height: 16, width: 16 }}
              source={{
                uri: source.iconUrl
              }}
            />{" "}
            {source.name}
          </Text>
          <Text category="s1" numberOfLines={3}>{title}</Text>
        </View>
        <ImageBackground source={{ uri: imageUrl }} style={{ borderRadius: 8, height: 80, width: 80 }} />
      </View>
    </Card>
  );
}

export default React.memo(TopListItem);
