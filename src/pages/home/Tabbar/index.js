import React from 'react';
import { Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from './style.scss';

function Tabbar({ tabs, icons, initIndex, activeTab, goToPage }) {
  return (
    <SafeAreaView>
      <View className={styles.tabbar}>
        {tabs.map((item, i) => {
          const isActive = i === activeTab;
          const icon = icons[i];
          return (
            <TouchableOpacity
              className={styles.tabbaritem}
              key={i}
              activeOpacity={1}
              onPress={() => goToPage(i)}
            >
              <Image
                className={styles.icon}
                source={isActive ? icon.iconactive : icon.icondefault}
              />
              <Text className={[styles.itemtext, isActive ? styles.itemactive : styles.item]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
Tabbar.defaultProps = {
  tabs: [],
  initIndex: 0,
};
export default Tabbar;
