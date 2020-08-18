import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { NavigationContext } from 'react-navigation';
import { useSelector } from 'react-redux';
import { themeMap } from '@/utils/scaleStyle';
import px from '@/utils/scalePx';
import config from '@/config';
import Icon from 'react-native-vector-icons/AntDesign';
import PressView from '@/components/PressView';

import styles from './style.scss';

function Card({ id, title, route, values }) {
  const navigation = useContext(NavigationContext);
  const { isLogin } = useSelector(state => state.userReducer);

  const handleRoute = () => {
    if (!route) return;
    if (!isLogin) {
      navigation.push('authLogin');
      return;
    }
    navigation.push(route);
  };

  const renderHorizontalDivider = () => {
    return (
      <View
        style={{
          marginHorizontal: px(20),
          borderBottomColor: themeMap.$Divider,
          borderBottomWidth: px(1),
        }}
      ></View>
    );
  };

  const renderVerticalDivider = () => {
    return (
      <View
        style={{
          borderRightColor: themeMap.$Divider,
          borderRightWidth: px(1),
        }}
      ></View>
    );
  };

  let renderContainer = () => {
    return <Text>加载中...</Text>;
  };

  const renderContent = content => {
    if (!isLogin || content === null || content === undefined) {
      return '--';
    }
    return content;
  };

  // 两列
  const renderTow = () => {
    return (
      <>
        <View className={styles.row}>
          <View className={styles.col}>
            <Text className={styles.value}>{renderContent(values[0].value)}</Text>
            <Text className={styles.label}>{values[0].label}</Text>
          </View>
          {renderVerticalDivider()}
          <View className={styles.col}>
            <Text className={styles.value}>{renderContent(values[1].value)}</Text>
            <Text className={styles.label}>{values[1].label}</Text>
          </View>
        </View>
      </>
    );
  };

  // 三列
  const renderThree = () => {
    return (
      <>
        <View className={styles.row}>
          <View className={styles.col}>
            <Text className={styles.value}>{renderContent(values[0].value)}</Text>
            <Text className={styles.label}>{values[0].label}</Text>
          </View>
          {renderVerticalDivider()}
          <View className={styles.col}>
            <Text className={styles.value}>{renderContent(values[1].value)}</Text>
            <Text className={styles.label}>{values[1].label}</Text>
          </View>
          {renderVerticalDivider()}
          <View className={styles.col}>
            <Text className={styles.value}>{renderContent(values[2].value)}</Text>
            <Text className={styles.label}>{values[2].label}</Text>
          </View>
        </View>
      </>
    );
  };

  // 四宫格
  const renderFour = () => {
    return (
      <>
        <View className={styles.row}>
          <View className={styles.col}>
            <Text className={styles.value}>{renderContent(values[0].value)}</Text>
            <Text className={styles.label}>{values[0].label}</Text>
          </View>
          {renderVerticalDivider()}
          <View className={styles.col}>
            <Text className={styles.value}>{renderContent(values[1].value)}</Text>
            <Text className={styles.label}>{values[1].label}</Text>
          </View>
        </View>
        {renderHorizontalDivider()}
        <View className={styles.row}>
          <View className={styles.col}>
            <Text className={styles.value}>{renderContent(values[2].value)}</Text>
            <Text className={styles.label}>{values[2].label}</Text>
          </View>
          {renderVerticalDivider()}
          <View className={styles.col}>
            <Text className={styles.value}>{renderContent(values[3].value)}</Text>
            <Text className={styles.label}>{values[3].label}</Text>
          </View>
        </View>
      </>
    );
  };

  switch (values.length) {
    case 2:
      renderContainer = renderTow();
      break;
    case 3:
      renderContainer = renderThree();
      break;
    case 4:
      renderContainer = renderFour();
      break;
    default:
      break;
  }

  return (
    <View style={{ position: 'relative' }}>
      <PressView className={styles.wrapper} onPress={handleRoute}>
        <View className={styles.titleRow}>
          <Text className={styles.title}>{title}</Text>
          {!!route && (
            <View className={styles.right}>
              <Text className={styles.more}>更多</Text>
              <Icon name="right" size={px(20)} color={themeMap.$BlackL} />
            </View>
          )}
        </View>
        {renderHorizontalDivider()}
        <View className={styles.container}>{renderContainer}</View>
      </PressView>
    </View>
  );
}

export default Card;
