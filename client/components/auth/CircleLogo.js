import React from "react";
import { View, Image, StyleSheet } from "react-native";

const CircleLogo = ({ children }) => {
  return (
    <View style={styles.ImageContainer}>
      <View style={styles.CircleContainer}>
        {children ? (
          children
        ) : (
          <Image
            style={styles.Image}
            source={require("../../assets/logo.png")}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 80,
    paddingBottom: 20,
  },
  Image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  CircleContainer: {
    backgroundColor: "#f2f2f2",
    height: 190,
    width: 190,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CircleLogo;
