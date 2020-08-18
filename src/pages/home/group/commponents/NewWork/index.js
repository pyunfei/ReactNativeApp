import React from 'react';
import { View, Image, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import i18n from '@/locales';
import PressView from '@/components/PressView';
import LoadImg from '@/components/Image';

function Index({ list, goToDetail }) {
  const sliceList = list.slice(0, 2);
  return (
    <View style={styles.fullScreen}>
      <Text style={styles.title}>{i18n.t('darenSaid.newWorkThisWeek')}</Text>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
        }}
      >
        {sliceList.map(
          (
            {
              name,
              head_img: headImg,
              talent_name: talentName,
              article_banner: articleBanner,
              id,
            },
            index
          ) => (
            <PressView
              style={styles.toBeCenter}
              onPress={() => goToDetail(id)}
              key={index}
            >
              <View
                style={[
                  styles.item,
                  index % 2 === 0 ? styles.itemLeft : styles.itemRight,
                ]}
              >
                <View>
                  <LoadImg style={styles.backgroundImage} src={articleBanner} />
                  <LinearGradient
                    colors={['rgba(0,0,0, 0)', 'rgba(0,0,0, 0.6)']}
                    style={styles.linearGradient}
                  >
                    <Text style={styles.writing} numberOfLines={1}>
                      {name}
                    </Text></LinearGradient>
                </View>
                <View style={styles.footer}>
                  <View style={styles.toBeBetween}>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}
                    >
                      <LoadImg style={styles.portrait} src={headImg} />
                      <Text style={styles.name}>{talentName}</Text>
                    </View>
                    <PressView style={styles.icon}>
                      <Image
                        style={styles.icon}
                        source={require('@/assets/image/next.png')}
                      />
                    </PressView>
                  </View>
                </View>
              </View>
            </PressView>
          )
        )}
      </View>
    </View>
  );
}

export default Index;
