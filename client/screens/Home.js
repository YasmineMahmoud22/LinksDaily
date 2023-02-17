import React, { useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, View } from "react-native";
import Text from "@kaloraat/react-native-text";
import { AuthContext } from "../context/auth";
import FooterTabs from "../components/nav/FooterTabs";
import { LinkContext } from "../context/link";
import axios from "axios";
import PreviewCard from "../components/links/PreviewCard";

const Home = ({ navigation }) => {
  const [state, setState] = useContext(AuthContext);
  const [links, setLinks] = useContext(LinkContext);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    const { data } = await axios.get("/links");
    setLinks(data);
  };
  const handlePress = (link) => {
    navigation.navigate("LinkView", {link});
  };

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Text title center light style={{ paddingBottom: 10 }}>
        Rescent Links
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {links &&
          links.map((link) => (
            <View key={link._id} style={{ alignItems: "center" }}>
              <PreviewCard {...link.urlPreview} handlePress={handlePress} link={link} />
            </View>
          ))}
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
});

export default Home;
