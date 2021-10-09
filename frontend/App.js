//import * as React from "react";
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, TextInput } from 'react-native';
import styles from './styles.js';
import axios from 'axios';

export default function App() {
  const [ laundromat, setLaundromat ] = useState({
    name: 'OSU Taylor Tower',
    id: 1,
  })
  const [ droshers, setDroshers ] = useState([]);
  const [ drosherAvailability, setDrosherAvailability ] = useState({
    availableWashers: '-',
    totalWashers: '-',
    availableDryers: '-',
    totalDryers: '-'
  })
  useEffect(() => {
    //get drosher availability for location
    axios.get(`http://localhost:5000/laundromat/${laundromat.id}`).then((result) => {
      //set droshers array
      setDroshers(result.data.droshers);
      //set drosher availability data
      let da = {
        availableWashers: 0,
        totalWashers: 0,
        availableDryers: 0,
        totalDryers: 0
      };
      result.data.droshers.forEach((drosher) => {
        if (drosher.is_washer) {
          da.totalWashers++;
          if (drosher.end_time == 0)
            da.availableWashers++;
        } else {
          da.totalDryers++;
          if (drosher.end_time == 0)
            da.availableDryers++;
        }
      });
      setDrosherAvailability(da);
    });
  }, []);

  return (
    <View style={styles.body}>
      <Text style={styles.logoText}>Londree</Text>
      <View style={styles.upper}>
	     <Text style={styles.textMain}>{laundromat.name}</Text>
	     <Text style={styles.textMain}>Washers available: {drosherAvailability.availableWashers}/{drosherAvailability.totalWashers}</Text>
	     <Text style={styles.textMain}>Dryers available: {drosherAvailability.availableDryers}/{drosherAvailability.totalDryers}</Text>
      </View>
      <View style={styles.lower}>
	     <View style={styles.machineSelect}>
	      <TouchableOpacity>
	       <Text style={styles.machineSelectButton}>Washer</Text>
	      </TouchableOpacity>
	      <TouchableOpacity>
	       <Text style={styles.machineSelectButton}>Dryer</Text>
	      </TouchableOpacity>
	     </View>
	     <View style={styles.machineNumInputContainer}>
	      <Text style={styles.textMain}>Machine number: </Text>
        <TextInput style={styles.machineNumInput}></TextInput>
	     </View>
	     <TouchableOpacity>
	      <Text style={styles.machineSelectButton}>Start a Load</Text>
	     </TouchableOpacity>
      </View>
    </View>
  );
}
