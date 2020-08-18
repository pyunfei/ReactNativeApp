import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import AfImage from '@/components/Image';
import Divider from '@/components/Divider';
import PressView from '@/components/PressView';
import AfIcon from 'react-native-vector-icons/AntDesign';
import styles from './style.scss';
import px from '@/utils/scalePx';
import { themeMap } from '@/utils/scaleStyle';
import { calcPrice } from '@/utils/helper';
import { NavigationContext } from 'react-navigation';
import { H5_PREFIX } from '@/config';
function BlockLyg({ listSource }) {
  const navigation = useContext(NavigationContext);
  const goProductListWeb = () => {
    const url = `${H5_PREFIX}/lingYuanGou`;
    navigation.push('webview', {
      source: { uri: url },
    });
  };

  const renderLygItems = data => {
    return (
      <View className={styles.item_container}>
        {data.map((item, index) => {
          const { thumbnail, price } = item;
          const realPrice = `${calcPrice(price, 2, false)}`;
          const borderRightStyle = index === data.length - 1 && { borderRight: '0px' };
          return (
            <PressView
              key={String(index)}
              className={styles.item_bg}
              style={borderRightStyle}
              onPress={() => goProductListWeb()}
            >
              <AfImage src={thumbnail} className={styles.item_image} />
              <Text className={styles.item_price}>¥{realPrice}</Text>
              <View className={styles.item_free_bg}>
                <Text className={styles.item_free_text_tag}>¥</Text>
                <Text className={styles.item_free_text_zero}>0</Text>
              </View>
            </PressView>
          );
        })}
      </View>
    );
  };

  return (
    <View className={styles.container}>
      <View className={styles.title_container}>
        <Text className={styles.title}>爆款好物0元购</Text>
        <View className={styles.header_r}>
          <Text className={styles.sub_title}>新人首单全返</Text>
          <PressView className={styles.more_bg} onPress={() => goProductListWeb()}>
            <Text className={styles.more_text}>进入活动页</Text>
            <AfIcon
              name={'caretright'}
              size={px(15)}
              color={themeMap.$Red}
              style={{ marginLeft: px(10) }}
            />
            <AfIcon
              name={'caretright'}
              size={px(15)}
              color={'#FE979A'}
              style={{ marginLeft: px(-2) }}
            />
          </PressView>
        </View>
      </View>

      <Divider height={1} color={'#E6E6E6'} />
      {renderLygItems(listSource)}
    </View>
  );
}

export default BlockLyg;
