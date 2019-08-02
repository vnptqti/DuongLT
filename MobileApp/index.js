/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import MainComponent from './src/components/MainComponent';
import {name as appName} from './app.json';
AppRegistry.registerComponent(appName, () => App);
