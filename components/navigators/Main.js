import ArticleList from "../article/List";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

function MainNavigator({ route }) {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator headerMode="none">
      <Screen name="conversationList" component={ArticleList} />
    </Navigator>
  );
}

export default MainNavigator;
