import React from "react";
import {ActivityIndicator ,TouchableOpacity, StyleSheet } from "react-native";
import Text from "@kaloraat/react-native-text";

const SubmitButton = ({loading, title, handleSubmit}) => {
    return (  
        <TouchableOpacity 
           style={styles.SubmitButton}
           onPress={handleSubmit}>
           <Text bold meduim center color="#ffffff"> 
             {loading? <ActivityIndicator /> : title} 
           </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    SubmitButton: {
        height: 50,
        marginVertical: 20,
        backgroundColor: "#ff1a1a",
        justifyContent: "center",
        marginHorizontal: 20,
        borderRadius: 25,

    }

});
 
export default SubmitButton;