import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Text from "@kaloraat/react-native-text";
import CircleLogo from "../components/auth/CircleLogo";
import { StatusBar } from "expo-status-bar";
import SubmitButton from "../components/auth/SubmitButton";
import UserInput from "../components/auth/UserInput";
import axios from "axios";

const ForgetPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const Inputlabels = [
    { InputLabel: "email", value: email, InputValue: setEmail },
    // { InputLabel: "password", value: password, InputValue: setPassword },
  ];

  const handleSubmit = async () => {
    setLoading(true);

    if (!email) {
      alert("Email is required");
      setLoading(false);
      return;// to end the function immediatly 
    }

    try {
      const { data } = await axios.post("/forgot-password", {
        email,
      });
      setLoading(false);
      console.log(" RESET DATA RES => ", data);
      alert("Enter the password reset code we sent in your email") 

    } catch (error) {
      alert("Error sending email, try again ");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <ScrollView>
        <CircleLogo />
        {Inputlabels.map(({ InputLabel, value, InputValue }) => (
          <UserInput
            key={InputLabel}
            label={InputLabel}
            value={value}
            setValue={InputValue}
            secureTextEntry={InputLabel === "password" ? true : false}
            autoCompleteType={InputLabel}
            autoCorrect
            keyboardType={InputLabel === "email" ? "email-address" : "default"}
          />
        ))}
        <SubmitButton
          loading={loading}
          title='Request Reset Code'
          handleSubmit={handleSubmit}
        />
        <Text
          center
          color='#ff8080'
          style={{ marginTop: 10 }}
          onPress={() => navigation.navigate("SignIn")}
        >
          Sign In
        </Text>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    justifyContent: "center",
  },
});

export default ForgetPassword;
