import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Divider from '@/components/Divider';
import PressView from '@/components/PressView';
import px from '@/utils/scalePx';
import ProfitLabel from '@/components/ProfitLabel';
import AfImage from '@/components/Image';
import { themeMap } from '@/utils/scaleStyle';
import { NavigationContext } from 'react-navigation';
import { calcPrice } from '@/utils/helper';
import { calcDeduction } from '@/utils/profitHelper';
import styles from './style.scss';

const rightIcon = require('./assets/right.png');

function BaoyouItem({ item }) {
  const navigation = useContext(NavigationContext);
  const { thumbnail, name, price, GatherSitem, extraPrice, award } = item;
  const { gatherId, sitemId } = GatherSitem;
  const extraP = extraPrice && JSON.parse(extraPrice);
  const { bazaar } = extraP || {};
  const realPrice = `${calcPrice(price, 2, false)}`;
  const shiChangPrice = `${calcPrice(bazaar, 2, false)}`;
  const deductions = calcDeduction(award);

  const goProductDetail = () => {
    navigation.push('productDetailSelf', {
      itemId: sitemId,
      gatherId: gatherId,
    });
  };

  return (
    <PressView className={styles.baoYou_item_bg} onPress={goProductDetail}>
      <View className={styles.baoYou_item_image_bg}>
        <AfImage src={thumbnail} className={styles.baoYou_item_image} />
      </View>
      <View className={styles.baoYou_item_name_bg}>
        <Text className={styles.baoYou_item_name_text} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
      </View>
      <View className={styles.baoYou_item_price_bg}>
        <Text className={styles.baoYou_item_price_name}>秒杀价 ¥</Text>
        <Text className={styles.baoYou_item_price_price}>{realPrice}</Text>
        <Text className={styles.baoYou_item_price_price_shichang}>¥{shiChangPrice}</Text>
      </View>
      <View className={styles.baoYou_item_backFee_bg}>
        <ProfitLabel type="deduction" value={deductions} style={{ height: px(28) }} />
      </View>
    </PressView>
  );
}

function BaoYou({ listSource, gatherId }) {
  const navigation = useContext(NavigationContext);
  const goProductList = () => {
    navigation.push('productList', {
      gatherId,
      type: 'cuxiao',
    });
  };
  return (
    <View className={styles.baoYou_bg}>
      <View className={styles.baoYou_t}>
        <View className={styles.baoYou_t_l}>
          <Text className={styles.baoYou_t_title}>9.9包邮</Text>
          <Text className={styles.baoYou_t_subTitle}>全品类超值特惠任性买</Text>
        </View>
        <PressView className={styles.baoYou_t_r} onPress={goProductList}>
          <Text className={styles.baoYou_t_r_text}>疯狂抢购</Text>
          <AfImage src={rightIcon} className={styles.baoyou_t_r_icon} />
        </PressView>
      </View>
      <Divider height={1} color={themeMap.$PageBg}></Divider>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className={styles.baoYou_b}>
          {listSource.map((item, index) => (
            <BaoyouItem key={index} item={item}></BaoyouItem>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

BaoYou.propTypes = {};

BaoYou.defaultProps = {};

export default BaoYou;
