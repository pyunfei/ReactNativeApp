/**
 * @format
 */

import { AppRegistry, Platform, Text, TextInput } from 'react-native';
import { name as appName } from './app.json';
import Root from './src/app';
import * as Sentry from '@sentry/react-native';
import codePush from 'react-native-code-push';
import Config from '@/config';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

Sentry.init({
  dsn: global.__DEV__ ? '' : 'https://d735485edb4b47acae0790edaf8d5b38@sentry.io/1734047',
  environment: Config.ENV,
});

codePush.getUpdateMetadata().then(update => {
  if (update) {
    Sentry.setRelease(Platform.OS + '-' + update.appVersion + '-codepush:' + update.label);
  }
});

AppRegistry.registerComponent(appName, () => Root);

