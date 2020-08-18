import { StyleSheet } from 'react-native';
import scaleStyle from '@/utils/scaleStyle';

const style = {
  fullScreen: {
    width: '100%',
    height: 100,
    marginTop: 21,
    flexDirection: 'row',
  },
  toBeCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 115,
    height: '100%',
  },
  portrait: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },

  toBeBetween: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: '$FontSizeM',
    lineHeight: 30,
    color: '$BlackS',
    marginBottom: 10,
    // fontWeight: '$Medium',
  },
  time: {
    fontSize: 22,
    lineHeight: 22,
    color: '$BlackM',
    // fontWeight: '$Medium',
  },
  shareWrapper: {
    width: 120,
    height: 48,
    borderRadius: 24,
    position: 'relative',
    marginRight: 20,
    backgroundColor: 'rgba(254,207,43,0.2)',
  },
  share: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  shareText: {
    fontSize: 22,
    color: '#FFAF0EFF',
    // fontWeight: '$Medium',
  },
  shareIcon: {
    marginRight: 7,
    width: 26,
    height: 27,
  },
};
export default StyleSheet.create(scaleStyle(style));
