import scalePx from './scalePx';
import _ from 'lodash';

// app主题值
export const themeMap = {
  $FontSize: 18,
  $Brand: '#52a8ff',
  $Error: '#ff5536',
  $Black: '#3f4b59',

  // 字体
  $FontSizeS: 24,
  $FontSizeM: 28,
  $FontSizeL: 32,
  $FontSizeXL: 34,

  // 主题颜色
  $Primary: '#FED32F',
  $Secondary: '#FFAE0D',
  $Red: '#FE0032',
  $Green: '#5FB36E',
  $Orange: '#FE4400',
  $Yellow: '#FFC65D',

  // 黑色
  $BlackS: '#141115',
  $BlackM: '#666666',
  $BlackL: '#999999',
  $BlackXL: '#D6D6D6',
  $PageBg: '#F5F5F5',
  $Divider: '#eeeeee',
  $White: '#ffffff',

  // 字体粗细
  $Medium: '500',
  $Heavy: '800',
};

// 转换忽略属性
const scaleIgnore = ['flex', 'opacity'];

// 递归缩放样式中的数字类型
const transObj = obj =>
  _.mapValues(obj, (value, key) => {
    if (scaleIgnore.includes(key)) {
      return value;
    }
    if (_.has(themeMap, value)) {
      value = _.get(themeMap, value);
    }
    if (_.isNumber(value) && value > 1) {
      return scalePx(value);
    } else if (_.isPlainObject(value)) {
      return transObj(value);
    } else {
      return value;
    }
  });
const scaleStyle = obj => _.mapValues(obj, (value, key) => transObj(value));

export default scaleStyle;
