import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Importar o NavigationContainer
import { createStackNavigator } from '@react-navigation/stack'; // Ou qualquer outro tipo de navegação
import Login from './src/screens/Login'; // Ajuste o caminho conforme necessário
import NovaConta from './src/screens/NovaConta'; // Ajuste o caminho conforme necessário

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="NovaConta" component={NovaConta} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
