import { StyleSheet } from 'react-native';
import scaleStyle from '@/utils/scaleStyle';

const style = {
  list: {
    width: '100%',
    height: 280,
    marginTop: 14,
  },
  itemWrapper: {
    width: 500,
    backgroundColor: 'yellow',
  },
  item: {
    position: 'relative',
    width: 500,
    height: 280,
    marginLeft: 30,
    borderRadius: 20,
    marginRight: 30,
    backgroundColor: '$White',
  },
  banner: {
    width: 500,
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    flex: 1,
    paddingLeft: 21,
    paddingRight: 117,
    height: 80,
    lineHeight: 80,
    marginRight: 9,
    fontSize: '$FontSizeM',
    color: '$BlackS',
    // fontWeight: '$Medium',
  },
  itemNum: {
    position: 'absolute',
    top: 112,
    right: 0,
    paddingLeft: 24,
    paddingRight: 25,
    height: 36,
    backgroundColor: 'rgba(75,75,75,0.6)',
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
    color: '#FFB210FF',
    fontSize: '$FontSizeS',
    // fontWeight: '$Medium',
  },
  appImage: {
    position: 'absolute',
    bottom: 27,
    right: 19,
    width: 89,
    height: 89,
    borderRadius: 6,
  },
};
export default StyleSheet.create(scaleStyle(style));
