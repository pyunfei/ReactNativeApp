/* eslint-disable prettier/prettier */
import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import weChat from './weChat';
import Phone from './phone';
import Find from './find';
import My from './my';

import scalePx from '@/utils/scalePx';

const icons = [
  {
    iconDefault: require('./assets/wechat.png'),
    iconActive: require('./assets/wechat_active.png'),
  },
  {
    iconDefault: require('./assets/phone.png'),
    iconActive: require('./assets/phone_active.png'),
  },
  {
    iconDefault: require('./assets/faxian.png'),
    iconActive: require('./assets/faxian_active.png'),
  },
  {
    iconDefault: require('./assets/my.png'),
    iconActive: require('./assets/my_active.png'),
  },
];
function IconTab(focused, iconObj) {
  return (
    <Image
      style={{ width: scalePx(48), height: scalePx(48) }}
      source={focused ? iconObj.iconActive : iconObj.iconDefault}
    />
  );
}
const TabNavigator = createBottomTabNavigator(
  {
    HomeIndex: {
      screen: weChat,
      navigationOptions: {
        tabBarLabel: '微信',
        tabBarIcon: ({ tintColor, focused }) => IconTab(focused, icons[0]),
      },
    },
    HomePhone: {
      screen: Phone,
      navigationOptions: {
        tabBarLabel: '通讯录',
        tabBarIcon: ({ tintColor, focused }) => IconTab(focused, icons[1]),
      },
    },
    HomeFind: {
      screen: Find,
      navigationOptions: {
        tabBarLabel: '发现',
        tabBarIcon: ({ tintColor, focused }) => IconTab(focused, icons[2]),
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
      style: { backgroundColor: '#e3e3e3', borderTopWidth: 0 },
      activeTintColor: '#1afa29',
      inactiveTintColor: '#707070',
      allowFontScaling: false,
      keyboardHidesTabBar: true,
    },
  }
);
export default TabNavigator;
