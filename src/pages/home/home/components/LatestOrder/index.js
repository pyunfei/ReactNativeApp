import React, { useState } from 'react';
import { View, Text } from 'react-native';
import px from '@/utils/scalePx';
import { themeMap } from '@/utils/scaleStyle';
import Image from '@/components/Image';
import dayjs from 'dayjs';
import Swiper from '@/components/Swiper';

import styles from './style.scss';

function LatestOrder({ purchaser }) {
  const handleTime = second => {
    const days = Math.floor(second / 86400);
    const hours = Math.floor((second % 86400) / 3600);
    const minutes = Math.floor(((second % 86400) % 3600) / 60);
    const seconds = Math.floor(((second % 86400) % 3600) % 60);
    let duration = '';

    if (days > 0) {
      duration = days + '天';
    } else if (days <= 0 && hours > 0) {
      duration = hours + '小时';
    } else if (days <= 0 && hours <= 0 && minutes > 0) {
      duration = minutes + '分钟';
    } else if (days <= 0 && hours <= 0 && minutes <= 0 && seconds > 0) {
      duration = seconds + '秒钟';
    }
    return duration;
  };
  if (!purchaser || purchaser.length === 0) {
    return null;
  }
  return (
    <View className={styles.swiper}>
      <Swiper showsPagination={false} horizontal={false} loop autoplay loadMinimal={false}>
        {purchaser.map((item, index) => {
          const { name, time, avatarUrl } = item || {};
          const now = new Date();
          const value = dayjs(now).diff(dayjs(time), 'second');
          const newTime = handleTime(value);

          const content = `最新订单来自 ${name.substring(0, 5)} ${newTime}前`;

          return (
            <View className={styles.content_bg} key={index}>
              <View className={styles.image_container}>
                <Image src={avatarUrl} className={styles.image} />
              </View>
              <Text className={styles.content_text}>{content}</Text>
            </View>
          );
        })}
      </Swiper>
    </View>
  );
}
LatestOrder.defaultProps = {
  purchaser: [],
};

export default LatestOrder;
