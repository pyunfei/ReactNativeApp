import { StyleSheet } from 'react-native';
import scaleStyle from '@/utils/scaleStyle';

const style = {
  // 功能入口
  entryContainer: {
    width: 710,
    // height: 167,
    backgroundColor: '$White',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    borderRadius: 12,
    paddingVertical: 20,
    paddingTop: 0,
  },
  entryIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 710 / 5 - 1,
    marginTop: 20,
  },
  entryIcon: {
    width: 90,
    height: 90,
  },
  entryText: {
    color: '$BlackL',
    fontSize: 24,
    // fontWeight: '$Medium',
    marginTop: 20,
  },
};

export default StyleSheet.create(scaleStyle(style));
