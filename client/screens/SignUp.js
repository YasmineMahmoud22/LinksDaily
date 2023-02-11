import React, { useState, useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Text from "@kaloraat/react-native-text";
import { StatusBar } from "expo-status-bar";
import UserInput from "../components/auth/UserInput";
import SubmitButton from "../components/auth/SubmitButton";
import axios from "axios";
import CircleLogo from "../components/auth/CircleLogo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/auth";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(AuthContext);
  console.log("state => ", state);

  const Inputlabels = [
    { InputLabel: "name", value: name, InputValue: setName },
    { InputLabel: "email", value: email, InputValue: setEmail },
    { InputLabel: "password", value: password, InputValue: setPassword },
  ];

  const handleSubmit = async () => {
    setLoading(true);
    if (!name && !email && !password) {
      alert("All fields are required ");
      setLoading(false);
      return; // will end the function
    }
    try {
      const { data } = await axios.post(`/signup`, {
        name,
        email,
        password,
      });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        //save to context
        setState(data);
        //save to asyncronous storage
        await AsyncStorage.setItem("@auth", JSON.stringify(data));
        setLoading(false);
        console.log("Sign Up Success => ");
        alert("Sign Up Successfully");
        navigation.navigate("Home");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar style='auto' />
        <CircleLogo />
        <Text title center color='#ff1a1a'>
          Sign Up
        </Text>
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
          title='Sign Up'
          handleSubmit={handleSubmit}
        />

        <Text center>
          Already Joined ?{" "}
          <Text color='#ff4d4d' onPress={() => navigation.navigate("SignIn")}>
            {" "}
            Sign In
          </Text>
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

export default SignUp;
