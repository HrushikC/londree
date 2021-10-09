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
		bottom: "5vh",
		position: "absolute",
	},
	machineSelect: {
		flex: 1,
		flexDirection: 'row',
	},
	machineNumInputContainer: {
		flex: 1,
		flexDirection: 'row'
	},
	machineNumInput: {
		backgroundColor: 'white',
		width: '30px',
		paddingHorizontal: '5px'
	}
});

export default mainStyle;
