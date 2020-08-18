import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import Divider from '@/components/Divider';
import PressView from '@/components/PressView';
import AfIcon from 'react-native-vector-icons/AntDesign';
import px from '@/utils/scalePx';
import ProfitLabel from '@/components/ProfitLabel';
import AfImage from '@/components/Image';
import { themeMap } from '@/utils/scaleStyle';
import take from 'lodash/take';
import drop from 'lodash/drop';
import isEmpty from 'lodash/isEmpty';
import { OSS_PREFIX } from '@/config';
import { NavigationContext } from 'react-navigation';
import { calcPrice } from '@/utils/helper';
import { calcDeduction } from '@/utils/profitHelper';
import styles from './style.scss';

const qiangIcon = require('./assets/qiang.png');

function HaitaoItem({ item, style }) {
  const navigation = useContext(NavigationContext);
  const { thumbnail, price, GatherSitem, Brand, extraPrice, award } = item;
  const { gatherId, sitemId } = GatherSitem;
  const realPrice = `${calcPrice(price, 2, false)}`;
  const deductions = calcDeduction(award);
  const { logo } = Brand;
  const extraP = extraPrice && JSON.parse(extraPrice);
  const { bazaar } = extraP || {};
  const shiChangPrice = `${calcPrice(bazaar, 2, false)}`;

  const goProductDetail = () => {
    navigation.push('productDetailSelf', {
      itemId: sitemId,
      gatherId: gatherId,
    });
  };

  return (
    <PressView className={styles.haitao_item_bg} style={style} onPress={goProductDetail}>
      <View className={styles.haitao_item_image_bg}>
        <AfImage src={thumbnail} className={styles.haitao_item_image} />
      </View>
      <View className={styles.haitao_item_info_bg}>
        <AfImage src={logo} className={styles.haitao_item_info_logo} resizeMode={'contain'} />
        <View className={styles.haitao_item_info_price_bg}>
          <Text className={styles.haitao_item_info_price_name}>¥</Text>
          <Text className={styles.haitao_item_info_price_price}>{realPrice}</Text>
          <Text className={styles.haitao_item_info_price_price_shichang}>¥{shiChangPrice}</Text>
        </View>
        <View className={styles.haitao_item_info_backFee_bg}>
          <ProfitLabel type="deduction" value={deductions} style={{ height: px(28) }} />
        </View>
      </View>
      <View className={styles.haitao_item_info_qiang_image_bg}>
        <AfImage src={qiangIcon} className={styles.haitao_item_info_qiang_image} />
      </View>
    </PressView>
  );
}

function HaitaoItemBottom({ item, style }) {
  const navigation = useContext(NavigationContext);
  const { thumbnail, price, GatherSitem, Brand, extraPrice, award } = item;
  const { gatherId, sitemId } = GatherSitem;
  const realPrice = `${calcPrice(price, 2, false)}`;
  const deductions = calcDeduction(award);
  const { logo } = Brand;
  const extraP = extraPrice && JSON.parse(extraPrice);
  const { bazaar } = extraP || {};
  const shiChangPrice = `${calcPrice(bazaar, 2, false)}`;
  const goProductDetail = () => {
    navigation.push('productDetailSelf', {
      itemId: sitemId,
      gatherId: gatherId,
    });
  };

  return (
    <PressView className={styles.haitao_itemBottom_bg} style={style} onPress={goProductDetail}>
      <AfImage src={logo} className={styles.haitao_itemBottom_logo} resizeMode={'contain'} />
      <AfImage src={thumbnail} className={styles.haitao_itemBottom_image} />
      <View className={styles.haitao_itemBottom_price_bg}>
        <Text className={styles.haitao_itemBottom_price_name}>¥</Text>
        <Text className={styles.haitao_itemBottom_price_price}>{realPrice}</Text>
        <Text className={styles.haitao_item_info_price_price_shichang}>¥{shiChangPrice}</Text>
      </View>
      <View className={styles.haitao_item_info_backFee_bg}>
        <ProfitLabel type="deduction" value={deductions} style={{ height: px(28) }} />
      </View>
    </PressView>
  );
}

function HaiTao({ listSource, gatherId }) {
  const navigation = useContext(NavigationContext);

  const goProductList = () => {
    navigation.push('productList', {
      gatherId,
      type: 'haitao',
    });
  };

  if (isEmpty(listSource)) {
    return null;
  }
  const filterList = take(listSource, 5);
  const firstItems = take(filterList, 2);
  const restItems = drop(filterList, 2);

  return (
    <View className={styles.haitao_bg}>
      <View className={styles.haitao_t}>
        <Text className={styles.haitao_t_title}>大牌海淘 · 特惠来袭</Text>
        <PressView className={styles.haitao_t_r} onPress={goProductList}>
          <Text className={styles.haitao_t_r_text}>更多</Text>
          <AfIcon name="right" size={px(20)} color={themeMap.$BlackM} />
        </PressView>
      </View>
      <Divider height={1} color={themeMap.$PageBg}></Divider>
      <PressView className={styles.haitao_bgImage_bg} onPress={goProductList}>
        <AfImage src={`${OSS_PREFIX}/qietu/haitao.png`} className={styles.haitao_bgImage} />
      </PressView>
      <View className={styles.haitao_item_itemAndBottom_bg}>
        <View className={styles.haitao_item}>
          {firstItems.map((item, index) => {
            const style = index === firstItems.length - 1 && { borderRightWidth: 0 };
            return <HaitaoItem item={item} key={index} style={style}></HaitaoItem>;
          })}
        </View>
        <View className={styles.haitao_itemBottom}>
          {restItems.map((item, index) => {
            const style = index === restItems.length - 1 && { borderRightWidth: 0 };
            return <HaitaoItemBottom item={item} key={index} style={style}></HaitaoItemBottom>;
          })}
        </View>
      </View>
    </View>
  );
}

HaiTao.propTypes = {};

HaiTao.defaultProps = {};

export default HaiTao;
