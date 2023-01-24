import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const contactsMenuButton = [
  {
    type: "starred",
    name: "Starred",
  },
  {
    type: "contact",
    name: "Devvrat Sharma",
    photo: require("../assets/devvrat.jpeg"),
  },
  {
    type: "contact",
    name: "Dev Vashishth",
    photo: require("../assets/devvrat.jpeg"),
  },
  {
    type: "contact",
    name: "Mithilesh Vashishth",
    photo: require("../assets/devvrat.jpeg"),
  },
];

function ContactsMenu() {
  return (
    <View style={styles.container}>
      {contactsMenuButton?.map((contact, index) => {
        return (
          <View style={styles.row} key={index}>
            {contact?.type === "starred" ? (
              <View style={styles.starredIcon}>
                <AntDesign name="star" size={30} color="#efefef" />
              </View>
            ) : (
              <Image source={contact?.photo} style={styles.image} />
            )}

            <Text style={styles.text}>{contact?.name}</Text>
          </View>
        );
      })}
    </View>
  );
}

export default ContactsMenu;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  starredIcon: {
    backgroundColor: "#333333",
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  text: {
    color: "white",
    paddingLeft: 15,
    fontSize: 18,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 20,
  },
});
