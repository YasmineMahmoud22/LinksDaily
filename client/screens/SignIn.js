import React, { useState, useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Text from "@kaloraat/react-native-text";
import { StatusBar } from "expo-status-bar";
import UserInput from "../components/auth/UserInput";
import SubmitButton from "../components/auth/SubmitButton";
import axios from "axios";
import CircleLogo from "../components/auth/CircleLogo";
import { AuthContext } from "../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(AuthContext);

  const Inputlabels = [
    { InputLabel: "email", value: email, InputValue: setEmail },
    { InputLabel: "password", value: password, InputValue: setPassword },
  ];

  const handleSubmit = async () => {
    setLoading(true);
    if (!email && !password) {
      alert("All fields are required ");
      setLoading(false);
      return; // will end the function
    }
    try {
      const { data } = await axios.post("/signin", {
        email,
        password,
      });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        setState(data);
        await AsyncStorage.setItem("@auth", JSON.stringify(data));
        setLoading(false);
        console.log("Sign In Success => ");
        alert("Sign In Successfully");
        navigation.navigate("Home");
      }
    } catch (error) {
      console.log("handleSubmit error => ", error);
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" />
        <CircleLogo />
        <Text title center color="#ff1a1a">
          Sign In
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
          title="Sign In"
          handleSubmit={handleSubmit}
        />
        <Text center>
          Not yet registered ?{" "}
          <Text color="#ff4d4d" onPress={() => navigation.navigate("SignUp")}>
            Sign Up
          </Text>
        </Text>
        <Text center color="#ff8080" style={{ marginTop: 10 }}>
          Forget password ?
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

export default SignIn;
