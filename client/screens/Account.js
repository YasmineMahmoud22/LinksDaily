import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Text from "@kaloraat/react-native-text";
import { StatusBar } from "expo-status-bar";
import UserInput from "../components/auth/UserInput";
import SubmitButton from "../components/auth/SubmitButton";
import axios from "axios";
import CircleLogo from "../components/auth/CircleLogo";
import { AuthContext } from "../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";

const Account = ({ navigation }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState({
    url: "",
    public_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [uploadImage, setUploadImage] = useState("");
  const [state, setState] = useContext(AuthContext);

  const Inputlabels = [
    { InputLabel: "password", value: password, InputValue: setPassword },
  ];

  useEffect(() => {
    if (state) {
      const { name, role, image, email } = state.user;
      setName(name);
      setEmail(email);
      setRole(role);
      setImage(image);
    }
  }, [state]);

  const handleSubmit = async () => {
    setLoading(true);
    if (!password) {
      alert("Enter New Password");
      setLoading(false);
      return; // will end the function
    }
    try {
      const { data } = await axios.post("/update-password", { password });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        alert("password updated ");
        setPassword("");
        setLoading(false);
      }
    } catch (error) {
      alert("Passord update failed, try again");
      console.log(error);
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Camera access is required");
      return;
    }

    let PickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    // console.log("pickerResukt => ", PickerResult);
    if (PickerResult.canceled === true) {
      return;
    }

    let base64Image = `data:image/jpg;base64,${PickerResult.base64}`;
    setUploadImage(base64Image);

    const { data } = await axios.post("/upload-image", {
      image: base64Image,
    });
    console.log("UPLOADED RESPONSE =>", data);

    const as = JSON.parse(await AsyncStorage.getItem("@auth"));
    as.user = data;
    await AsyncStorage.setItem("@auth", JSON.stringify(as));

    setState({ ...state, user: data });
    setImage(data.image);
    alert("profile image saved");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" />
        <View style={{ marginVertical: 40 }}>
          <CircleLogo>
            {image?.url ? (
              <Image style={styles.Image} source={{ uri: image.url }} />
            ) : uploadImage ? (
              <Image style={styles.Image} source={{ uri: uploadImage }} />
            ) : (
              <TouchableOpacity onPress={() => handleUpload()}>
                <FontAwesome5 name="camera" size={25} color="#ff4d4d" />
              </TouchableOpacity>
            )}
          </CircleLogo>

          {image?.url? (
            <TouchableOpacity onPress={() => handleUpload()}>
              <FontAwesome5
                name="camera"
                size={25}
                color="#ff4d4d"
                style={{ alignSelf: "center", marginBottom: 10, marginTop: -5 }}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
          <Text title center style={{ paddingBottom: 10 }}>
            {name}
          </Text>
          <Text medium center style={{ paddingBottom: 10 }}>
            {email}
          </Text>
          <Text small center light style={{ paddingBottom: 45 }}>
            {role}
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
              keyboardType="default"
              
            />
          ))}
          <SubmitButton
            loading={loading}
            title="Update Password"
            handleSubmit={handleSubmit}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  Image: {
    height: 190,
    width: 190,
    borderRadius: 100,
    marginVertical: 20,
  },
});

export default Account;
