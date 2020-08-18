import Loading from '@/components/Loading';
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

const LoadView = ({ swiperLoadStatus }) => {
  return (
    <>
      <Loading
        size={'small'}
        // color={'#000'}
        style={{ marginTop: 5 }}
        animating={swiperLoadStatus}
      />
    </>
  );
};

const mapStateToProps = state => {
  return {
    swiperLoadStatus: _.get(state, 'productReducer.swiperLoadStatus', false),
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadView);
