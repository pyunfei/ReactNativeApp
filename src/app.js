import React, { useLayoutEffect, useEffect } from 'react';
import { Platform, StatusBar, Alert, Linking } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store';
import AppContainer from './navigator';
import NavigationService from './navigator/NavigationService';
import { PersistGate } from 'redux-persist/integration/react';
import codePush from 'react-native-code-push';
import NetInfo from '@react-native-community/netinfo';
import ModalAlert from '@/components/Alert';

const { store, persistor } = configureStore();
const isAndroid = Platform.OS === 'android';

export const globalStore = store;
export default function Root() {
  useEffect(() => {
    codePush.sync({ installMode: codePush.InstallMode.ON_NEXT_RESTART });
    // !global.__DEV__ && handleUpdate();
    const unsubscribe = NetInfo.addEventListener(handleNetChange);
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNetChange = state => {
    if (state.isConnected || global.__DEV__) {
      return;
    }
    ModalAlert.alert('网络错误', '您当前处于离线状态,部分功能可能无法使用,请检查您的网络状态', [
      {
        text: '我知道了',
      },
    ]);
  };

  const showUpdate = (buildNum, updateInfo) => {
    let info = null;
    const { IOS, Android } = updateInfo || {};
    if (Platform.OS === 'ios') {
      info = IOS;
    } else {
      info = Android;
    }
    const { appCode, appDesc, appLink, appSource, appVersion, enable } = info || {};

    if (enable && appCode > Number(buildNum) && appLink) {
      Alert.alert('更新提示', appDesc, [
        { text: '取消', onPress: () => {} },
        {
          text: '更新',
          onPress: () => {
            Linking.canOpenURL(appLink).then(() => {
              Linking.openURL(appLink);
            });
          },
        },
      ]);
    }
  };

  useLayoutEffect(() => {
    if (isAndroid && StatusBar.currentHeight) {
      global.Expo = {
        Constants: {
          statusBarHeight: StatusBar.currentHeight,
        },
      };
    }
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </PersistGate>
    </Provider>
  );
}
