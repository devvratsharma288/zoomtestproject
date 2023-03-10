import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";

function SearchBar() {
  return (
    <View style={styles.container}>
      <Fontisto name="search" color={"#858585"} />
      <Text style={styles.textSearchBar}>Search</Text>
    </View>
  );
}

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#333333",
    flexDirection: "row",
    paddingHorizontal: 10,
    height: 40,
    alignItems: "center",
    borderRadius: 10,
  },
  textSearchBar: {
    color: "#858585",
    paddingLeft: 10,
    fontSize: 20,
  },
});
