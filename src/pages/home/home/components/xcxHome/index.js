import React from 'react';
import { View, Text } from 'react-native';
import ProductListItem from '@/components/ProductListItem';

import styles from './style.scss';

function xcxHome({ listSource, goProductDetail }) {
  return (
    <View className={styles.xcxHome_bg}>
      <View className={styles.list_header}>
        <Text className={styles.list_header_title}>精选好货</Text>
        <Text className={styles.list_header_tips}>精选好货疯抢中</Text>
      </View>
      {listSource && (
        <View>
          {listSource.map((item, index) => {
            const { GatherSitem } = item;
            const { gatherId } = GatherSitem || {};
            return (
              <View key={String(index)}>
                <ProductListItem
                  item={item}
                  gatherId={gatherId}
                  goProductDetail={goProductDetail}
                />
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

xcxHome.propTypes = {};

xcxHome.defaultProps = {};

export default xcxHome;
