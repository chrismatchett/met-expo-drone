import "expo-dev-client";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import dgram from "react-native-udp";
import * as Network from 'expo-network';

//import drone from "./drone.js";

function randomPort() {
  return (Math.random() * 60536) | (0 + 5000); // 60536-65536
}

// only works for 8-bit chars
function toByteArray(obj) {
  var uint = new Uint8Array(obj.length);
  for (var i = 0, l = obj.length; i < l; i++) {
    uint[i] = obj.charCodeAt(i);
  }

  return new Uint8Array(uint);
}

export default function App() {

  const [chatter, setChatter] = useState([]);
  const [ipAddress, setIpAddress] = useState("");

  const updateChatter = (msg) => {
    setChatter((prev) => prev.concat([msg]));
  };  
  
  useEffect(() => {

    (async () => {
      const { isConnected, type, ipAddress } = await Network.getConnectionInfo();
      console.log(type);
      if (isConnected) {
        setIpAddress(ipAddress);
        //updateChatter("Phone Ip Address: ", + ipAddress);
      }
    })();

  //   let a = dgram.createSocket("udp4");
  //   let aPort = randomPort();
  //   a.bind(aPort, function (err) {
  //     if (err) throw err;
  //     updateChatter("a bound to " + JSON.stringify(a.address()));
  //   });
    
  //   a.on("message", function (data, rinfo) {
  //     var str = String.fromCharCode.apply(null, new Uint8Array(data));
  //     updateChatter("a received echo " + str + " " + JSON.stringify(rinfo));
  //     a.close();
  //     a = null;
  //   });
      
  //   const data = toByteArray("command");

  //     a.send(data, 0, data.length, 8889, "192.168.10.1", function (err) {
  //       if (err) throw err;
  //       updateChatter("b echoed data");
  //     });
    
  //   return () => {
  //     if (a) a.close();
  //   };
    
  }, []);

  return (
    <View style={styles.container}>
      {chatter.map((msg, index) => (
          <Text key={index} style={styles.welcome}>
            {msg}
          </Text>
        ))}
        <Text>{ipAddress}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
});


