import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import ScreensNav from "./components/nav/ScreensNav";
import AuthProvider from "./context/auth";
import LinkProvider from "./context/link";

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <LinkProvider>
          <ScreensNav />
        </LinkProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default RootNavigation;
