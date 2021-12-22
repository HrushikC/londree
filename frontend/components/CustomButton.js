import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const CustomButton = ({ text, active, clickAction }) => (
  <TouchableOpacity onPress={clickAction}>
    {active ? <Text style={styles.machineSelectButtonActive}>{text}</Text>
      : <Text style={styles.machineSelectButtonInactive}>{text}</Text>}
  </TouchableOpacity>
)

const styles = StyleSheet.create({
	machineSelectButtonActive: {
		width: "90px",
		paddingVertical: "10px",
		margin: "10px",
		textAlign: "center",
		backgroundColor: "#339AE4",
		color: "white",
    borderWidth: "1px",
    borderColor: "#cacaca",
		borderRadius: "5px",
	},
	machineSelectButtonInactive: {
		width: "90px",
		paddingVertical: "10px",
		margin: "10px",
		textAlign: "center",
		color: "white",
		backgroundColor: "#339AE4",
		borderRadius: "5px",
	},
})

export default CustomButton;
