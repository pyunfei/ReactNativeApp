import { StyleSheet } from 'react-native';
import scaleStyle from '@/utils/scaleStyle';

const style = {
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: '$FontSizeL',
    color: '$BlackS',
    // fontWeight: '$Medium',
  },
  backIcon: {
    fontSize: '$FontSizeL',
    // fontWeight: '$Medium',
  },
};
export default StyleSheet.create(scaleStyle(style));
