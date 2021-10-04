import * as React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import styles from './styles.js';

export default function App() {
  return (
    <View style={styles.body}>
      <Text style={styles.logoText}>Londree</Text>
      <View style={styles.upper}>
	     <Text style={styles.textMain}>Location</Text>
	     <Text style={styles.textMain}>Washers available: 9/16</Text>
	     <Text style={styles.textMain}>Dryers available: 7/16</Text>
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
	     <View>
	      <Text style={styles.textMain}>Machine number: ____</Text>
	     </View>
	     <TouchableOpacity>
	      <Text style={styles.machineSelectButton}>Start a Load</Text>
	     </TouchableOpacity>
      </View>
    </View>
  );
}
