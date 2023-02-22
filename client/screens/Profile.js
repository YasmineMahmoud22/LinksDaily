import React, { useState, useEffect, useContext } from "react";
import { useRoute } from "@react-navigation/native";
import {
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StyleSheet,
} from "react-native";
import Text from "@kaloraat/react-native-text";
import { AuthContext } from "../context/auth";
import { LinkContext } from "../context/link";
import axios from "axios";

const Profile = ({ navigation }) => {
  const route = useRoute();
  const [auth, setAuth] = useContext(AuthContext);
  const [links, setLinks] = useContext(LinkContext);

  const [userProfile, setUserProfile] = useState({});
  const [userLinks, setUserLinks] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get(`/user-profile/${route.params._id}`);
        setUserLinks(data.links);
        setUserProfile(data.Profile);
        // console.log("user profile data =>", data.profile);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/living.jpg")}
      resizeMode='cover'
      blurRadius={2}
    >
      <ScrollView>
        <Text title bold center style={{ paddingTop: 60, paddingBottom: 20 }}>
          Profile
        </Text>
        <Text center> {JSON.stringify(route.params, null, 4)} </Text>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
});

export default Profile;
