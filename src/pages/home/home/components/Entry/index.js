import React from 'react';
import { View, Text, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import PressView from '@/components/PressView';
import styles from './style';
import config from '@/config';
import { connect } from 'react-redux';
import Toast from '@/components/Toast';

const baihuo = require('./assets/baihuo.png');
const haitao = require('./assets/haitao.png');
const jiadian = require('./assets/jiadian.png');
const muyin = require('./assets/muyin.png');
const peishi = require('./assets/peishi.png');
const shiping = require('./assets/shiping.png');
const shuma = require('./assets/shuma.png');
const xihu = require('./assets/xihu.png');
const yundong = require('./assets/yundong.png');
const meizhuang = require('./assets/meizhuang.png');

// 0全部，1女装，2男装，3内衣，4美妆，5配饰，6鞋品，7箱包，8儿童，9母婴，10居家，11美食，12数码，13家电，14其他，15车品，16文体，17宠物

const entryIconList = [
  {
    icon: baihuo,
    text: '日用',
    gatherId: 18,
    hdkCid: 10,
  },
  {
    icon: meizhuang,
    text: '美妆',
    gatherId: 16,
    hdkCid: 4,
  },
  {
    icon: xihu,
    text: '洗护',
    gatherId: 19,
    hdkCid: 14,
  },
  {
    icon: shiping,
    text: '食品',
    gatherId: 15,
    hdkCid: 11,
  },
  {
    icon: muyin,
    text: '母婴',
    gatherId: 17,
    hdkCid: 9,
  },
  {
    icon: jiadian,
    text: '家电',
    gatherId: 20,
    hdkCid: 13,
  },
  {
    icon: yundong,
    text: '文体',
    gatherId: 24,
    hdkCid: 16,
  },
  {
    icon: haitao,
    text: '海淘',
    gatherId: 22,
    // hdkCid: 0,
  },
  {
    icon: shuma,
    text: '数码',
    gatherId: 26,
    hdkCid: 12,
  },
  {
    icon: peishi,
    text: '配饰',
    gatherId: 27,
    hdkCid: 5,
  },
];

function Index({ navigation, isLogin, sysconfigs }) {
  const navigateTo = (gatherId, hdkCid) => {
    navigation.push('productList', { gatherId, hdkCid });
  };
  return (
    <View style={styles.entryContainer}>
      {entryIconList.map(({ icon, text, gatherId, hdkCid }, i) => (
        <PressView
          key={i}
          onPress={() => navigateTo(gatherId, hdkCid)}
          style={styles.entryIconContainer}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={typeof icon === 'string' ? { uri: icon } : icon}
              style={styles.entryIcon}
            />
            <Text style={styles.entryText}>{text}</Text>
          </View>
        </PressView>
      ))}
    </View>
  );
}

const mapStateToProps = state => {
  return {
    isLogin: state.userReducer.isLogin,
    sysconfigs: state.userReducer.sysconfigs,
  };
};

const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(Index));
