import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ScrollView, TextInput } from "react-native";
import Text from "@kaloraat/react-native-text";
import FooterTabs from "../components/nav/FooterTabs";
import SubmitButton from "../components/auth/SubmitButton";
import ogs from "@uehreka/open-graph-scraper-react-native";
import urlRegex from "url-regex";
import PreviewCard from "../components/links/PreviewCard";
import axios from "axios";
import { LinkContext } from "../context/link";

const Post = ({ navigation }) => {
  //context
  const [links, setLinks] = useContext(LinkContext);
  //state
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [urlPreview, setUrlPreview] = useState({});

  const handleChange = async (text) => {
    try {
      setLoading(true);
      setLink(text);

      if (urlRegex({ strict: false }).test(text)) {
        ogs({ url: text }, (error, results, response) => {
          console.log("results => ", results);
          if (results.success) {
            setUrlPreview(results);
          }
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!link || !title) {
      alert("paste url and give it a nice title");
      return;
    }
    try {
      const { data } = await axios.post("/post-link", {
        link,
        title,
        urlPreview,
      });
      console.log("data = > ", data);
      setLinks([data, ...links]);
      setTimeout(() => {
        alert("Link Posted");
        navigation.navigate("Home",{reloadScreen: true});
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text center light>
          PASTE WEBSITE URL
        </Text>
        <TextInput
          value={link}
          onChangeText={(text) => {
            handleChange(text);
          }}
          style={styles.PasteContainer}
          placeholder='Paste the Url'
          autoCapitalize='none'
          autoCorrect={false}
        />
        <TextInput
          value={title}
          onChangeText={(text) => setTitle(text)}
          style={styles.PasteContainer}
          placeholder='Give it a title'
          autoCapitalize='sentences'
        />
        {urlPreview.success && (
          <View
            style={{
              marginTop: 30,
              alignItems: "center",
            }}
          >
            <PreviewCard {...urlPreview} />
          </View>
        )}
        <SubmitButton
          title='Submit'
          loading={loading}
          handleSubmit={handleSubmit}
        />
      </ScrollView>
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
  PasteContainer: {
    borderWidth: 1,
    borderColor: "#ffb3b3",
    height: 50,
    marginVertical: 18,
    marginHorizontal: 15,
    borderRadius: 30,
    padding: 15,
  },
});
export default Post;
