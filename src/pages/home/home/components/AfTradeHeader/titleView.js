import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import LinearGradient from '@/components/GradientLayout';
import Style from './style';
import images from './assets';

const [title, hit] = ['全网热门优惠券', '每日上新'];
class TitleView extends React.PureComponent {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={['#FFF6D4', '#fff']}
          style={Style.titleViewContainer}
        >
          <View style={Style.titleView}>
            <Text
              style={Style.titleViewText}
            >
              {title}
            </Text>
            <ImageBackground
              style={Style.titleViewBg}
              source={images.ic_bg_hit}
            >
              <Text
                style={Style.titleViewHit}
              >
                {hit}
              </Text>
            </ImageBackground>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

export default TitleView;
