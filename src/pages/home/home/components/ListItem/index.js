import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { NavigationContext } from 'react-navigation';
import { connect, useSelector } from 'react-redux';
import Image from '@/components/Image';
import TextLabel from '@/components/TextLabel';
import ProfitLabel from '@/components/ProfitLabel';
import Divider from '@/components/Divider';
import PressView from '@/components/PressView';
import SaleProgress from '@/components/SaleProgress';
import px from '@/utils/scalePx';
import { themeMap } from '@/utils/scaleStyle';
import config from '@/config';
import AfIcon from 'react-native-vector-icons/AntDesign';
import { calcPrice, isShopOwner } from '@/utils/helper';
import { calcMoney, calcPollen, calcDeduction } from '@/utils/profitHelper';
import { take, isEmpty } from 'lodash';
import Gradient from 'react-native-linear-gradient';

import styles from './style.scss';

const labelQbb = require('@/assets/image/label_qbb.png');
const buyButtonColor = '#ff5757';
const buyButtonColorEnd = '#ff2c2c';

function ProductListHdk({ item }) {
  const navigation = useContext(NavigationContext);

  const {
    id,
    thumbnail,
    thumbnailExtra,
    name,
    price,
    extraPrice,
    GatherSitem,
    award,
    showNumSales,
    allStock,
    extra,
    avatars,
  } = item;
  const { jd, tb, bazaar } = (extraPrice && JSON.parse(extraPrice)) || {};
  const { gatherId } = GatherSitem || {};
  const { followNum = 0 } = (extra && JSON.parse(extra)) || {};
  let newFollowNum = `${followNum}万`;
  if (followNum >= 1000) {
    newFollowNum = `${(followNum / 10000).toFixed(1)}万`;
  }
  // 字段映射区
  const label = labelQbb;
  const title = name;
  const header = thumbnailExtra || thumbnail;
  const itemprice = price;
  const productId = id;

  const realPrice = `${calcPrice(itemprice, 2, false)}`;
  const scPrice = bazaar;
  const tbPrice = tb;
  const jdPrice = jd;
  // 抵扣金
  const deductions = calcDeduction(award);
  // 花粉
  const pollen = calcPollen(award);

  const handleClick = () => {
    navigation.push('productDetailSelf', {
      itemId: productId,
      gatherId: gatherId,
    });
  };

  const renderImage = () => {
    return <Image className={styles.mainImage} src={header} resizeMode={'stretch'} />;
  };
  const renderTitle = () => {
    const renderLabelImage = () => {
      return <Image className={styles.labelImage} src={label}></Image>;
    };
    return (
      <View className={styles.title_container}>
        <View className={styles.textLable_container}>
          <TextLabel
            numberOfLines={2}
            ellipsizeMode="tail"
            label={renderLabelImage()}
            content={title}
            className={styles.itemTitle}
          />
        </View>
        <View className={styles.guanZhu_container}>
          <Text className={styles.guanZhu_text}>{newFollowNum}</Text>
          <Text className={styles.guanZhu_text}>关注人数</Text>
        </View>
      </View>
    );
  };
  const renderTag = () => {
    const isExist = !!Number(deductions) || !!Number(pollen);
    return (
      isExist && (
        <View className={styles.tagView}>
          {!!Number(deductions) && (
            <ProfitLabel style={{ marginRight: px(10) }} type="deduction" value={deductions} />
          )}
          {!!Number(pollen) && (
            <ProfitLabel style={{ marginRight: px(10) }} type="pollen" value={pollen} />
          )}
        </View>
      )
    );
  };
  const renderOtherPrice = () => {
    return (
      <View className={styles.otherPrice_container}>
        <Text className={styles.priceText}>
          {!!tbPrice && (
            <Text>
              <Text>淘宝价&nbsp;</Text>
              <Text>¥{tbPrice / 100}</Text>
            </Text>
          )}
          {!!jdPrice && !!tbPrice && (
            <Text style={{ color: themeMap.$BlackXL }}>&nbsp;|&nbsp;</Text>
          )}
          {!!jdPrice && (
            <Text>
              <Text>京东价&nbsp;</Text>
              <Text>¥{jdPrice / 100}</Text>
            </Text>
          )}
        </Text>
      </View>
    );
  };
  const renderPrice = () => {
    return (
      <View className={styles.price_container}>
        <Text className={styles.priceText}>
          <Text className={[styles.price, styles.price_red]}>¥{realPrice}</Text>
          <Text>&ensp;</Text>
          <Text className={styles.textLine}>¥{scPrice / 100}</Text>
        </Text>
      </View>
    );
  };
  const renderButton = () => {
    return (
      <Gradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        colors={[buyButtonColor, buyButtonColorEnd]}
        style={{ marginRight: px(20), borderRadius: px(4) }}
      >
        <PressView className={styles.buyButton} onPress={handleClick}>
          <Text className={styles.buyText}>立即抢购</Text>
        </PressView>
      </Gradient>
    );
  };
  const renderProgress = () => {
    const rate = showNumSales / allStock;
    const content = `已抢${showNumSales}件`;
    return (
      <View className={styles.progress_container}>
        <SaleProgress width={160} rate={rate} content={content} />
      </View>
    );
  };
  const renderBottom = () => {
    return (
      <View className={styles.bottom_container}>
        <View className={styles.bottom_container_left}>
          {renderTag()}
          {renderOtherPrice()}
          <View className={styles.price_progress_container}>
            {renderPrice()}
            {renderProgress()}
          </View>
        </View>
        {renderButton()}
      </View>
    );
  };

  const renderDashSecondLine = () => {
    return <Divider height={1} color={themeMap.$BlackXL} />;
  };
  const renderHeaders = () => {
    const listSource = avatars;
    if (isEmpty(listSource)) {
      return null;
    }
    const filterList = take(listSource, 5);
    return (
      <View className={styles.headers_container}>
        {filterList &&
          filterList.map((item, index) => {
            const { avatarUrl } = item || {};
            return (
              <View
                key={index}
                className={styles.header_image_container}
                style={{ zIndex: index + 50 }}
              >
                <Image src={avatarUrl} className={styles.header_image} />
              </View>
            );
          })}
        <View className={styles.ellipsis_container} style={{ zIndex: 50 + filterList.length }}>
          <AfIcon name={'ellipsis1'} size={px(30)} color={themeMap.$White} />
        </View>
        <Text className={styles.header_text}>等购买了此商品</Text>
      </View>
    );
  };

  return (
    <PressView className={styles.container} onPress={handleClick} activeOpacity={1}>
      {renderImage()}
      {renderTitle()}
      {renderBottom()}
      {renderDashSecondLine()}
      {renderHeaders()}
    </PressView>
  );
}

export default ProductListHdk;
