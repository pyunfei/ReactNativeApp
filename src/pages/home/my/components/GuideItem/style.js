import { StyleSheet } from 'react-native';
import scaleStyle from '@/utils/scaleStyle';

const style = {
  icon: {
    width: 60,
    height: 60,
  },
  content: {
    fontSize: 24,
    color: '$BlackS',
    fontWeight: '$Medium',
    marginTop: 9,
  },
  number: {
    color: '$Primary',
    fontSize: '$FontSizeS',
    fontWeight: '$Medium',
  },
  item: {
    // width: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default StyleSheet.create(scaleStyle(style));
