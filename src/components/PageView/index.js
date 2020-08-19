/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Header from '@/components/Header';
import StatusView from '@/components/StatusView';

import styles from './style.scss';

class Component extends React.Component {
  render() {
    const { style, statusObj, isWhite, ...restProps } = this.props;
    let view = null;
    if (statusObj) {
      view = <StatusView {...statusObj} />;
    } else {
      view = this.props.children;
    }
    return (
      <View style={style} className={[styles.content, styles.appbg, isWhite && styles.whitebg]}>
        <Header {...restProps} />
        {view}
      </View>
    );
  }
}
Component.propTypes = {
  statusObj: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  headerObj: PropTypes.object,
  headerHide: PropTypes.bool,
  isWhite: PropTypes.bool,
  isBack: PropTypes.bool,
};
Component.defaultProps = {
  headerObj: {},
  headerHide: false,
  isWhite: false,
  isBack: true,
};

export default Component;
