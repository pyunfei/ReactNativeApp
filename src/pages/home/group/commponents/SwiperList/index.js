import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import styles from './style';
import Carousel from 'react-native-snap-carousel';
import PressView from '@/components/PressView';
import px from '@/utils/scalePx';
import LoadImg from '@/components/Image';

const sliderWidth = parseInt(Dimensions.get('window').width);
const itemWidth = parseInt(px(530));

function Index({ list, goToDetail }) {
  const _renderItem = function _renderItem({ item, index }) {
    const { app_image: appImage, shorttitle, readtimes, image, id } = item;
    return (
      <PressView key={index} style={styles.item} onPress={() => goToDetail(id)}>
        <View style={{ flex: 1 }}>
          <LoadImg style={styles.banner} src={appImage} />
          <Text style={styles.title} numberOfLines={1}>
            {shorttitle}
          </Text>
          <Text style={styles.itemNum}>{readtimes} 阅读</Text>
          <LoadImg style={styles.appImage} src={image} />
        </View>
      </PressView>
    );
  };
  return (
    <View style={styles.list}>
      <View
        style={{
          flex: 1,
        }}
      >
        <Carousel
          data={list}
          loop={true}
          autoplay={true}
          layout={'default'}
          itemWidth={itemWidth}
          loopClonesPerSide={5}
          enableMomentum={false}
          renderItem={_renderItem}
          sliderWidth={sliderWidth}
          lockScrollWhileSnapping={true}
        />
      </View>
    </View>
  );
}

export default Index;
