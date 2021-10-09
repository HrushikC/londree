//import * as React from "react";
import React, { useEffect, useState, Component } from 'react';
import { TouchableOpacity, View, Text, TextInput } from 'react-native';
import styles from './styles.js';
import axios from 'axios';
import CustomButton from './components/CustomButton';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      laundromat: {
        name: 'OSU Taylor Tower',
        id: 1,
      },
      droshers: [],
      drosherAvailability: {
        availableWashers: '-',
        totalWashers: '-',
        availableDryers: '-',
        totalDryers: '-'
      },
      machineNumber: 1,
      isWasher: true,
      drosherId: null,
      isRunning: false,
    };
  }

  componentDidMount() {
    this.updateDroshers();
  }

  startLoad = () => {
    //check that load isn't running
    if (!this.state.isRunning) {
      axios.post(`http://localhost:5000/startLoad`, {
        isWash: this.state.isWasher,
        drosher_local_id: this.state.machineNumber,
        laundromat_id: this.state.laundromat.id
      }).then((result) => {
        console.log(result);
        if (result.data.status == 1) {
          this.setState({isRunning: true, drosherId: result.data.drosher_id})
        }
      });
    }
  }

  stopLoad = () => {
    //check that load is running
    if (this.state.isRunning) {
      axios.post(`http://localhost:5000/emptyLoad`, {
        drosher_id: this.state.drosherId
      }).then((result) => {
        this.setState({isRunning: false})
      });
    }
  }

  updateDroshers = () => {
    //get drosher availability for location
    axios.get(`http://localhost:5000/laundromat/${this.state.laundromat.id}`).then((result) => {
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
      //set droshers array and droshersAvailability
      this.setState({drosherAvailability: da, droshers: result.data.droshers})
    });
  }

  render() {
    let da = this.state.drosherAvailability;
    return(
      <View style={styles.body}>
        <Text style={styles.logoText}>Londree</Text>
        <View style={styles.upper}>
  	     <Text style={styles.textMain}>{this.state.laundromat.name}</Text>
  	     <Text style={styles.textMain}>Washers available: {da.availableWashers}/{da.totalWashers}</Text>
  	     <Text style={styles.textMain}>Dryers available: {da.availableDryers}/{da.totalDryers}</Text>
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
           this.state.isRunning ?
            <CustomButton text="Stop load" active={true} clickAction={this.stopLoad}/>
            : <CustomButton text="Start a load" active={true} clickAction={this.startLoad} />
         }
        </View>
      </View>
    )
  }
}

export default App;
