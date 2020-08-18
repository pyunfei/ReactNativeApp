import { StyleSheet } from 'react-native';
import ScaleStyle, { themeMap } from '@/utils/scaleStyle';

const Styles = StyleSheet.create(
  ScaleStyle({
    container: {
      backgroundColor: '$White',
      width: '100%',
      height: 80,
    },
    titleViewContainer: {
      width: '100%',
      height: 78,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleView: {
      flexDirection: 'row',
    },
    titleViewText: {
      fontSize: 35,
      color: '$BlackS',
      textAlign: 'left',
    },
    titleViewBg: {
      marginLeft: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width: 108,
      height: 40,
    },
    titleViewHit: {
      fontSize: 20,
      color: '$White',
      textAlign: 'center',
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerItemStyle: {
      width: 110,
      height: 60,
      borderRadius: 29,
      alignItems: 'center',
      // justifyContent: 'space-between',
    },
    headerTitleStyle: {
      fontSize: themeMap.$FontSizeM,
      color: '$BlackS',
      textAlign: 'center',
      marginTop: 5,
      // fontWeight: '$Medium',
    },
    sectionHeaderView: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
      backgroundColor: '$PageBg',
    },
    titleViewWrapper: {
      flex: 1,
      marginTop: 25,
    },
  })
);

export const itemStyle = StyleSheet.create(ScaleStyle({
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 14,
  },
  containerView: {
    alignItems: 'center',
  },
  selectStyle: {
    color: themeMap.$Secondary,
    fontSize: 36,
    fontWeight: themeMap.$Medium,
    marginTop: 0,
  },
  yuanStyle: {
    width: 46,
    height: 16,
    marginTop: 4,
  },
}));

export default Styles;
