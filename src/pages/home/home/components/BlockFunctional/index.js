import React, { useContext } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { NavigationContext } from 'react-navigation';
import styles from './style.scss';
import config from '@/config';
import px from '@/utils/scalePx';
import { themeMap } from '@/utils/scaleStyle';
import PressView from '@/components/PressView';

const dashuju = require('./assets/dashuju.png');
const rexiao = require('./assets/rexiao.png');
const zuidijia = require('./assets/zuidijia.png');
const jiangjia = require('./assets/jiangjia.png');

const data = [
  {
    title: '大数据推荐',
    subTitle: '优质商品',
    icon: dashuju,
  },
  {
    title: '全网最热销',
    subTitle: '优质榜单',
    icon: rexiao,
  },
  {
    title: '全网最低价',
    subTitle: '快速省钱',
    icon: zuidijia,
  },
  {
    title: '降价提醒',
    subTitle: '省钱秘笈',
    icon: jiangjia,
  },
];

function Item({ index, color, title, subTitle, icon }) {
  const navigation = useContext(NavigationContext);
  const handleToPage = index => {
    navigation.push('webview', {
      source: { uri: `${config.H5_PREFIX}/exhibition/${index}` },
    });
  };
  return (
    <PressView onPress={() => handleToPage(index)}>
      <ImageBackground className={styles.item_container} source={icon}>
        <Text className={styles.item_title}>{title}</Text>
        <Text className={styles.item_subTitle}>{subTitle}</Text>
      </ImageBackground>
    </PressView>
  );
}

function BlockFunctional() {
  return (
    <View className={styles.container}>
      {data.map((item, index) => {
        const { title, subTitle, icon } = item;
        return <Item title={title} index={index} subTitle={subTitle} icon={icon} key={index} />;
      })}
    </View>
  );
}

export default BlockFunctional;
