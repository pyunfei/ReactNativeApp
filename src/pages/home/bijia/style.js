import { StyleSheet } from 'react-native';
import scaleStyle from '@/utils/scaleStyle';

const style = {
  pageBg: {
    backgroundColor: '$White',
  },
  bijiaSearchContainer: {
    width: 710,
    height: 68,
    backgroundColor: '#f6f6f6',
    borderRadius: 36,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    tintColor: '#FFBE00',
    width: 32,
    height: 32,
    marginLeft: 18,
  },
  searchText: {
    fontSize: '$FontSizeM',
    color: '#9A9A9A',
    marginLeft: 7,
    lineHeight: 48,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  leftWrapper: {
    width: 180,
    backgroundColor: '#F6F6F6',
  },
  rightWrapper: {
    flex: 1,
    paddingLeft: 21,
  },
  productContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  catItemContainer: {
    flexDirection: 'row',
    width: 180,
    minHeight: 90,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  catItemActiveContainer: {
    backgroundColor: '$White',
  },
  catItemText: {
    color: '#1D1A17',
    fontSize: '$FontSizeS',
  },
  catItemActiveText: {
    color: '$Secondary',
  },
  title: {
    color: '#1D1A17',
    fontSize: '$FontSizeS',
    fontWeight: 'bold',
  },
  productItemContainer: {
    width: 130,
    alignItems: 'center',
  },
  productImage: {
    width: 130,
    height: 130,
  },
  productTitle: {
    color: '#1D1A17',
    fontSize: 20,
    // fontWeight: 'bold',
    width: 130,
    textAlign: 'center',
  },
  bannerContainer: {
    height: 240,
  },
  bannerImage: {
    width: 530,
    height: 240,
    borderRadius: 8,
  },
};
export default StyleSheet.create(scaleStyle(style));
