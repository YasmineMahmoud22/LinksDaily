import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme } from '@react-navigation/native';
import SignUp from '../../screens/SignUp';
import Home from '../../screens/Home';
import SignIn from '../../screens/SignIn';
import Account from '../../screens/Account';
import Links from '../../screens/Links';
import Post from '../../screens/Post';

const theme = DefaultTheme;
theme.colors.background = "#ffffff";

const stack = createNativeStackNavigator();

const ScreensNav = () => {
    return ( 
        <stack.Navigator initialRouteName='SignUp'>  
            <stack.Screen  
                name='SignUp'
                component={SignUp}
            />
            <stack.Screen  
                name='Home'
                component={Home}
            />
            <stack.Screen  
                name='SignIn'
                component={SignIn}
            />
            <stack.Screen  
                name='Account'
                component={Account}
            />
            <stack.Screen  
                name='Links'
                component={Links}
            />
            <stack.Screen  
                name='Post'
                component={Post}
            />
        </stack.Navigator>
     );
}
 
export default ScreensNav;