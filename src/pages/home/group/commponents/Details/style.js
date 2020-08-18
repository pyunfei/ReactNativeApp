import { StyleSheet } from 'react-native';
import scaleStyle from '@/utils/scaleStyle';

const style = {
  fullScreen: {
    width: '100%',
    paddingLeft: 115,
  },
  writing: {
    marginTop: 7,
    marginBottom: 19,
    fontSize: '$FontSizeM',
    color: 'rgba(12,12,12,1)',
    lineHeight: 40,
    // fontWeight: '$Medium',
  },
  pictureList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  pictureListToCenter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
    marginRight: 130,
  },
  picture: {
    width: 180,
    height: 180,
    marginRight: 12,
    marginBottom: 13,
    borderRadius: 4,
  },
  discounts: {
    width: 612,
    height: 160,
    backgroundColor: 'rgba(245,245,245,1)',
    borderRadius: 10,
    marginBottom: 21,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toBeCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 160,
    height: '100%',
  },
  discountsPictureWrapper: {
    width: 120,
    height: 120,
    backgroundColor: 'rgba(255,255,255,1)',
    borderWidth: 1,
    borderColor: 'rgba(232,232,232,1)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  discountsPicture: { width: 106, height: 106 },
  discountsName: {
    fontSize: '$FontSizeS',
    color: '$BlackS',
    marginBottom: 10,
    width: 310,
    // fontWeight: '$Medium',
  },
  returnMoney: {
    margin: 0,
    padding: 0,
    flexDirection: 'row',
    height: 32,
    paddingLeft: 10,
    paddingRight: 8,
    backgroundColor: 'rgba(255,248,222,1)',
    borderRadius: 6,
    color: '#783300FF',
    fontSize: 22,
    // fontWeight: '$Medium',
  },
  toBeBetween: {
    marginTop: 20,
    flex: 1,
    height: 44,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toLevel: {
    flexDirection: 'row',
  },
  symbol: {
    color: '$Red',
    fontSize: '$FontSizeS',
    fontWeight: '$Medium',
  },
  reduceNum: {
    color: '$Red',
    fontSize: 36,
    fontWeight: '$Medium',
  },
  original: {
    fontSize: '$FontSizeS',
    color: '$BlackL',
    textDecorationLine: 'line-through',
    // fontWeight: '$Medium',
  },
  pollenText: {
    lineHeight: 32,
    borderRadius: 6,
    backgroundColor: '#FFF8DEFF',
    paddingLeft: 48,
    paddingRight: 13,
    color: '#FF9900FF',
    fontSize: 22,
  },
  pollenIcon: {
    width: 29,
    height: 32,
    position: 'absolute',
    left: 10,
  },
  buyButtonWrapper: {
    height: 120,
    flexDirection: 'column-reverse',
    marginBottom: 10,
  },
  buyButton: {
    height: 44,
    borderRadius: 22,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyText: {
    fontSize: 22,
    color: '$White',
    // fontWeight: '$Medium',
    paddingLeft: 20,
    paddingRight: 20,
  },

  shareIcon: {
    marginLeft: 20,
    marginRight: 8,
    width: 28,
    height: 28,
  },
  shareText: {
    color: '$White',
    fontSize: 22,
    lineHeight: 44,
    height: 44,
  },
  shareButton: {
    flexDirection: 'row',
    marginRight: 20,
    borderRadius: 22,
    height: 44,
    backgroundColor: '#292935FF',

  },
  /*
   * 底部淘宝口令信息
   * */
  footer: {
    padding: 21,
    marginRight: 24,
    backgroundColor: 'rgba(245,245,245,1)',
    borderRadius: 10,
  },
  commandName: {
    fontSize: '$FontSizeS',
    color: '$BlackS',
    lineHeight: 36,
    // fontWeight: '$Medium',
  },
  commandText: {
    color: '$BlackL',
    fontSize: '$FontSizeS',
    lineHeight: 36,
    // fontWeight: '$Medium',
  },
  toBeRight: {
    width: '100%',
    flexDirection: 'row-reverse',
  },
  buttonWrapper: {
    width: 160,
    height: 48,
    marginBottom: 19,
    marginRight: 17,
  },
  copyButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFF5D5FF',
    borderRadius: 24,
  },
  copyIcon: {
    width: 28,
    height: 28,
    marginRight: 5,
  },
  copyText: {
    fontSize: '$FontSizeS',
    color: 'rgba(255,175,14,1)',
    // fontWeight: '$Medium',
  },
  itemPrice: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    position: 'absolute',
    bottom: 12,
    right: 12,
    lineHeight: 30,
    height: 30,
    backgroundColor: '$Secondary',
    fontSize: '$FontSizeS',
    paddingLeft: 12,
    // fontWeight: '$Medium',
    color: '$White',
    paddingRight: 8,
    zIndex: 555,
  },
  toBeLeVel: {
    flexDirection: 'row',
  },
};
/*
export default style;
*/
export default StyleSheet.create(scaleStyle(style));
