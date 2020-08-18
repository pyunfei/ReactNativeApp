import { StyleSheet } from 'react-native';
import scaleStyle, { themeMap } from '@/utils/scaleStyle';

const style = {
  discountImg: {
    width: 750,
    height: 165,
    // marginTop: 6,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    width: 710,
    height: 68,
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  hederPress: {
    backgroundColor: themeMap.$White,
    width: 710,
    height: 68,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12 * 2,
    borderRadius: 34,
    marginRight: 0,
  },
  textStyle: {
    fontSize: 28,
    color: '#C3C3C3',
    marginLeft: 9,
  },
  headerLeft: {
    marginLeft: 5,
    width: 36,
    height: 47,
  },
  headerRight: {
    width: 40,
    height: 40,
    marginRight: 14,
  },
  searchIcon: {
    width: 28,
    height: 28,
  },
  refreshText: {
    width: '100%',
    height: 30,
    textAlign: 'center',
    lineHeight: 30,
    fontSize: '$FontSizeM',
    color: '$BlackM',
    backgroundColor: '$PageBg',
    marginTop: 5,
  },
  lygImage: {
    width: 644,
    height: 694,
  },
  location_image: {
    width: 540,
    height: 560,
  },
};

export default StyleSheet.create(scaleStyle(style));
