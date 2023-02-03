import React from "react"; 
import {View, TextInput, StyleSheet} from 'react-native';
import Text from "@kaloraat/react-native-text";
import { StatusBar } from 'expo-status-bar';


const SignUp = () => {
    return ( 
        <View>
            <StatusBar style="auto" />
            <Text center>hi</Text>
        </View>
     );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,

    }
});
 
export default SignUp;
