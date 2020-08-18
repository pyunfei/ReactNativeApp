import { StyleSheet } from 'react-native';
import scaleStyle from '@/utils/scaleStyle';

const style = {
  fullScreen: {
    width: '100%',
  },
  title: {
    flex: 1,
    paddingLeft: 25,
    marginTop: 12,
    fontSize: '$FontSizeL',
    fontWeight: '$Medium',
    color: '$BlackS',
    lineHeight: 99,
  },
  toBeCenter: {
    flexDirection: 'row',
  },
  item: {
    width: 339,
    backgroundColor: '$White',
    borderRadius: 20,
  },
  itemLeft: {
    marginLeft: 24,
    marginRight: 12,
  },
  itemRight: {
    marginLeft: 12,
    marginRight: 12,
  },
  backgroundImage: {
    width: 339,
    height: 121,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: 339,
    height: 69,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'flex-end',
  },
  writing: {
    paddingLeft: 10,
    fontSize: '$FontSizeS',
    color: '$White',
    lineHeight: 42,
    // fontWeight: '$Medium',
  },
  icon: {
    width: 40,
    height: 40,
  },
  footer: {
    flex: 1,
    paddingLeft: 13,
    paddingRight: 15,
    height: 69,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toBeBetween: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  portrait: {
    width: 48,
    height: 48,
    marginRight: 16,
    borderRadius: 24,
  },
  name: {
    lineHeight: 48,
    fontSize: '$FontSizeS',
    // fontWeight: '$Medium',
    color: '$BlackS',
  },
};
export default StyleSheet.create(scaleStyle(style));
