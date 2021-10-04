import { StyleSheet } from 'react-native';

const mainStyle = StyleSheet.create({
	body: {
		flex: 1,
		backgroundColor: "#5376B9",
    		alignItems: "center",
	},
  	logoText: {
    		color: "white",
		fontSize: "2em",
		marginTop: "10px",
  	},
	upper: {
		alignItems: "center",
		top: "8vh",
	},
	textMain: {
		color: "white",
		fontSize: "12pt",
	},
	lower: {
		alignItems: "center",
		top: "65vh",
	},
	machineSelect: {
		flex: 1,
		flexDirection: 'row',
	},
	machineSelectButton: {
		width: "90px",
		paddingVertical: "10px",
		margin: "10px",
		textAlign: "center",
		backgroundColor: "#339AE4",
		color: "white",
		//borderWidth: "1px",
		//borderColor: "white",
		//borderRadius: "5px",
	}
});

export default mainStyle;
