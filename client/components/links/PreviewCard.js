import React, { useContext } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Text from "@kaloraat/react-native-text";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import { LinkContext } from "../../context/link";
import IconSet from "./IconSet";
import { AuthContext } from "../../context/auth";

const PreviewCard = ({
  ogTitle = "unTitled",
  ogImage = { url: "https://via.placeholder.com/150x60.png?text=Image" },
  ogDescription = "No discription found",
  handlePress = (f) => f,
  link = {},
  showIcons = false,
}) => {
  const [links, setLinks] = useContext(LinkContext);
  const [auth, setAuth] = useContext(AuthContext);

  const handleLikePress = async (link) => {
    const { data } = await axios.put("/like", { linkId: link._id });
    setLinks((links) => {
      const index = links.findIndex((l) => l._id === link._id);
      data.postedBy = auth.user;
      links[index] = data;
      return [...links];
    });
  };
  const handleUnLikePress = async (link) => {
    const { data } = await axios.put("/unlike", { linkId: link._id });
    setLinks((links) => {
      const index = links.findIndex((l) => l._id === link._id);
      data.postedBy = auth.user;
      links[index] = data;
      return [...links];
    });
  };
  const imageUrl = (ogImage) => {
    if (ogImage?.url) {
      return ogImage.url;
    } else if (ogImage?.url.length > 0) {
      return ogImage[0].url;
    }
  };

  return (
    <View style={styles.previewCountainer}>
      <Image source={{ uri: imageUrl(ogImage) }} style={styles.previewImage} />
      {showIcons && (
        <IconSet
          handleLikePress={handleLikePress}
          handleUnLikePress={handleUnLikePress}
          link={link}
        />
      )}
      <TouchableOpacity onPress={() => handlePress(link)}>
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
