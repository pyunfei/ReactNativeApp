import React, { useState } from 'react';
import PageView from '@/components/PageView';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollableTabBar from '@/components/ScrollableTabBar';
import DarenSpeak from './commponents/DarenSpeak';
import WritingList from './commponents/WritingList';
import i18n from '@/locales';
import getStatusBarHeight from '@/utils/getStatusBarHeight';
import { View, StatusBar } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

function Index({ isFocused }) {
  const [statusObj, setStatusObj] = useState(null);
  return (
    <PageView headerHide statusObj={statusObj}>
      <View style={{ backgroundColor: '#FFF', height: getStatusBarHeight() }}></View>
      <ScrollableTabView renderTabBar={() => <ScrollableTabBar />}>
        <WritingList
          tabLabel={i18n.t('group.writing')}
          setStatusObj={setStatusObj}
        />
        <DarenSpeak tabLabel={i18n.t('group.daRen')} setStatusObj={setStatusObj} />
      </ScrollableTabView>
    </PageView>
  );
}
export default withNavigationFocus(Index);
