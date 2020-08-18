import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView } from 'react-native';
import PageView from '@/components/PageView';
import PressView from '@/components/PressView';
import { themeMap } from '@/utils/scaleStyle';
import px from '@/utils/scalePx';

import styles from './style.scss';
import Hot from './components/Hot';
import Guide from './components/Guide';
import Earning from './components/Earning';

const tabList = [
  { label: '新手秘籍', index: 0 },
  { label: '热榜', index: 1 },
  { label: '常见问答', index: 2 },
];

function GongLue() {
  const [tabIndex, setTabIndex] = useState(0);

  const tabRef = useRef(null);

  useEffect(() => {
    const _offsetValue = tabIndex * 750;
    tabRef.current.scrollTo({ x: px(_offsetValue) });
  }, [tabIndex]);

  const handleClickTab = index => {
    setTabIndex(index);
  };

  const renderTabs = () => {
    return (
      <View className={styles.tabsContainer}>
        {tabList.map(item => {
          const { label, index } = item;
          const isActive = index === tabIndex;

          return (
            <PressView
              className={styles.tab}
              onPress={() => {
                handleClickTab(index);
              }}
              key={index}
            >
              <Text
                className={styles.tabText}
                style={
                  isActive && {
                    color: themeMap.$BlackS,
                  }
                }
              >
                {label}
              </Text>
              {isActive && <View className={styles.activeUnderline}></View>}
            </PressView>
          );
        })}
      </View>
    );
  };

  const headerObj = {
    leftComponent: null,
    centerComponent: {
      text: '攻略',
    },
  };
  const pageViewStyle = {};
  tabIndex === 0 && Object.assign(pageViewStyle, { backgroundColor: themeMap.$White });

  return (
    <PageView headerObj={headerObj} style={pageViewStyle}>
      {renderTabs()}
      <ScrollView
        ref={tabRef}
        contentContainerStyle={{ width: px(750 * tabList.length) }}
        horizontal
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
      >
        <Guide />
        <Hot />
        <Earning />
      </ScrollView>
    </PageView>
  );
}

export default GongLue;
