import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Text from "@kaloraat/react-native-text";
import WebView from "react-native-webview";

const LinkView = ({ route }) => {
  const [webLink, setWebLink] = useState("");

  useEffect(() => {
    if (route.params?.link) {
      if (route.params.link.link.includes("https" || "http")) {
        setWebLink(route.params.link.link);
      } else {
        setWebLink(`http://${route.params.link.link}`);
      }
    }
  }, [route.params?.link]);

  return (
    <WebView
      style={{ marginTop: 80 }}
      startInLoadingState={true}
      source={{ uri: webLink }}
    />
  );
};

export default LinkView;
