import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import StartMeeting from "../components/StartMeeting";
import { io } from "socket.io-client";

function MeetingRoom() {
  const [name, setName] = useState();
  const [roomId, setRoomId] = useState();
  const [activeUsers, setActiveUsers] = useState();

  const joinRoom = () => {
    socket.emit("join-room", { roomId: roomId, userName: name });
  };

  useEffect(() => {
    const API_URL = "http://192.168.43.108:3001";
    socket = io(`${API_URL}`);
    socket.on("connection", () => console.log("==connected"));
    socket.on("all-users", (users) => {
      console.log("Active users");
      setActiveUsers(users);
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* <View style={styles.startMeetingContainer}>
        <View style={styles.info}>
          <TextInput
            style={styles.textInput}
            value={name}
            placeholder="Enter Name"
            placeholderTextColor="#767476"
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.info}>
          <TextInput
            style={styles.textInput}
            value={roomId}
            placeholder="Enter RoomId"
            placeholderTextColor="#767476"
            onChangeText={(text) => setRoomId(text)}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            // onPress={() => ()}
            style={styles.startMeetingButton}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Start Meeting</Text>
          </TouchableOpacity>
        </View>
      </View> */}
      <StartMeeting
        name={name}
        setName={setName}
        roomId={roomId}
        setRoomId={setRoomId}
        joinRoom={joinRoom}
      />
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
});
