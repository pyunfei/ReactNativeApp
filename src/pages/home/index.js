import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from './home';
import My from './my';
import Phone from './phone';
import scalePx from '@/utils/scalePx';
import { themeMap } from '@/utils/scaleStyle';

const icons = [
  {
    icondefault: require('./assets/home.png'),
    iconactive: require('./assets/home_active.png'),
  },
  {
    icondefault: require('./assets/my.png'),
    iconactive: require('./assets/my_active.png'),
  },
  {
    icondefault: require('./assets/phone.png'),
    iconactive: require('./assets/phone_active.png'),
  }
];
function IconTab(focused, iconObj) {
  return (
    <Image
      style={{ width: scalePx(48), height: scalePx(48) }}
      source={focused ? iconObj.iconactive : iconObj.icondefault}
    />
  );
}
const TabNavigator = createBottomTabNavigator(
  {
    HomeIndex: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: '首页',
        tabBarIcon: ({ tintColor, focused }) => IconTab(focused, icons[0]),
      },
    },
    HomePhone: {
      screen: Phone,
      navigationOptions: {
        tabBarLabel: '通讯录',
        tabBarIcon: ({ tintColor, focused }) => IconTab(focused, icons[4]),
      },
    },
    HomeMy: {
      screen: My,
      navigationOptions: {
        tabBarLabel: '我的',
        tabBarIcon: ({ tintColor, focused }) => IconTab(focused, icons[3]),
      },
    },
  },
  {
    tabBarOptions: {
      style: { backgroundColor: 'white', borderTopWidth: 0 },
      activeTintColor: themeMap.$BlackS,
      inactiveTintColor: '#C5CAD4',
      allowFontScaling: false,
      keyboardHidesTabBar: true,
    },
  }
);
export default TabNavigator;
