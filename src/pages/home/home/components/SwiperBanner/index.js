import React, { useState } from 'react';
import { View, ImageBackground, Text } from 'react-native';
import Image from '@/components/Image';
import styles, { otherStyle } from './style';
import PressView from '@/components/PressView';
import Swiper from '@/components/Swiper';
import px from '@/utils/scalePx';
import goLink from '@/utils/goLink';
import { connect } from 'react-redux';
import { postChangeHomeTopBgColor } from '@/reducer/demoReducer';
import { withNavigation } from 'react-navigation';

function Index({ refreshing, data, postChangeHomeTopBgColor }) {
  // const defColor = !!data.length && data[0].color;
  // const [color, setColor] = useState(defColor);
  const [currentIndex, setCurrentIndex] = useState(1);

  const scrollEndACtion = index => {
    const color = data.length > index && data[index].color;
    // setColor(color);
    postChangeHomeTopBgColor(color);
  };

  const handleNavigate = uri => {
    goLink(uri);
  };
  // 单张轮播图
  const renderSlide = ({ img, href, key }) => {
    return (
      <PressView
        key={key}
        activeOpacity={1}
        onPress={() => handleNavigate(href)}
        style={{ flex: 1, height: px(350) }}
      >
        <View style={styles.swiperImgContainer}>
          <Image style={styles.swiperImg} src={img} />
        </View>
      </PressView>
    );
  };

  const renderSwiperIndex = (currentIndex, total) => {
    return (
      <ImageBackground style={styles.swiperIndex} source={require('./assets/swiperIndex.png')}>
        <Text style={styles.swiperIndex_text}>{currentIndex}</Text>
        <Text style={styles.swiperIndex_text}>/</Text>
        <Text style={styles.swiperIndex_text}>{total}</Text>
      </ImageBackground>
    );
  };

  return (
    <View style={styles.bannerContainer}>
      <Swiper
        activeDotStyle={styles.activeDotStyle}
        dotStyle={styles.dotStyle}
        paginationStyle={{ bottom: px(20) }}
        showsPagination={false}
        onMomentumScrollEnd={(e, b) => {
          scrollEndACtion(b.index);
        }}
        horizontal
        loop
        autoplay
        loadMinimal
        onIndexChanged={index => {
          setCurrentIndex(index + 1);
        }}
      >
        {data.map(
          (value, i) => {
            return renderSlide({ img: value.image, href: value.href, key: i });
          }
        )}
      </Swiper>
      {Array.isArray(data) && renderSwiperIndex(currentIndex, data.length)}
    </View>
  );
}

const mapDispatchToProps = {
  postChangeHomeTopBgColor,
};

export default withNavigation(
  connect(
    null,
    mapDispatchToProps
  )(React.memo(Index))
);
