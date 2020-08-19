/* eslint-disable prettier/prettier */
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { View, Text } from 'react-native';

class Index extends React.Component {
  async componentDidMount() {
    this.goPage('home');
    this.hideSplash();
  }

  goPage = name => {
    this.props.navigation.navigate(name);
  };

  hideSplash = () => {
    SplashScreen.hide();
  };

  render() {
    return <View><Text>12</Text></View>;
  }
}

export default Index;
