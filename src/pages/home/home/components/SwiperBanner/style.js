import { StyleSheet, Platform } from 'react-native';
import scaleStyle from '@/utils/scaleStyle';
import Layout from '@/utils/layout';
import getStatusBarHeight from '@/utils/getStatusBarHeight';
import px from '@/utils/scalePx';
import { themeMap } from '../../../../../utils/scaleStyle';

const width = 750;
const height = width * (398 / 750);

let top = 0;
if (Platform.OS === 'ios') {
  if (Layout.isIPhoneX) {
    top = height - Layout.TotalNavHeight * 2 - 370 / 2 - 10;
  } else {
    top = height - Layout.TotalNavHeight * 2 - 370 / 2 - 35;
  }
} else {
  top = height - Layout.TotalNavHeight * 2 - 370 / 2 - 20;
}
const style = {
  // swiper
  bannerContainer: {
    height: 350,
    backgroundColor: 'transparent',
    borderRadius: 20,
    overflow: 'hidden',
  },
  activeDotStyle: {
    backgroundColor: '$Primary',
    width: 10,
    height: 10,
    marginRight: 9,
  },
  dotStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    width: 10,
    height: 10,
    marginRight: 9,
  },
  swiperImgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  swiperImg: {
    width: 710,
    height: 350,
    borderRadius: 20,
  },
  bgcontainer: {
    position: 'absolute',
    width: '100%',
    height: 400 + getStatusBarHeight(),
    backgroundColor: themeMap.$White,
    top: 0,
  },
  backImage: {
    position: 'absolute',
    top: -top,
    width: width,
    height: height, // 保持圆弧不变形
  },
  backImageShadow: {
    position: 'absolute',
    top: -top + 20,
    width: width,
    height: height, // 保持圆弧不变形
  },
  swiperIndex: {
    width: 70,
    height: 34,
    position: 'absolute',
    left: 48,
    bottom: 17,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  swiperIndex_text: {
    fontSize: 18,
    color: themeMap.$White,
  },
};

export const otherStyle = StyleSheet.create({
  swiperBg: {
    position: 'absolute',
    top: -1000,
    left: -(1000 - Layout.screenWidth) / 2,
    width: 1000,
    height: 1150 + getStatusBarHeight(),
    borderRadius: 900,
  },
  bgcontainer: {
    position: 'absolute',
    width: '100%',
    height: 400 + getStatusBarHeight(),
    backgroundColor: themeMap.$White,
    top: 0,
  },
  swiperIndex: {
    width: 70,
    height: 34,
    position: 'absolute',
    left: 48,
    bottom: 17,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  swiperIndex_text: {
    fontSize: 18,
    color: themeMap.$White,
  },
});

export default StyleSheet.create(scaleStyle(style));
