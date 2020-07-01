import AppProviders from "./components/providers/App";
import MainNavigator from "./components/navigators/Main";
import React from "react";

function App() {
  return (
    <AppProviders>
      <MainNavigator />
    </AppProviders>
  );
}

export default App;
