import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import StartMeeting from "../components/StartMeeting";
import { io } from "socket.io-client";
import { Camera } from "expo-camera";

let socket;

function MeetingRoom() {
  const [name, setName] = useState();
  const [roomId, setRoomId] = useState();
  const [activeUsers, setActiveUsers] = useState();
  const [startCamera, setStartCamera] = useState(false);

  const _startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status == "granted") {
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };

  const joinRoom = () => {
    _startCamera();
    socket.emit("join-room", { roomId: roomId, userName: name });
  };

  const _leaveRoom = () => {
    setStartCamera(false);
    socket.emit("disconnect", { roomId: roomId, userName: name });
  };

  useEffect(() => {
    const API_URL =
      "https://1c00-2402-3a80-842-27ff-b1b4-7e57-4c65-c39.in.ngrok.io";
    socket = io(`${API_URL}`);
    socket.on("connection", () => console.log("==connected"));
    socket.on("all-users", (users) => {
      console.log("Active users");
      console.log("===users", users);
      // users = users.filter((user) => user?.userName != name);
      setActiveUsers(users);
    });
  }, []);

  return (
    <View style={styles.container}>
      {startCamera ? (
        <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
          <View
            style={{
              flex: 1,
              height: "100%",
              backgroundColor: "black",
              justifyContent: "center",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Camera
              type={"front"}
              style={{
                width: activeUsers?.length <= 1 ? "100%" : 200,
                height: activeUsers?.length <= 1 ? 600 : 200,
              }}
            ></Camera>
            {activeUsers
              ?.filter((user) => user?.userName != name)
              .map((user, index) => {
                return (
                  <View key={index} style={styles.activeUserContainer}>
                    <Text style={{ color: "white" }}>{user?.userName}</Text>
                  </View>
                );
              })}
          </View>

          {/* <View style={styles.menu}>
            <TouchableOpacity style={styles.tile} onPress={() => _leaveRoom()}>
              <Text style={styles.textTile}>LEAVE ROOM</Text>
            </TouchableOpacity>
          </View> */}
        </SafeAreaView>
      ) : (
        <StartMeeting
          name={name}
          setName={setName}
          roomId={roomId}
          setRoomId={setRoomId}
          joinRoom={joinRoom}
        />
      )}
    </View>
  );
}

export default MeetingRoom;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1c1c1c",
    flex: 1,
  },
  info: {
    width: "100%",
    backgroundColor: "#373538",
    height: 50,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#484648",
    padding: 12,
    justifyContent: "center",
  },
  textInput: {
    color: "white",
    fontSize: 18,
  },
  startMeetingButton: {
    width: 350,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0470DC",
    height: 50,
    borderRadius: 15,
  },
  tile: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginTop: 15,
  },
  textTile: {
    color: "white",
    marginTop: 10,
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  activeUserContainer: {
    borderColor: "gray",
    borderWidth: 1,
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
});

