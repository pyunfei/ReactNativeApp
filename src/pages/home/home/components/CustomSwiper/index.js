import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  useContext,
} from 'react';
import { NavigationContext } from 'react-navigation';
import { View, Text, PanResponder, Animated, Easing, Platform } from 'react-native';
import px from '@/utils/scalePx';
import styles from './style.scss';
import Card from './Card';
import LatestOrder from '../LatestOrder';

const Z_INDEX = 80; // 最高层级
const animate = new Animated.Value(0);

function Swiper({ source, itemWidth, itemHeight, marginNum, scaleNum, purchaser }) {
  const navigation = useContext(NavigationContext);

  const [centerIndex, setCenterIndex] = useState(0); // 中间显示的索引位置

  const animateTag = useRef(false); // 首次渲染不加载动画
  const directionTag = useRef(''); // 方向标识

  const enableChangeIndexTag = useRef(true); // 允许切换标识

  const enableGoTag = useRef(true); // Android跳转防抖标识

  // 层级
  const preZIndex = Z_INDEX - 1;
  const middleZIndex = Z_INDEX;
  const nextZIndex = Z_INDEX - 1;
  const outZIndex = Z_INDEX - 2;

  // 位置
  const preLeft = px(marginNum) - px(itemWidth * ((1 - scaleNum) / 2));
  const middleLeft = px((750 - itemWidth) / 2);
  const nextLeft = px(750 - itemWidth + itemWidth * ((1 - scaleNum) / 2) - marginNum);
  const outLeft = px((750 - itemWidth) / 2);

  useEffect(() => {
    setTimeout(() => {
      animateTag.current = true;
    }, 50);
  }, []);

  useLayoutEffect(() => {
    startAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centerIndex]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const startAnimation = useCallback(() => {
    animate.setValue(0);
    Animated.timing(animate, {
      toValue: 1,
      duration: 150,
      easing: Easing.ease,
    }).start();
  });

  // 手势
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => false,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => false, // 解决touchable不能点击的问题,不要捕获起始手势响应
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

    onPanResponderGrant: (evt, gestureState) => {
      enableChangeIndexTag.current = true;
    },
    onPanResponderMove: (evt, gestureState) => {
      const { dx } = gestureState;
      if (Math.abs(dx) > 20 && enableChangeIndexTag.current) {
        enableChangeIndexTag.current = false;
        handleTouch(dx);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      const { dx, dy, x0 } = gestureState;
      const marginMix = px(105);
      const marginMax = px(645);
      if (dx === 0 && dy === 0 && x0 > marginMix && x0 < marginMax && enableGoTag.current) {
        enableGoTag.current = false;
        const item = source[centerIndex];
        const { id, GatherSitem } = item;
        const { gatherId } = GatherSitem || {};
        navigation.push('productDetailSelf', {
          itemId: id,
          gatherId: gatherId,
        });
        setTimeout(() => {
          enableGoTag.current = true;
        }, 2000);
      }
    },
    onPanResponderTerminate: (evt, gestureState) => {},
    onShouldBlockNativeResponder: (evt, gestureState) => false,
    onPanResponderTerminationRequest: (evt, gestureState) => false,
  });

  const handleTouch = value => {
    if (value > 20) {
      // 向右滑动
      directionTag.current = 'right';
      const index = centerIndex > 0 ? centerIndex - 1 : source.length - 1;
      setCenterIndex(index);
    } else if (value < -20) {
      // 向左滑动
      directionTag.current = 'left';
      const index = centerIndex < source.length - 1 ? centerIndex + 1 : 0;
      setCenterIndex(index);
    }
  };

  const handleStyle = index => {
    // 动画前后属性
    let startLeft = outLeft;
    let endLeft = outLeft;
    let startScale = scaleNum;
    let endScale = scaleNum;
    let startZIndex = outZIndex;
    let endZIndex = outZIndex;
    // 当前显示的index
    let pre = centerIndex - 1;
    const middle = centerIndex;
    let next = centerIndex + 1;
    if (centerIndex === 0) {
      pre = source.length - 1;
    } else if (centerIndex === source.length - 1) {
      next = 0;
    }
    // style设置
    if (index === pre) {
      startLeft = middleLeft;
      endLeft = preLeft;
      endScale = scaleNum;
      endZIndex = preZIndex;
      if (directionTag.current === 'right') {
        startScale = scaleNum;
        startZIndex = outZIndex;
      } else if (directionTag.current === 'left') {
        startScale = 1;
        startZIndex = middleZIndex;
      }
    } else if (index === middle) {
      endLeft = middleLeft;
      startScale = scaleNum;
      endScale = 1;
      startZIndex = outZIndex;
      endZIndex = middleZIndex;
      if (directionTag.current === 'right') {
        startLeft = preLeft;
      } else if (directionTag.current === 'left') {
        startLeft = nextLeft;
      }
    } else if (index === next) {
      startLeft = middleLeft;
      endLeft = nextLeft;
      endScale = scaleNum;
      endZIndex = nextZIndex;
      if (directionTag.current === 'right') {
        startScale = 1;
        startZIndex = middleZIndex;
      } else if (directionTag.current === 'left') {
        startScale = scaleNum;
        startZIndex = outZIndex;
      }
    } else {
      endLeft = outLeft;
      endScale = scaleNum;
      endZIndex = outZIndex;
      if (directionTag.current === 'right') {
        startLeft = px(750 - itemWidth);
        startZIndex = nextZIndex;
      } else if (directionTag.current === 'left') {
        startLeft = px(0);
        startZIndex = preZIndex;
      }
    }
    return { startLeft, endLeft, startScale, endScale, startZIndex, endZIndex };
  };

  return (
    <View
      className={styles.container}
      style={{ height: px(itemHeight) }}
      {...panResponder.panHandlers}
    >
      {source.map((item, index) => {
        const { startZIndex, endZIndex, startLeft, endLeft, startScale, endScale } = handleStyle(
          index
        );
        return (
          <Animated.View
            key={index}
            className={styles.common}
            style={{
              width: px(itemWidth),
              height: px(itemHeight),
              left: animateTag.current
                ? animate.interpolate({
                    inputRange: [0, 1],
                    outputRange: [startLeft, endLeft],
                  })
                : endLeft,
              transform: [
                {
                  scale: animateTag.current
                    ? animate.interpolate({
                        inputRange: [0, 1],
                        outputRange: [startScale, endScale],
                      })
                    : endScale,
                },
              ],
              zIndex: animateTag.current
                ? animate.interpolate({
                    inputRange: [0, 0.7],
                    outputRange: [startZIndex, endZIndex],
                  })
                : endZIndex,
            }}
          >
            <Card item={item} />
          </Animated.View>
        );
      })}
      {/* <LatestOrder purchaser={purchaser} /> */}
    </View>
  );
}

Swiper.propTypes = {};

Swiper.defaultProps = {
  source: [],
  itemWidth: 540,
  itemHeight: 680,
  marginNum: 20,
  scaleNum: 0.8,
};

export default Swiper;
