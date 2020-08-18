import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, ImageBackground, StatusBar, RefreshControl } from 'react-native';
import { withNavigation, withNavigationFocus } from 'react-navigation';
import styles from './style';
import scalePx from '@/utils/scalePx';
import PageView from '@/components/PageView';
import Header from '@/components/Header';
import PressView from '@/components/PressView';
import ModalAddr from '@/components/ModalAddr';
import Divider from '@/components/Divider';
import GuideItem from './components/GuideItem';
import Card from './components/Card';
import getStatusBarHeight from '@/utils/getStatusBarHeight';
import { connect } from 'react-redux';
import { getUser, clearAuth, getMyStats, getStats } from '@/reducer/userReducer';
import Image from '@/components/Image';
import config from '@/config';
import Icon from 'react-native-vector-icons/AntDesign';
import { themeMap } from '@/utils/scaleStyle';
import LevelTag from '@/components/LevelTag';
import { StateLoad } from '@/components/StatusView';
import Toast from '@/components/Toast';
import { calcPrice } from '@/utils/helper';

const defaultAvatar = require('@/assets/image/defaultAvatar.png');
const locationIcon = require('./assets/locationIcon.png');

const statsData = {
  consumableDeduction: 0,
  deductionAllIncome: 0,
  pollen: 0,
  pollenAllIncome: 0,
  newFansToday: 0,
  directFan: 0,
};

function Index({ navigation, isLogin, getUser, userData, fetching, clearAuth, isFocused }) {
  const [userStats, setUserStats] = useState(statsData);
  const [refreshing, setRefreshing] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('选择位置');

  const {
    // 返现
    consumableDeduction,
    deductionAllIncome,
    // 花粉
    pollen,
    pollenAllIncome,
    // 粉丝
    newFansToday,
    directFan,
  } = userStats || {};

  const userDeductionData = [
    { label: '累计购物金', value: `¥${calcPrice(deductionAllIncome)}` },
    { label: '余额', value: `¥${calcPrice(consumableDeduction)}` },
  ];

  const userPollenData = [
    { label: '累计花粉', value: pollenAllIncome },
    { label: '余额', value: pollen },
  ];
  const userFansData = [
    { label: '今日新增粉丝', value: `${newFansToday}人` },
    { label: '全部粉丝', value: `${directFan}人` },
  ];

  const { level, regionId } = userData || {};
  const showDaoShi = level < 21;

  const handleNavigate = (path, params = {}) => {
    navigation.push(path, params);
  };

  const handleNeedAuthRouter = (path, params) => {
    if (isLogin) {
      handleNavigate(path, params);
    } else {
      handleNavigate('authLogin');
    }
  };

  const getStatsData = () => {
    getStats().then(res => {
      setUserStats(res);
      setRefreshing(false);
    });
  };
  const updateStatsData = () => {
    setRefreshing(true);
    getStatsData();
  };
  const onRefresh = () => {
    isLogin && updateStatsData();
  };
  useEffect(() => {
    if (isLogin) {
      getStatsData();
      if (!userData) {
        try {
          getUser();
        } catch {
          clearAuth();
        }
      }
    }
  }, [isLogin]); // eslint-disable-line

  useEffect(() => {
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionId]);

  const getLocation = () => {
    if (regionId) {
      setCurrentLocation(ModalAddr.getRegionNameById(regionId, ' '));
    } else {
      setCurrentLocation('选择位置');
    }
  };
  const handleLocation = () => {
    if (isLogin) {
      !regionId && handleNavigate('userLocation');
    } else {
      handleNavigate('authLogin');
    }
  };

  const loginUserInfo = () => {
    return (
      <PressView onPress={() => handleNeedAuthRouter('setUserInfo')} style={styles.info_container}>
        {/* avatar */}
        <Image
          style={styles.avatar}
          src={userData.avatarUrl ? { uri: userData.avatarUrl } : defaultAvatar}
        />
        <PressView style={styles.info_bg}>
          {/* name & level */}
          <View style={styles.name_level_bg}>
            <Text style={styles.name} numberOfLines={1}>
              {userData.name}
            </Text>
            <LevelTag level={userData.level} />
          </View>
          <PressView style={styles.info_bottom_bg}>
            <PressView style={styles.info_bottom_left_bg}>
              {showDaoShi && (
                <PressView
                  style={styles.tipsHeaderBtn}
                  onPress={() =>
                    navigation.push('webview', { source: { uri: `${config.H5_PREFIX}/OnLine` } })
                  }
                >
                  <View style={styles.dao_shi_bg}>
                    <Text style={styles.tipsBtnText}>微信专属导师</Text>
                    <Icon
                      name="caretright"
                      size={scalePx(14)}
                      color="#252421"
                      style={{ marginLeft: scalePx(4) }}
                    />
                  </View>
                </PressView>
              )}
              <PressView
                style={[
                  regionId === null ? styles.tipsHeaderBtn : styles.address_container,
                  showDaoShi && regionId && { width: scalePx(250) },
                ]}
                onPress={handleLocation}
              >
                <View style={styles.address_bg}>
                  <Image style={styles.address_image} src={locationIcon} />
                  <Text style={styles.address_text}>{currentLocation}</Text>
                </View>
              </PressView>
            </PressView>
            <PressView
              style={styles.invite_bg}
              onPress={() => handleNeedAuthRouter('inviteFriends')}
            >
              <Text style={styles.invite_text}>邀请好友</Text>
              <Icon
                name="caretright"
                size={scalePx(14)}
                color="#FED32F"
                style={{ marginLeft: scalePx(4) }}
              />
            </PressView>
          </PressView>
        </PressView>
      </PressView>
    );
  };

  const unLoginUserInfo = () => {
    return (
      <PressView
        onPress={() => {
          handleNavigate('authLogin');
        }}
        style={styles.info_container}
      >
        {/* avatar */}
        <Image style={styles.avatar} src={defaultAvatar} />
        <View style={{ marginLeft: scalePx(30) }}>
          {/* name & level */}
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.name}>立即登录</Text>
          </View>
        </View>
      </PressView>
    );
  };

  const headerObj = {
    backgroundColor: 'transparent',
    centerComponent: { text: '个人中心', style: { color: 'black' } },
    containerStyle: {
      borderBottomWidth: 0,
    },
  };

  let statusObj = false;
  if (fetching) {
    statusObj = {
      status: StateLoad,
    };
  }

  return (
    <PageView headerHide statusObj={statusObj}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <ImageBackground
          source={require('./assets/bg.png')}
          style={{
            height: scalePx(250) + getStatusBarHeight(),
            justifyContent: 'space-between',
            marginTop: scalePx(-1),
          }}
          imageStyle={{ resizeMode: 'stretch' }}
        >
          <Header headerObj={headerObj} />
          {isLogin ? loginUserInfo() : unLoginUserInfo()}
        </ImageBackground>
        {/* guideInfo */}
        <View>
          <Divider height={20} />
          <Card
            id="deduction"
            title="我的购物金"
            values={userDeductionData}
            route="userDeduction"
          />
          <Divider height={20} />
          <Card id="pollen" title="我的花粉" values={userPollenData} route="userPollen" />
          <Divider height={20} />
          <Card id="fans" title="我的粉丝" values={userFansData} route="userFans" />
        </View>
        {/* <View style={styles.guideInfo}>
          {false && (
            <GuideItem
              scale={60}
              onPress={() => handleNeedAuthRouter('userHoney')}
              source={require('./assets/honey.png')}
              content="蜜桃"
              amount={showAuthNeedNumber(userData.honey / 100)}
            />
          )}

          <GuideItem
            scale={60}
            onPress={() => handleNeedAuthRouter('userWallet')}
            source={require('./assets/wallet.png')}
            content="收益"
            amount={showAuthNeedNumber(money / 100)}
          />
          <GuideItem
            scale={60}
            onPress={() => handleNeedAuthRouter('userDeduction')}
            source={require('./assets/deduction.png')}
            content="购物金"
            amount={showAuthNeedNumber(consumableDeduction / 100)}
          />
          <GuideItem
            scale={60}
            onPress={() => handleNeedAuthRouter('userPollen', { setUserStats: setUserStats })}
            source={require('./assets/pollen.png')}
            content="花粉"
            amount={showAuthNeedNumber(pollen)}
          />
          <GuideItem
            scale={60}
            source={require('./assets/fans.png')}
            onPress={() => handleNeedAuthRouter('userFans')}
            content="粉丝"
            amount={showAuthNeedNumber(directFan)}
          />
        </View> */}
        <View style={styles.orderInfo}>
          <View style={styles.orderHeader}>
            <Text style={{ fontSize: scalePx(themeMap.$FontSizeM), color: themeMap.$BlackS }}>
              我的订单
            </Text>
            <PressView
              onPress={() => handleNeedAuthRouter('userOrder')}
              style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}
            >
              <Text style={{ fontSize: scalePx(themeMap.$FontSizeS), color: themeMap.$BlackL }}>
                查看全部订单
              </Text>
              <Icon
                name="right"
                size={scalePx(themeMap.$FontSizeS)}
                color={themeMap.$BlackL}
                style={{ marginLeft: scalePx(4) }}
              />
            </PressView>
          </View>
          <View style={styles.orderPanel}>
            <GuideItem
              scale={60}
              onPress={() => handleNeedAuthRouter('userOrder', { initialPage: 1 })}
              source={require('./assets/payment.png')}
              content="待付款"
            />
            <GuideItem
              scale={60}
              onPress={() => handleNeedAuthRouter('userOrder', { initialPage: 2 })}
              source={require('./assets/delivered.png')}
              content="待发货"
            />
            <GuideItem
              scale={60}
              onPress={() => handleNeedAuthRouter('userOrder', { initialPage: 3 })}
              source={require('./assets/receipt.png')}
              content="待收货"
            />
            <GuideItem
              scale={60}
              onPress={() => handleNeedAuthRouter('userOrder', { initialPage: 4 })}
              source={require('./assets/reward.png')}
              content="已完成"
            />
          </View>
        </View>
        <View style={styles.guideInfo}>
          <GuideItem
            scale={68}
            onPress={() => handleNeedAuthRouter('inviteFriends')}
            source={require('./assets/exchange.png')}
            content="邀请好友"
          />
          <GuideItem
            scale={68}
            onPress={() => handleNeedAuthRouter('userFavorite')}
            source={require('./assets/collection.png')}
            content="商品收藏"
          />
          <GuideItem
            scale={68}
            onPress={() => handleNeedAuthRouter('selfProductAddress')}
            source={require('./assets/address.png')}
            content="地址管理"
          />
          <GuideItem
            scale={68}
            onPress={() => {
              handleNavigate('customerService');
            }}
            source={require('./assets/service.png')}
            content="客服帮助"
          />
        </View>
      </ScrollView>
    </PageView>
  );
}

const mapStateToProps = state => {
  return {
    isLogin: state.userReducer.isLogin,
    userData: state.userReducer.userData,
    fetching: state.userReducer.fetching,
  };
};

const mapDispatchToProps = {
  getUser,
  clearAuth,
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigationFocus(Index));
