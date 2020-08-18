import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducers from '@/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const middleWares = [thunkMiddleware, promiseMiddleware];
const enhances = [composeWithDevTools(applyMiddleware(...middleWares))];

const persistConfig = {
  key: 'root',
  whitelist: ['persistReducer'],
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export default initialState => {
  const store = createStore(persistedReducer, initialState, compose(...enhances));
  const persistor = persistStore(store);
  return { store, persistor };
};
