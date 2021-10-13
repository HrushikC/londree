import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';

const DrosherGrid = ({ droshers, setActiveDrosher }) => (
  <View>{
    droshers.map((drosher) => {
      const bgColor = () => {
        if (drosher.end_time == 0)
          return styles.open;
        else if (drosher.end_time > Math.floor(Date.now()/1000))
          return styles.full;
        else
          return styles.waiting;
      }
      return (
        <TouchableOpacity onPress={() => {setActiveDrosher(drosher.id)}} style={[styles.block, bgColor()]}>
          <Text style={styles.text}>{drosher.local_id}</Text>
        </TouchableOpacity>
      )
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
    backgroundColor: "#24C316",
  },
  full: {
    backgroundColor: "#EC1F1F",
  },
  waiting: {
    backgroundColor: "#CCCF35",
  },
})

export default DrosherGrid;
