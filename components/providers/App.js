import * as Font from "expo-font";

import React, { useEffect, useState } from "react";

import { AppLoading } from "expo";
import { AppearanceProvider } from "react-native-appearance";
import { NavigationContainer } from "@react-navigation/native";
import ThemeProvider from "./Theme";

function AppProviders({ children }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      "Nunito-Bold": require("../../assets/fonts/Nunito-Bold.ttf")
    }).then(() => setIsReady(true));
  }, []);

  if (!isReady) {
    return <AppLoading />;
  }

  return (
    <AppearanceProvider>
      <ThemeProvider>
        <NavigationContainer>{children}</NavigationContainer>
      </ThemeProvider>
    </AppearanceProvider>
  );
}

export default AppProviders;
