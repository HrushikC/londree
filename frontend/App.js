//import * as React from "react";
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, TextInput } from 'react-native';
import styles from './styles.js';
import axios from 'axios';
import CustomButton from './components/CustomButton';

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
  const [ loadData, setLoadData ] = useState({
    isWasher: true,
    machineNumber: null,
    drosherId: null,
    isRunning: false
  })

  function startLoad() {
    //check that load isn't running
    if (!loadData.isRunning) {
      axios.post(`http://localhost:5000/startLoad`, {
        isWash: isWasher,
        drosher_local_id: machineNumber,
        laundromat_id: laundromat.id
      }).then((result) => {
        if (result.data.status == 1) {
          let newLoadData = loadData;
          newLoadData.isRunning = true;
          setLoadData(newLoadData);
        }
      });
    }
  }

  function stopLoad() {
    //check that load is running
    if (loadData.isRunning) {
      axios.post(`http://localhost:5000/emptyLoad`, {
        drosher_id: drosherId
      }).then((result) => {

      });
    }
  }

  function updateDroshers() {
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
  }

  useEffect(() => {
    updateDroshers();
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
        <CustomButton text="Washer" active={true} />
        <CustomButton text="Dryer" active={false} />
	     </View>
	     <View style={styles.machineNumInputContainer}>
	      <Text style={styles.textMain}>Machine number: </Text>
        <TextInput style={styles.machineNumInput}></TextInput>
	     </View>
       {
         loadData.isRunning ?
          <CustomButton text="Stop load" active={true} />
          : <CustomButton text="Start a load" active={true} />
       }
      </View>
    </View>
  );
}
