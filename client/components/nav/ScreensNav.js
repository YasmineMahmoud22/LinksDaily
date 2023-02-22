import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme } from "@react-navigation/native";
import { AuthContext } from "../../context/auth";
import SignUp from "../../screens/SignUp";
import Home from "../../screens/Home";
import SignIn from "../../screens/SignIn";
import Account from "../../screens/Account";
import Links from "../../screens/Links";
import Post from "../../screens/Post";
import HeaderTab from "./HeaderTabs";
import ForgetPassword from "../../screens/ForgetPassword";
import LinkView from "../../screens/LinkView";
import Profile from "../../screens/Profile";

const theme = DefaultTheme;
theme.colors.background = "#ffffff";

const stack = createNativeStackNavigator();

const ScreensNav = () => {
  const [state, setState] = useContext(AuthContext);
  const authenticated = state?.user !== null && state?.token !== "";

  return (
    <stack.Navigator initialRouteName='SignIn'>
      {authenticated ? (
        <>
          <stack.Screen
            name='Home'
            component={Home}
            options={{
              title: "Links Daily",
              headerRight: () => <HeaderTab />,
              headerTitleAlign: "center",
            }}
          />
          <stack.Screen
            name='Account'
            component={Account}
            options={{
              headerTitleAlign: "center",
            }}
          />
          <stack.Screen
            name='Links'
            component={Links}
            options={{
              headerTitleAlign: "center",
            }}
          />
          <stack.Screen
            name='Post'
            component={Post}
            options={{
              headerTitleAlign: "center",
            }}
          />
          <stack.Screen
            name='LinkView'
            component={LinkView}
            options={{
              title: "",
              headerTransparent: true,
            }}
          />
          <stack.Screen
            name='profile'
            component={Profile}
            options={{
              title: "",
              headerTransparent: true,
            }}
          />
        </>
      ) : (
        <>
          <stack.Screen
            name='SignIn'
            component={SignIn}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name='SignUp'
            component={SignUp}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name='ForgetPassword'
            component={ForgetPassword}
            options={{ headerShown: false }}
          />
        </>
      )}
    </stack.Navigator>
  );
};

export default ScreensNav;
