import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { NavigationContext } from 'react-navigation';
import Image from '@/components/Image';
import PageView from '@/components/PageView';
import PressView from '@/components/PressView';
import Divider from '@/components/Divider';
import Swiper from 'react-native-swiper';
import StatusView, { StateLoad, StateError, StateEmpty } from '@/components/StatusView';
import styles from './style';
import goLink from '@/utils/goLink';
import { getBanner, getCatList } from '@/reducer/productReducer';
import useRequest from '@/hooks/useRequest';
import px from '@/utils/scalePx';

function Bijia() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [curTitle, setCurTitle] = useState('热门分类');
  const [requestCatList, allCatData] = useRequest(getCatList);
  const [requestBanner, bannerList] = useRequest(getBanner);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 左边分类(1级)
  const catList = allCatData ? allCatData.filter(v => v.level === 1) : [];
  // 右边分类(2级)
  const productList = allCatData ? allCatData.filter(v => v.level === 2) : [];
  const navigation = useContext(NavigationContext);

  const fetchData = () => {
    setIsLoading(true);
    Promise.all([requestCatList(), requestBanner({ query: { tags: '比价' } })])
      .then(_ => {
        setIsError(false);
        setIsLoading(false);
      })
      .catch(_ => {
        setIsError(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNavigate = url => {
    goLink(url);
  };

  const handleToSearch = () => {
    navigation.push('bijiaSearch');
  };

  const handleSearchResult = (keyword, id) => {
    navigation.push('bijiaSearchResult', {
      search: keyword,
      brandId: id,
    });
  };

  const renderSearch = () => {
    return (
      <PressView onPress={handleToSearch} style={styles.bijiaSearchContainer}>
        <Image
          style={styles.searchIcon}
          src={require('@/pages/home/home/components/Nav/assets/search_icon.png')}
        />
        <Text style={styles.searchText}>货比三家，明明白白省钱</Text>
      </PressView>
    );
  };

  const handleCurState = (index, name) => {
    setActiveIndex(index);
    setCurTitle(name);
  };

  const renderCatItem = ({ id, name }, index) => {
    const isActive = index === activeIndex;
    return (
      <PressView
        key={id}
        debounceTime={0}
        onPress={() => handleCurState(index, name)}
        style={[styles.catItemContainer, isActive && styles.catItemActiveContainer]}
      >
        <Text style={[styles.catItemText, isActive && styles.catItemActiveText]}>{name}</Text>
      </PressView>
    );
  };

  const renderLeft = () => {
    return (
      <View style={styles.leftWrapper}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {Array.isArray(catList) && catList.map((item, index) => renderCatItem(item, index))}
        </ScrollView>
      </View>
    );
  };

  const renderProductItem = ({ id, name, image }, index) => {
    const isRowEnd = (index + 1) % 3 === 0;
    return (
      <PressView
        onPress={() => handleSearchResult(name, id)}
        key={id}
        style={[styles.productItemContainer, { marginRight: isRowEnd ? 0 : px(50) }]}
      >
        <Image src={image} style={styles.productImage} />
        <Divider height={12} />
        <Text numberOfLines={1} style={styles.productTitle}>
          {name}
        </Text>
        <Divider height={36} />
      </PressView>
    );
  };

  const renderBanner = () => {
    return (
      Array.isArray(bannerList) &&
      bannerList.length > 0 && (
        <Swiper showsPagination={false} autoplay autoPlayTimeOut={3} style={styles.bannerContainer}>
          {bannerList.slice(0, 3).map(({ id, image, href }) => {
            return (
              <PressView key={id} onPress={() => handleNavigate(href)}>
                <Image src={image} style={styles.bannerImage} />
              </PressView>
            );
          })}
        </Swiper>
      )
    );
  };

  const renderRight = () => {
    // 从右边的数据，根据当前选中的分类去筛选,即level2数据的parentId去筛选level1数据的id
    const curProductList = Array.isArray(catList)
      ? productList.filter(item => item.parentId === catList[activeIndex]['id'])
      : [];
    const isEmpty = curProductList.length === 0;
    const isFirstItem = activeIndex === 0;
    return (
      <ScrollView style={styles.rightWrapper}>
        {/* banner */}
        {isFirstItem && renderBanner()}
        <Divider height={34} />
        <Text style={styles.title}>{curTitle}</Text>
        <Divider height={21} />
        <View style={styles.productContainer}>
          {isEmpty ? (
            <StatusView status={StateEmpty} tips="暂无数据" />
          ) : (
            curProductList.map((item, index) => renderProductItem(item, index))
          )}
        </View>
      </ScrollView>
    );
  };

  const headerObj = {
    leftComponent: null,
    centerComponent: {
      text: '比价',
    },
  };

  if (isLoading) {
    return <StatusView status={StateLoad} />;
  }

  if (isError) {
    return <StatusView status={StateError} tips={'网络错误'} button={'刷新'} onPress={fetchData} />;
  }

  return (
    <PageView style={styles.pageBg} headerObj={headerObj}>
      {renderSearch()}
      <Divider height={21} />
      <View style={styles.container}>
        {renderLeft()}
        {renderRight()}
      </View>
    </PageView>
  );
}

export default Bijia;
