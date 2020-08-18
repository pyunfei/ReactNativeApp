import React, { useContext } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { NavigationContext } from 'react-navigation';
import px from '@/utils/scalePx';
import { themeMap } from '@/utils/scaleStyle';
import Image from '@/components/Image';
import AfIcon from 'react-native-vector-icons/AntDesign';
import Divider from '@/components/Divider';
import PressView from '@/components/PressView';
import SaleProgress from '@/components/SaleProgress';
import { calcPrice } from '@/utils/helper';
import { take, drop, isEmpty } from 'lodash';
import config from '@/config';
import Gradient from 'react-native-linear-gradient';

import styles from './style.scss';

const buyButtonColor = '#ff5757';
const buyButtonColorEnd = '#ff2c2c';

const firePrice = require('./assets/firePrice.png');

function Card({ item, enableClick, handleNav }) {
  const navigation = useContext(NavigationContext);

  const {
    id,
    thumbnail,
    name,
    price,
    extraPrice,
    GatherSitem,
    award,
    showNumSales,
    allStock,
    avatars,
  } = item;
  const { jd, tb, bazaar } = (extraPrice && JSON.parse(extraPrice)) || {};
  const { gatherId } = GatherSitem || {};
  // 字段映射区
  const title = name;
  const header = thumbnail;
  const itemprice = price;
  const productId = id;

  const realPrice = `${calcPrice(itemprice, 2, false)}`;
  const scPrice = bazaar;
  const tbPrice = tb;
  const jdPrice = jd;

  const handleClick = () => {
    navigation.push('productDetailSelf', {
      itemId: productId,
      gatherId: gatherId,
    });
  };

  const renderImage = () => {
    return (
      <View className={styles.mainImage_bg}>
        <Image className={styles.mainImage} src={header} />
      </View>
    );
  };
  const renderTitle = () => {
    return (
      <View className={styles.title_container}>
        <Text className={styles.title} numberOfLines={1} ellipsizeMode={'tail'}>
          {title}
        </Text>
      </View>
    );
  };
  const renderProgress = () => {
    const rate = showNumSales / allStock;
    const content = `已抢${showNumSales}件`;
    return <SaleProgress width={160} rate={rate} content={content} />;
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
        <View className={styles.price_container_left}>
          <Text className={styles.priceText}>
            <Text className={[styles.price, styles.price_red]}>¥{realPrice}</Text>
            <Text>&ensp;</Text>
            <Text className={styles.textLine}>原价¥{scPrice / 100}</Text>
          </Text>
          <Divider height={15} />
          {renderProgress()}
        </View>
        <Gradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          colors={[buyButtonColor, buyButtonColorEnd]}
          style={{ borderRadius: px(4) }}
        >
          <PressView className={styles.buyButton} onPress={handleClick}>
            <Text className={styles.buyText}>立即抢购</Text>
          </PressView>
        </Gradient>
      </View>
    );
  };
  const renderBottom = () => {
    return (
      <View className={styles.bottom_container}>
        {renderOtherPrice()}
        {renderPrice()}
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

  const renderFirePrice = () => {
    return (
      <ImageBackground className={styles.firePrice_container} source={firePrice}>
        <Text className={styles.firePrice_title}>狂补价</Text>
        <Text className={styles.firePrice_num}>¥{realPrice}</Text>
      </ImageBackground>
    );
  };

  return (
    <View className={styles.item_container}>
      {renderImage()}
      {renderTitle()}
      {renderBottom()}
      {renderDashSecondLine()}
      {renderHeaders()}
      {renderFirePrice()}
    </View>
  );
}

export default Card;
