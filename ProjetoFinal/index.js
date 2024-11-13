/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Login from './src/screens/Login';
import NewSearch from './src/screens/NewSearch';
import ModificarPesquisa from './src/screens/ModifySearch';
import Coleta  from './src/screens/Coleta';
import Agradecimento from './src/screens/Agradecimento';
import NovaConta from './src/screens/NovaConta';
import {name as appName} from './app.json';
import {App} from './App'

AppRegistry.registerComponent(appName, () => App);
