import React from 'react';
import { Text } from 'react-native';
import Image from '@/components/Image';
import PressView from '@/components/PressView';
import styles from './style';
import px from '@/utils/scalePx';

function GuideItem({ style, source, content, amount, scale, ...restProps }) {
  return (
    <PressView style={[styles.item, style]} {...restProps} >
      <Image style={[styles.icon, { width: px(scale), height: px(scale) }]} src={source} />
      <Text style={styles.content}>{content}</Text>
      {amount && <Text numberOfLines={1} style={styles.number}>{amount}</Text> }
    </PressView>
  );
}

export default GuideItem;
