import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../context/auth";
import FooterTabs from "../components/nav/FooterTabs";

const Links = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Hey SEfMO</Text>
      <FooterTabs />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginVertical: 15,
  },
});

export default Links;
