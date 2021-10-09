import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { StyleSheet } from 'react-native';

const CustomButton = ({ text, active }) => (
  <TouchableOpacity>
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
		borderRadius: "5px",
	},
	machineSelectButtonInactive: {
		width: "90px",
		paddingVertical: "10px",
		margin: "10px",
		textAlign: "center",
		color: "white",
		borderWidth: "1px",
		backgroundColor: "#339AE4",
		borderColor: "#cacaca",
		borderRadius: "5px",
	},
})

export default CustomButton;
