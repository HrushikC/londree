import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';


class LoadTimer extends Component {
  constructor(props) {
    super(props);
    let distance = this.props.endTime - Math.floor(new Date().getTime() / 1000);
    this.state = {
      endTime: this.props.endTime,
      timeLeft: `${Math.floor(distance/60)}:${distance % 60}`,
    }
  }

  //set component-wide timerProcess variable so that it can be stopped when component unmounts
  timerProcess = 0;

  componentDidMount() {
    // Does this stop when the component is unmounted?
    this.timerProcess = setInterval(() => {
      let now = new Date().getTime();
      let distance = this.state.endTime - Math.floor(now / 1000);
      let minutes = Math.floor(distance/60);
      let seconds = distance % 60;
      console.log(seconds);
      this.setState({ timeLeft: `${minutes}:${seconds}` })
      if (distance < 0) {
        clearInterval(x);
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerProcess);
  }

  render() {
    return(
      <View><Text>{this.state.timeLeft}</Text></View>
    )
  }
}

const styles = StyleSheet.create({
  waiting: {
    backgroundColor: "#CCCF35",
  },
})

export default LoadTimer;
