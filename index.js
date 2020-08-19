/* eslint-disable prettier/prettier */
import { AppRegistry, Text, TextInput } from 'react-native';
import * as Sentry from '@sentry/react-native';
import { name as appName } from './app.json';
import Config from '@/config';
import Root from './src';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

// Sentry.init({
//   dsn: global.__DEV__ ? '' : 'https://d735485edb4b47acae0790edaf8d5b38@sentry.io/1734047',
//   environment: Config.ENV,
// });

AppRegistry.registerComponent(appName, () => Root);
