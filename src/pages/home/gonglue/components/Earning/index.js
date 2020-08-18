import React, { useEffect, useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { NavigationContext } from 'react-navigation';
import PressView from '@/components/PressView';
import StatusView, { StateLoad, StateEmpty } from '@/components/StatusView';
import { themeMap } from '@/utils/scaleStyle';
import px from '@/utils/scalePx';
import useRequest from '@/hooks/useRequest';
import { getListGuides } from '@/reducer/userReducer';
import { H5_PREFIX } from 'config';

import styles from './style.scss';

function Earning() {
  const [requestListGuides, guides] = useRequest(getListGuides);
  const navigation = useContext(NavigationContext);

  useEffect(() => {
    requestListGuides({
      query: {
        pageNo: 1,
        pageSize: 50,
        tag: '常见问答',
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDetail = id => {
    navigation.push('webview', {
      source: {
        uri: `${H5_PREFIX}/article/${id}`,
      },
    });
  };

  const renderItem = ({ id, title }) => {
    return (
      <PressView className={styles.itemWrapper} onPress={() => handleDetail(id)}>
        <Text className={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={{ flex: 1 }}></View>
        <Icon name="right" color={themeMap.$BlackL} size={12} />
      </PressView>
    );
  };

  if (!guides) {
    return <StatusView status={StateLoad} tips="数据加载中" />;
  }

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: px(20), paddingHorizontal: px(24), width: px(750) }}
    >
      {!!Array.isArray(guides) && !!guides.length ? (
        guides.map(({ id, title }) => {
          return <View key={id}>{renderItem({ id, title })}</View>;
        })
      ) : (
        <StatusView status={StateEmpty} tips="暂无数据" />
      )}
    </ScrollView>
  );
}

export default Earning;
