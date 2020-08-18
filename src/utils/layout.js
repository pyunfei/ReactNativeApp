
import { PixelRatio, Dimensions, Platform } from 'react-native';
import getStatusBarHeight from './getStatusBarHeight';
const { height, width } = Dimensions.get('window');

function isIPhoneXs() {
  // iPhoneX 系列高宽比为 2.165333
  return (Platform.OS === 'ios' && (parseInt(100 * height / width) === 216));
}

function statusBarHeight() {
  if (Platform.OS === 'ios') {
    if (isIPhoneXs()) {
      return 44;
    } else {
      return 20;
    }
  } else {
    return getStatusBarHeight();
  }
}

function navBarHeight() {
  if (Platform.OS === 'ios') {
    return 44;
  } else {
    return 56;
  }
}

function totalNavHeight() {
  return statusBarHeight() + navBarHeight();
}

export default {
  pixel: 1 / PixelRatio.get(), // 最小线宽
  screenWidth: width, // 屏幕宽度
  screenHeight: height, // 屏幕高度
  aspectRatio: height / width,
  NavBarHeight: navBarHeight(),
  StatusBarHeight: statusBarHeight(),
  TotalNavHeight: totalNavHeight(),
  isIPhoneX: isIPhoneXs(),
};
