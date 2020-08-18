// 框架引入区
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Animated, StatusBar, SectionList, ScrollView } from 'react-native';
// 第三方组件引入区域
import Gradient from 'react-native-linear-gradient';
// 第三方js引入区
import lodash from 'lodash';
import { useSelector } from 'react-redux';
// 项目组件引入区
import PageView from '@/components/PageView';
import PressView from '@/components/PressView';
import Image from '@/components/Image';
import Header from '@/components/Header';
import Divider from '@/components/Divider';
import FlatList from '@/components/FlatList';
import ProductListItem from '@/components/ProductListHdk';
import ModalCurtain from '@/components/ModalCurtain';
import BlockFunctional from './components/BlockFunctional';
import ListItem from './components/ListItem';
import ContentScrollView from './components/ContentScrollView';
import { StateLoad } from '@/components/StatusView';
import LatestOrder from './components/LatestOrder';

// 项目js引入区
import { getBanner, getItemsGather, getRecentlyPurchaser } from '@/reducer/productReducer';
import px from '@/utils/scalePx';
import useRequest from '@/hooks/useRequest';
import useInfinityList from '@/hooks/useInfinityList';
import { themeMap } from '@/utils/scaleStyle';
import { H5_PREFIX, ENV } from '@/config';
// 页面组件引入区
import SwiperBanner from './components/SwiperBanner';
import Entry from './components/Entry';
import EntryNew from './components/EntryNew';
import Cuxiao from './components/cuxiao';
import Haitao from './components/haitao';
import LingYuanGou from './components/lingYuanGou';
import CustomSwiper from './components/CustomSwiper';

// 页面js引入区
import images from './components/Nav/assets';
import styles from './style';
const imgSlogan = require('./assets/slogan.png');
const lygCurtain = require('./assets/lygCurtain.png');
const locationCurtain = require('./assets/goLocation.png');

// 项目变量区
import { BIJIA_SEARCH_PLACEHOLDER } from '@/constant';

// 页面变量区
const hotKey = ['护手霜', '洗发水', '牙膏', '沐浴露'];
const pageColor = '#FFBD00';
const pageColorEnd = themeMap.$PageBg;
class CenterView extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.headerCenter}>
        <PressView onPress={() => navigation.push('bijiaSearch')} style={styles.hederPress}>
          <Image src={images.search_icon} style={[styles.searchIcon, { tintColor: pageColor }]} />
          <Text style={styles.textStyle}>{BIJIA_SEARCH_PLACEHOLDER}</Text>
        </PressView>
      </View>
    );
  }
}
function Index({ navigation }) {
  const { sysconfigs, isLogin, userData } = useSelector(state => state.userReducer);
  const { isOldUser, regionId } = userData || {};
  const [callBanner, bannerList] = useRequest(getBanner);
  const [callCuxiao, cuxiaoList] = useRequest(getItemsGather);
  const [callHaitao, haitaoList] = useRequest(getItemsGather);
  const [callLyg, lygList] = useRequest(getItemsGather);
  const [callBaopin, baopinList] = useRequest(getItemsGather);
  const [callRecentlyPurchaser, purchaserList] = useRequest(getRecentlyPurchaser);
  const [forceUpdate, setUpdate] = useState(0);
  const [showLygModel, setShowLygModel] = useState(false);
  const [showLygItem, setShowLygItem] = useState(false);
  const [showLocationModel, setShowLocationModel] = useState(false);

  const { homePage, gather } = sysconfigs;
  const { cuxiao, haitao } = homePage || {};
  const { xcxHome, lyg } = gather || {};
  const baopin = ENV === 'development' ? xcxHome : 35;
  const gaoyong = ENV === 'development' ? xcxHome : 36;

  const getBestList = params => {
    const query = lodash.merge({}, params.query, {
      gatherId: xcxHome,
      needFile: 'allStock,avatars',
    });
    return getItemsGather({ query });
  };
  const [onRefresh, onEndReached, array, isEnd] = useInfinityList(getBestList);

  useEffect(() => {
    if (regionId === null) {
      setShowLocationModel(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionId]);

  useEffect(() => {
    if (isOldUser === 0) {
      setShowLygModel(true);
    } else {
      setShowLygModel(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOldUser]);

  useEffect(() => {
    if (!isLogin || isOldUser === 0) {
      setShowLygItem(true);
    } else {
      setShowLygItem(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOldUser]);

  useEffect(() => {
    const defaultFilter = { pageSize: 10, pageNo: 1 };
    // if (cuxiao) {
    //   callCuxiao({ query: { ...defaultFilter, gatherId: cuxiao } });
    // }
    // if (haitao) {
    //   callHaitao({ query: { ...defaultFilter, gatherId: haitao } });
    // }
    // if (lyg) {
    //   callLyg({ query: { ...defaultFilter, gatherId: lyg } });
    // }
    if (baopin) {
      callBaopin({ query: { ...defaultFilter, gatherId: baopin, needFile: 'allStock,avatars' } });
    }
    callRecentlyPurchaser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceUpdate]);

  const navigationAction = (routName, data = {}) => {
    navigation.push(routName, data);
  };

  // 判断先有没有登录,没登录则去登录,有登陆则去跳转相应的路由
  const isLoginAction = (routeName, data = {}) => {
    if (!isLogin) {
      navigationAction('authLogin');
    } else {
      navigationAction(routeName, data);
    }
  };

  const handleRefresh = () => {
    setUpdate(x => x + 1);
    onRefresh();
  };

  const handleScrollEnd = () => {
    onEndReached();
  };

  const headerLeft = () => {
    return (
      <PressView onPress={() => isLoginAction('inviteFriends')}>
        <Image style={styles.headerLeft} src={images.yaoqing_icon} />
      </PressView>
    );
  };

  const headerRight = () => {
    return (
      <PressView
        onPress={() => {
          isLoginAction('customerService');
        }}
      >
        <Image style={styles.headerRight} src={images.msg_icon} />
      </PressView>
    );
  };
  const renderHeader = () => {
    const headerObj = {
      backgroundColor: pageColor,
      // leftComponent: headerLeft(),
      centerComponent: <CenterView navigation={navigation} />,
      // rightComponent: headerRight(),
      containerStyle: {
        borderBottomWidth: 0,
      },
      // placement: 'left',
    };
    return <Header headerObj={headerObj} />;
  };
  const renderHotSearch = () => {
    const style = {
      width: px(710),
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: px(themeMap.$FontSizeS),
    };
    const tagStyle = {
      textAlign: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      width: px(149),
      lineHeight: px(40),
      borderRadius: px(20),
      fontSize: px(themeMap.$FontSizeS),
      overflow: 'hidden',
    };
    return (
      <View style={style}>
        <Text>热搜：</Text>
        {hotKey.map((item, index) => {
          return (
            <Text
              key={index}
              style={tagStyle}
              onPress={() => {
                navigationAction('shopDelicate', {
                  search: item,
                });
              }}
            >
              {item}
            </Text>
          );
        })}
      </View>
    );
  };

  const renderFunctional = () => {
    return <BlockFunctional />;
  };

  const renderBanner = () => {
    if (lodash.isEmpty(bannerList)) {
      return null;
    }
    return <SwiperBanner data={bannerList} />;
  };
  const renderCustomSwiper = () => {
    const listSource = baopinList;
    if (!listSource || listSource.length < 3) {
      return null;
    }
    const source = lodash.take(listSource, 3);
    return (
      <View style={{ zIndex: 100 }}>
        <CustomSwiper
          source={source}
          itemWidth={540}
          itemHeight={780}
          marginNum={20}
          scaleNum={0.8}
          purchaser={purchaserList}
        />
      </View>
    );
  };

  const renderSlogan = () => {
    const style = {
      width: px(710),
      height: px(63),
      alignSelf: 'center',
      resizeMode: 'contain',
    };
    return <Image style={style} src={imgSlogan} />;
  };
  const renderBlockMenu = () => {
    return <EntryNew cuxiao={cuxiao} haitao={haitao} gaoyong={gaoyong} />;
  };
  const renderBlockLingYuanGou = () => {
    if (lodash.isEmpty(lygList) || !showLygItem) {
      return null;
    }
    const filterList = lodash.take(lygList, 4);
    return (
      <View>
        <Divider height={20} />
        <LingYuanGou listSource={filterList} />
      </View>
    );
  };

  const renderLingYuanGouModel = () => {
    return (
      <ModalCurtain visible={showLygModel} handleVisible={() => setShowLygModel(false)}>
        <PressView
          onPress={() => {
            navigationAction('webview', { source: { uri: `${H5_PREFIX}/lingYuanGou` } });
            setShowLygModel(false);
          }}
        >
          <Image style={styles.lygImage} src={lygCurtain} />
        </PressView>
      </ModalCurtain>
    );
  };

  const renderLocationModel = () => {
    return (
      <ModalCurtain visible={showLocationModel} handleVisible={() => setShowLocationModel(false)}>
        <PressView
          onPress={() => {
            navigation.push('userLocation');
            setShowLocationModel(false);
          }}
        >
          <Image style={styles.location_image} src={locationCurtain} />
        </PressView>
      </ModalCurtain>
    );
  };

  const renderBlockCuxiao = () => {
    if (lodash.isEmpty(cuxiaoList)) {
      return null;
    }
    return <Cuxiao listSource={cuxiaoList} gatherId={cuxiao} />;
  };
  const renderBlockHaitao = () => {
    if (lodash.isEmpty(haitaoList)) {
      return null;
    }
    return <Haitao listSource={haitaoList} gatherId={haitao} />;
  };

  const renderSectionHeader = () => {
    return (
      <View style={{ zIndex: 1 }}>
        <Gradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[pageColor, pageColorEnd]}>
          <Divider height={20} />
          {renderFunctional()}
          <Divider height={20} />
          {renderCustomSwiper()}
          <Divider height={20} />
          {renderBlockMenu()}
          <Divider height={20} />
          {renderBlockCuxiao()}
          <Divider height={20} />
          {renderBlockHaitao()}
          <Divider height={20} />
        </Gradient>
        <Text
          style={{
            paddingLeft: px(20),
          }}
        >
          <Text
            style={{
              fontSize: px(40),
              fontWeight: 'bold',
            }}
          >
            {'精选好货 '}
          </Text>
          <Text
            style={{
              fontSize: px(24),
              color: '#666666',
            }}
          >
            精选好货疯抢中
          </Text>
        </Text>
        <Divider height={20} />
      </View>
    );
  };

  const renderDivider = () => {
    return <Divider height={20} />;
  };

  const renderLatestOrder = () => {
    return (
      <View
        style={{ position: 'absolute', top: px(240), left: px(20), width: px(66), zIndex: 100 }}
      >
        <LatestOrder purchaser={purchaserList} />
      </View>
    );
  };

  const renderListItem = item => {
    return <ListItem item={item} />;
  };

  let statusObj = false;
  if (!array) {
    statusObj = {
      status: StateLoad,
    };
  }

  return (
    // <PageView isWhite={true} headerHide>
    //   {renderHeader()}
    //   <FlatList
    //     isEnd={isEnd}
    //     data={array}
    //     refreshing={false}
    //     onRefresh={handleRefresh}
    //     onEndReached={handleScrollEnd}
    //     ListHeaderComponent={renderSectionHeader()}
    //     ItemSeparatorComponent={renderDivider}
    //     renderItem={({ item }) => <ListItem item={item} />}
    //   />
    //   {renderLocationModel()}
    // </PageView>
    <PageView isWhite={true} headerHide statusObj={statusObj}>
      {renderHeader()}
      <ContentScrollView
        isEnd={isEnd}
        data={array}
        refreshing={false}
        onRefresh={handleRefresh}
        onEndReached={handleScrollEnd}
        renderItem={renderListItem}
        renderSticky={renderLatestOrder}
        renderHeader={renderSectionHeader}
      />
      {renderLocationModel()}
    </PageView>
  );
}

export default Index;
