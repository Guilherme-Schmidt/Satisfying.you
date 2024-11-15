/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Importar o NavigationContainer
import { createStackNavigator } from '@react-navigation/stack'; // Ou qualquer outro tipo de navegação
import Login from './src/screens/Login'; // Ajuste o caminho conforme necessário
import NovaConta from './src/screens/NovaConta'; 
import RecuperarSenha from './src/screens/RecuperarSenha';
import Tela_Home from './src/screens/Tela_Home';
import NewSearch from './src/screens/NewSearch';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Certifique-se de que a importação está correta
import DrawerNavigator from './src/screens/DrawerNavigator';
import AcoesPesquisa from './src/screens/AcoesPesquisa';
import ModificarPesquisa from './src/screens/ModifySearch';
import Coleta from './src/screens/Coleta';
import Agradecimento from './src/screens/Agradecimento';
import Tela_Relatorio from './src/screens/Tela_Relatorio';
import PopUp from './src/screens/PopUp';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator //Exemplo de Header automatico
        initialRouteName="Login" 
        screenOptions={{
          headerStyle: {backgroundColor: '#2B1D62'},
          headerTitleStyle: {
            fontSize: 35,
            fontFamily: 'AveriaLibre-Regular',
            color: '#FFFFFF',
          },
          headerBackImage: () => (
            <Icon name="arrow-back" size={35} color="#573FBA" />
          ),
        }}>
          <Stack.Screen name="Login" component={Login}  options={{headerShown: false}} />
          <Stack.Screen name="NovaConta" component={NovaConta}  />
          <Stack.Screen name="RecuperarSenha" component={RecuperarSenha}  />
          <Stack.Screen name="NewSearch" component={NewSearch}  options={{headerShown: false}} />
          <Stack.Screen name="DrawerNavigator" component={DrawerNavigator}  options={{headerShown: false}} />
          <Stack.Screen name="AcoesPesquisa" component={AcoesPesquisa} />
          <Stack.Screen name="ModificarPesquisa" component={ModificarPesquisa} options={{headerShown: false}}/>
          <Stack.Screen name="Coleta" component={Coleta} options={{headerShown: false}}/>
          <Stack.Screen name="Agradecimento" component={Agradecimento} options={{headerShown: false}}/>
          <Stack.Screen name="Tela_Relatorio" component={Tela_Relatorio}/>
          <Stack.Screen name="PopUp" component={PopUp} options={{headerShown: false}}/>

        </Stack.Navigator>
      </NavigationContainer>
    );
  };
export default App;