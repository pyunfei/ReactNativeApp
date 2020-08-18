import { Dimensions } from 'react-native';
import { designWidth } from '@/config';
// import _ from 'lodash';

const deviceWidth = Dimensions.get('window').width;
const scalePx = size => {
  if (size && size > 1) {
    return (deviceWidth / designWidth) * size;
  } else {
    return size;
  }
};
export default scalePx;
