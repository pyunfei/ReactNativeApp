import React from 'react';
import { View } from 'react-native';
import Header from '@/pages/home/group/commponents/Header';
import Details from '@/pages/home/group/commponents/Details';
import styleJss from './style';
import ImageZoomView from '@/components/ImageZoomView';

const state = {
  name: '趣比比',
  portrait:
    'https://jiasuyun-pub.oss-cn-shenzhen.aliyuncs.com/miaoyin/app/images/qunCategory/1557974661%281%29.jpg',
  shareNums: 6673,
  commandName: '趣比比:',
};
function Index({
  itempic,
  showTime,
  copyContent,
  itemid,
  title,
}) {
  function showImage(index, list) {
    ImageZoomView.show(index, list);
  }
  return (
    <View style={styleJss.fullScreen}>
      <Header name={state.name} time={showTime} portrait={state.portrait} />
      <Details
        pictureList={itempic}
        copyContent={copyContent}
        itemid={itemid}
        showImage={showImage}
        title={title}
      />
    </View>
  );
}

export default Index;
