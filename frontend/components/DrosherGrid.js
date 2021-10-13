import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';

const DrosherGrid = ({ droshers, setActiveDrosher }) => (
  <View>{
    droshers.map((drosher) => {
      //These if statements set the color of the block. There is probably a better way to do this
      if (drosher.end_time == 0) {
        return (
          <TouchableOpacity onPress={() => {setActiveDrosher(drosher.id)}} style={styles.open}>
            <Text style={styles.text}>{drosher.local_id}</Text>
          </TouchableOpacity>
        )
      } else if (drosher.end_time > Math.floor(Date.now()/1000)) {
        return (
          <TouchableOpacity onPress={() => {setActiveDrosher(drosher.id)}} style={styles.full}>
            <Text style={styles.text}>{drosher.local_id}</Text>
          </TouchableOpacity>
        )
      } else {
        return (
          <TouchableOpacity onPress={() => {setActiveDrosher(drosher.id)}} style={styles.waiting}>
            <Text style={styles.text}>{drosher.local_id}</Text>
          </TouchableOpacity>
        )
      }
    })
  }</View>
)

const styles = StyleSheet.create({
  text: {
    color: "black",
  },
  block: {
    width: "70px",
    height: "20px",
    backgroundColor: "white",
    alignItems: "center",
    margin: "5px",
    padding: "3px",
  },
  open: {
    width: "70px",
    height: "20px",
    backgroundColor: "#24C316",
    alignItems: "center",
    margin: "5px",
    padding: "3px",
  },
  full: {
    width: "70px",
    height: "20px",
    backgroundColor: "#EC1F1F",
    alignItems: "center",
    margin: "5px",
    padding: "3px",
  },
  waiting: {
    width: "70px",
    height: "20px",
    backgroundColor: "#CCCF35",
    alignItems: "center",
    margin: "5px",
    padding: "3px",
  },
})

export default DrosherGrid;
