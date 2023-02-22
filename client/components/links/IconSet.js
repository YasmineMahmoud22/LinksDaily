import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Text from "@kaloraat/react-native-text";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { AuthContext } from "../../context/auth";
import dayjs from "dayjs";

const IconSet = ({ handleLikePress, handleUnLikePress, link }) => {
  const [auth, setAuth] = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={styles.iconsContainer}>
      <View style={{ alignItems: "center" }}>
        <FontAwesome5
          name='eye'
          size={25}
          color='#ff4d4d'
          style={styles.shadow}
        />
        <Text center>{link.views}</Text>
      </View>
      {link?.likes?.includes(auth?.user?._id) ? (
        <TouchableOpacity
          onPress={() => handleUnLikePress(link)}
          style={{ alignItems: "center" }}
        >
          <FontAwesome5
            name='heart'
            size={25}
            color='#ff4d4d'
            solid
            style={styles.shadow}
          />
          <Text center>{link.likes.length}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => handleLikePress(link)}
          style={{ alignItems: "center" }}
        >
          <FontAwesome5
            name='heart'
            size={25}
            color='#ff4d4d'
            style={styles.shadow}
          />
          <Text center>{link.likes.length}</Text>
        </TouchableOpacity>
      )}
      <View style={{ alignItems: "center" }}>
        <FontAwesome5
          name='clock'
          size={25}
          color='#ff4d4d'
          style={styles.shadow}
        />
        <Text center>{dayjs(link.createdAt).format("DD/MM/YY")}</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <FontAwesome5
          name='user'
          size={25}
          color='#ff4d4d'
          style={styles.shadow}
          onPress={() => {
            navigation.navigate("profile", {
              name: link.postedBy?.name,
              _id: link.postedBy?._id,
            });
          }}
        />
        <Text center>{link.postedBy?.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconsContainer: {
    width: "92%",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    top: 10,
    marginHorizontal: 20,
  },
  shadow: {
    shadowColor: "#333",
    elevation: 22,
    backgroundColor: "rgba(255, 255, 255, 0.0)",
    padding: 0,
  },
});
export default IconSet;
