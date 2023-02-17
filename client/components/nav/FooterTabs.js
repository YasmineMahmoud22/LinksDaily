import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Text from "@kaloraat/react-native-text";
import { useNavigation, useRoute } from "@react-navigation/native";

const FooterTabs = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const Tabs = [
    { TabName: "Home", IconName: "home" },
    { TabName: "Post", IconName: "plus-square" },
    { TabName: "Links", IconName: "list-ol" },
    { TabName: "Account", IconName: "user" },
  ];

  return (
    <View>
    <View  style={styles.divider}/>
      <View style={styles.TabsContainer}>
        {Tabs.map(({ TabName, IconName }) => (
          <TouchableOpacity
            key={TabName}
            onPress={() => navigation.navigate(TabName)}
          >
            <>
              <FontAwesome5
                name={IconName}
                size={25}
                style={styles.Icon}
                color={TabName === route.name ? "#ff9999" : null}
              />
              <Text> {TabName} </Text>
            </>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TabsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 30,
    margin: 10,
  },
  Icon: {
    marginBottom: 3,
    alignSelf: "center",
  },
  divider: {
    height: 0.5,
    backgroundColor: "#000000",
  }
});

export default FooterTabs;
