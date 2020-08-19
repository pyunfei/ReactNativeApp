/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import AppContainer from './navigator';
import NavigationService from './navigator/NavigationService';
import { PersistGate } from 'redux-persist/integration/react';

const { store, persistor } = configureStore();

export const globalStore = store;
export default function Root() {

  useEffect(() => {
    console.log('isoK');
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
