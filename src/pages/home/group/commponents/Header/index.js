import React from 'react';
import { View, Text } from 'react-native';
import dayjs from 'dayjs';
import styleJss from './style';
import LoadImg from '@/components/Image';

function Index({ name, time, portrait }) {
  return (
    <View style={styleJss.fullScreen}>
      <View style={styleJss.toBeCenter}>
        <LoadImg style={styleJss.portrait} src={require('@/assets/image/app_logo.png')} />
      </View>
      <View style={styleJss.toBeBetween}>
        <View>
          <Text style={styleJss.name}>{name}</Text>
          <Text style={styleJss.time}>
            {dayjs(time.length === 10 ? time * 1000 : time).format(
              'YYYY-MM-DD  HH:mm:ss'
            )}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Index;
