import React from 'react';
import { View, Text, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import PressView from '@/components/PressView';
import styles from './style';
import config from '@/config';
import { connect } from 'react-redux';

const lingyuan = require('./assets/lingyuan.png');
const jiukuai = require('./assets/jiukuai.png');
const haoyou = require('./assets/haoyou.png');
const dapaihaitao = require('./assets/dapaihaitao.png');
const kefu = require('./assets/kefu.png');
const gaoyongIcon = require('./assets/gaoyongIcon.png');

function Index({ navigation, userData, isLogin, cuxiao, haitao, gaoyong }) {
  const { isOldUser } = userData || {};
  const entryIconList = [
    {
      icon: isOldUser ? gaoyongIcon : lingyuan,
      text: isOldUser ? '高佣专区' : '0元购',
      gatherId: isOldUser ? gaoyong : '',
      path: isOldUser ? 'productList' : 'webview',
    },
    {
      icon: jiukuai,
      text: '9.9专区',
      gatherId: cuxiao,
      path: 'productList',
    },
    {
      icon: haoyou,
      text: '邀请好友',
      path: 'inviteFriends',
    },
    {
      icon: dapaihaitao,
      text: '大牌海淘',
      gatherId: haitao,
      path: 'productList',
    },
    {
      icon: kefu,
      text: '客服',
      path: 'customerService',
    },
  ];

  const navigateTo = (gatherId, hdkCid, path, text) => {
    if (path === 'productList') {
      navigation.push(path, { gatherId });
    } else if (path === 'webview') {
      navigation.push(path, { source: { uri: `${config.H5_PREFIX}/lingYuanGou` } });
    } else if (path === 'customerService') {
      navigation.push(path);
    } else if (path === 'inviteFriends') {
      if (!isLogin) {
        navigation.push('authLogin');
      } else {
        navigation.push(path);
      }
    }
  };
  return (
    <View style={styles.entryContainer}>
      {entryIconList.map(({ icon, text, gatherId, hdkCid, path }, i) => (
        <PressView
          key={i}
          onPress={() => navigateTo(gatherId, hdkCid, path, text)}
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
    userData: state.userReducer.userData,
    isLogin: state.userReducer.isLogin,
  };
};

const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(Index));
