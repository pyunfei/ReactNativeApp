import React from 'react';
import WebView from '@/components/WebView';
import PageView from '@/components/PageView';
import config from '@/config';

function DianZhang() {
  const dianzhangUrl = `${config.H5_PREFIX}/shopowner`;
  const headerObj = {
    leftComponent: null,
    centerComponent: {
      text: '店长',
    },
  };
  return (
    <PageView headerObj={headerObj}>
      <WebView source={{ uri: dianzhangUrl }} />
    </PageView>
  );
}

export default DianZhang;
