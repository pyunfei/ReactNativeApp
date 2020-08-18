import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import styles from './style';
import i18n from '@/locales';
import Loading from '@/components/Loading';
import PressView from '@/components/PressView';
import { round } from 'lodash';
import LoadImg from '@/components/Image';
import StatusView, { StateEmpty } from '@/components/StatusView';
import { themeMap } from '@/utils/scaleStyle';

function formatReadtimes(read) {
  if (read > 10000) {
    return round(read / 10000, 2) + 'k';
  } else {
    return read;
  }
}
function RenderItem({
  item: {
    article_banner: articleBanner,
    name,
    talent_name: talentName,
    head_img: headImg,
    readtimes,
    id,
    article,
  },
  goToDetail,
  index,
}) {
  return (
    <View style={styles.toBeCenter} key={index}>
      <PressView style={[styles.item]} onPress={() => goToDetail(id)}>
        <View style={{ flex: 1 }}>
          <LoadImg style={styles.imageBanner} src={articleBanner} />
          <View style={styles.footer}>
            <Text style={styles.writing}>{`${index + 1}、${name}`}</Text>
            <Text style={styles.article} numberOfLines={2}>
              {article}
            </Text>
            <View style={styles.verticalCenter}>
              <View style={styles.toBeLeVel}>
                <LoadImg style={styles.portrait} src={headImg} />
                <Text style={styles.name}>{talentName}</Text>
              </View>
              <View style={styles.toBeLeVel}>
                <Image style={styles.icon} source={require('./assets/icon.png')} />
                <Text style={styles.numerical}>{formatReadtimes(readtimes)}</Text>
              </View>
            </View>
          </View>
        </View>
      </PressView>
    </View>
  );
}
function Index({ list, tableList, id, setId, goToDetail }) {
  const changeId = id => setId(id);
  const lang = i18n.t('app');
  const _renderItem = function (data) {
    if (!data) {
      return (
        <View
          style={{
            flex: 1,
            height: 300,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loading />
        </View>
      );
    }
    return (
      <FlatList
        style={styles.list}
        data={data}
        renderItem={({ item, index }) => (
          <RenderItem item={item} index={index} goToDetail={goToDetail} />
        )}
      />
    );
  };
  return (
    <View style={styles.fullScreen}>
      <Text style={styles.header} numberOfLines={2}>
        {i18n.t('darenSaid.everyoneIsVisiting')}
      </Text>
      <View style={styles.labelList}>
        {tableList.map((item, index) => (
          <PressView
            style={styles.labelBanner}
            onPress={() => {
              changeId(index);
            }}
            key={index}
          >
            <View
              style={[
                styles.cut_bg,
                id === index
                  ? {
                    backgroundColor: themeMap.$Secondary,
                  }
                  : {
                    backgroundColor: 'transparent',
                  },
              ]}
            >
              <Text
                style={[
                  styles.cut,
                  id === index
                    ? {
                      color: themeMap.$White,
                    }
                    : {
                      color: themeMap.$BlackS,
                    },
                ]}
              >
                {item}
              </Text>
            </View>
          </PressView>
        ))}
      </View>
      {list === null ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Loading />
        </View>
      ) : !list.length ? (
        <View
          style={{
            flex: 1,
            backgroundColor: '$White',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <StatusView status={StateEmpty} tips={lang.nodata} />
        </View>
      ) : (
        _renderItem(list)
      )}
    </View>
  );
}

export default Index;
