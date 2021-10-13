import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';

const gridStyle = (count) => {
  if (count <= 10)
    return styles.grid1;
  else if (count <= 20)
    return styles.grid2;
  else
    return styles.grid3;
}

const DrosherGrid = ({ droshers, setActiveDrosher }) => (
  <View style={[styles.dgrid, gridStyle(droshers.length)]}>{
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
        <TouchableOpacity onPress={() => {setActiveDrosher(drosher)}} style={[styles.block, bgColor()]}>
          <Text style={styles.text}>{drosher.local_id}</Text>
        </TouchableOpacity>
      )
    })
  }</View>
)

const styles = StyleSheet.create({
  dgrid: {
    display: "grid",
    width: "250px",
    gridRowGap: "10px",
    gridColumnGap: "10px",
  },
  grid1: {
    gridTemplateColumns: "auto",
  },
  grid2: {
    gridTemplateColumns: "auto auto",
  },
  grid3: {
    gridTemplateColumns: "auto auto auto",
  },
  text: {
    color: "black",
  },
  block: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    alignItems: "center",
    padding: "8px",
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
