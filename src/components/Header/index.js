/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { mergeWith } from 'lodash';
import scalePx from '@/utils/scalePx';
import { themeMap } from '@/utils/scaleStyle';

class Component extends React.Component {
  handleBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { headerObj, headerHide, isBack } = this.props;
    const defaultLeftComponent = {
      type: 'antdesign',
      icon: 'left',
      color: themeMap.$BlackS,
      onPress: this.handleBack,
      activeOpacity: 0.8,
      underlayColor: 'transparent',
      size: 21,
    };
    const defaultRightComponent = {
      activeOpacity: 0.8,
      underlayColor: 'transparent',
      color: themeMap.$BlackS,
      type: 'antdesign',
      size: 21,
    };
    const defaultHeaderObj = {
      statusBarProps: { translucent: true, backgroundColor: 'transparent' },
      centerComponent: { text: 'WeChat', style: { fontSize: scalePx(themeMap.$FontSizeXL) } },
      leftComponent: isBack ? defaultLeftComponent : {},
      rightComponent: defaultRightComponent,
      backgroundColor: 'white',
      barStyle: 'dark-content',
      containerStyle: {
        display: headerHide ? 'none' : undefined,
      },
    };
    const headerConfig = mergeWith(defaultHeaderObj, headerObj, (objValue, srcValue) => {
      if (React.isValidElement(srcValue)) {
        return srcValue;
      }
    });
    return <Header {...headerConfig} />;
  }
}
Component.propTypes = {
  headerObj: PropTypes.object,
  headerHide: PropTypes.bool,
  isBack: PropTypes.bool,
};
Component.defaultProps = {
  headerObj: {},
  headerHide: false,
  isBack: false,
};

export default withNavigation(Component);
