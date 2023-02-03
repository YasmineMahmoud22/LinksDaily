import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import ScreensNav from "./components/nav/ScreensNav";
import AuthProvider from "./context/auth";

const RootNavigation = () => {
    return ( 
        <NavigationContainer>
            <AuthProvider>
              <ScreensNav />
            </AuthProvider>
        </NavigationContainer>
     );
}
 
export default RootNavigation;