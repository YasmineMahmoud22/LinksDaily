import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Text from "@kaloraat/react-native-text";

const PreviewCard = ({
  ogTitle = "unTitled",
  ogImage = { url: "https://via.placeholder.com/150x60.png?text=Image" },
  ogDescription = "No discription found",
  handlePress = (f) => f,
  link
}) => {
  return (
    <View style={styles.previewCountainer}>
      <Image source={{ uri: ogImage.url }} style={styles.previewImage} />
      <TouchableOpacity onPress={()=> handlePress(link)}>
        <View style={styles.urlDetailes}>
          <Text style={{ paddingTob: 5, paddingBottom: 5 }}>{ogTitle}</Text>
          <Text small>{ogDescription}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  previewCountainer: {
    height: 280,
    width: "92%",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    elevation: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    marginBottom: 20,
    paddingBottom: 10,
  },
  previewImage: {
    height: "70%",
    width: "100%",
  },
  urlDetailes: {
    padding: 5,
    height: "50%",
    marginHorizontal: 5,
  },
});
export default PreviewCard;
