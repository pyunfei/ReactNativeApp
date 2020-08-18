import { StyleSheet } from 'react-native';
import scaleStyle from '@/utils/scaleStyle';

const style = {
  fullScreen: {
    width: '100%',
  },
  header: {
    marginTop: 12,
    paddingLeft: 25,
    fontSize: '$FontSizeL',
    lineHeight: 92,
    color: '$BlackS',
    fontWeight: '$Medium',
  },
  labelList: {
    flex: 1,
    height: 58,
    flexDirection: 'row',
  },
  labelBanner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 29,
    height: 58,
  },
  cut_bg: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 29,
    height: 58,
  },
  cut: {
    fontSize: '$FontSizeM',
    color: '$White',
    paddingLeft: 22,
    paddingRight: 24,
    lineHeight: 58,
  },
  toBeLeVel: {
    height: 48,
    alignItems: 'center',
    flexDirection: 'row',
  },
  list: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 31,
  },
  toBeCenter: {
    alignItems: 'center',
    marginBottom: 26,
  },
  item: {
    width: 702,
    marginLeft: 24,
    marginRight: 24,
  },
  itemLeft: {
    marginLeft: 24,
    marginRight: 12,
  },
  itemRight: {
    marginLeft: 12,
    marginRight: 12,
  },
  imageBanner: {
    width: 702,
    height: 234,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  footer: {
    flex: 1,
    backgroundColor: '$White',
    paddingLeft: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  verticalCenter: {
    flex: 1,
    height: 92,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  portrait: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  name: {
    fontSize: '$FontSizeS',
    color: '$BlackL',
    // fontWeight: '$Medium',
  },
  icon: {
    width: 30,
    height: 17,
    marginRight: 6,
  },
  numerical: {
    color: '$BlackXL',
    fontSize: '$FontSizeS',
    marginRight: 19,
    // fontWeight: '$Medium',
  },
  writing: {
    marginTop: 22,
    lineHeight: 32,
    marginRight: 21,
    color: '$BlackS',
    fontSize: '$FontSizeS',
    // fontWeight: '$Medium',
  },
  article: {
    marginTop: 22,
    lineHeight: 26,
    marginRight: 21,
    color: '$BlackL',
    fontSize: 22,
    // fontWeight: '$Medium',
  },
};
export default StyleSheet.create(scaleStyle(style));
