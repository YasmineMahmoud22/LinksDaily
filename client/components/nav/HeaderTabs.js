import React, { useContext } from "react";
import { View, TouchableOpacity } from "react-native";
import Text from "@kaloraat/react-native-text";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { AuthContext } from "../../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HeaderTab = () => {
  const [state, setState] = useContext(AuthContext);
  const SignOut = async () => {
    setState({ token: "", user: null });
    await AsyncStorage.removeItem("@auth");
  };

  return (
    <View>
      <TouchableOpacity onPress={SignOut}>
        <FontAwesome5 name='sign-out-alt' size={25} color='#ff9999' />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderTab;
