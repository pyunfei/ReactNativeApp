/* eslint-disable prettier/prettier */
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import home from '@/pages/home';
import launch from '@/pages/launch';


const Navigator = createStackNavigator(
  {
    home,
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
