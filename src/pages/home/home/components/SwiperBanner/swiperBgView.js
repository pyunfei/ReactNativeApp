import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Image } from 'react-native';
import px from '@/utils/scalePx';
import { withNavigation } from 'react-navigation';
import styles, { otherStyle } from './style';

const yuanjiao = require('../../../../../pages/home/assets/yuanjiao.png');
class SwiperBgView extends React.PureComponent {
  render() {
    const { color } = this.props;
    return (
      <View style={styles.bgcontainer}>
        <Image
          style={[styles.backImage, { tintColor: color }]}
          source={yuanjiao}
        />
        <Image
          style={[
            styles.backImageShadow,
            { tintColor: color, opacity: 0.3 },
          ]}
          source={yuanjiao}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    color: state.demoReducer.color,
  };
};

const mapDispatchToProps = {};

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(React.memo(SwiperBgView))
);
