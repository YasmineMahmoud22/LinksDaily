import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Text } from "react-native";

const UserInput = ({
  label,
  value,
  setValue,
  autoCompleteType,
  secureTextEntry,
  autoCorrect,
  keyboardType,
}) => {
  return (
    <View style={styles.container}>
      <Text semi style={styles.label}>
        {label}
      </Text>
      <TextInput
        style={styles.inputContainer}
        placeholder={`write your ${label} please`}
        value={value}
        onChangeText={(text) => setValue(text)}
        autoCompleteType={autoCompleteType}
        secureTextEntry={secureTextEntry}
        autoCorrect={autoCorrect}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginTop: 20,
  },
  label: {
    textTransform: "capitalize",
  },
  inputContainer: {
    height: 48,
    borderBottomWidth: 0.5,
    borderBottomColor: "#8e93a1",
    marginBottom: 10,
    paddingLeft: 2,
  },
});

export default UserInput;
