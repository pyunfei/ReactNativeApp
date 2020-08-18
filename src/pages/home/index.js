import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from './home';
import DianZhang from './dianzhang';
import My from './my';
import GongLue from './gonglue';
import Bijia from './bijia';
import scalePx from '@/utils/scalePx';
import { themeMap } from '@/utils/scaleStyle';

const icons = [
  {
    icondefault: require('./assets/home.png'),
    iconactive: require('./assets/home_active.png'),
  },
  {
    icondefault: require('./assets/beeking.png'),
    iconactive: require('./assets/beeking_active.png'),
  },
  {
    icondefault: require('./assets/bee.png'),
    iconactive: require('./assets/bee_active.png'),
  },
  {
    icondefault: require('./assets/my.png'),
    iconactive: require('./assets/my_active.png'),
  },
  {
    icondefault: require('./assets/gonglue.png'),
    iconactive: require('./assets/gonglue_active.png'),
  },
  {
    icondefault: require('./assets/dianzhang.png'),
    iconactive: require('./assets/dianzhang_active.png'),
  },
  {
    icondefault: require('./assets/bijia.png'),
    iconactive: require('./assets/bijia_active.png'),
  },
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
    HomeBijia: {
      screen: Bijia,
      navigationOptions: {
        tabBarLabel: '比价',
        tabBarIcon: ({ tintColor, focused }) => IconTab(focused, icons[6]),
      },
    },
    HomeDianZhang: {
      screen: DianZhang,
      navigationOptions: {
        tabBarLabel: '店长',
        tabBarIcon: ({ tintColor, focused }) => IconTab(focused, icons[5]),
      },
    },
    HomeGongLue: {
      screen: GongLue,
      navigationOptions: {
        tabBarLabel: '攻略',
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
