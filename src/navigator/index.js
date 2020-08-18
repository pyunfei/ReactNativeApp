import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import home from '@/pages/home';
import demo from '@/pages/demo';

import webview from '@/pages/webview';
import userHarvest from '@/pages/userHarvest';

const Navigator = createStackNavigator(
  {
    home,
    webview,
    userHarvest,
    customerService,
  },
  {
    headerMode: 'none',
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  }
);

const LaunchStack = createStackNavigator(
  {
    launch,
  },
  {
    headerMode: 'none',
  }
);

const SwitchNavigator = createSwitchNavigator({
  LaunchStack,
  Navigator,
});

const AppContainer = createAppContainer(SwitchNavigator);
export default AppContainer;
