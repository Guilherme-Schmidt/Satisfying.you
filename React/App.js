import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Importar o NavigationContainer
import { createStackNavigator } from '@react-navigation/stack'; // Ou qualquer outro tipo de navegação
import Login from './src/screens/Login'; // Ajuste o caminho conforme necessário
import NovaConta from './src/screens/NovaConta'; // Ajuste o caminho conforme necessário
import Icon from 'react-native-vector-icons/MaterialIcons'; // Certifique-se de que a importação está correta

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
            <Icon name="arrow-back" size={35} color="#573FBA" /> // Personalizar o tamanho da seta
          ),
        }}>
          <Stack.Screen name="Login" component={Login}  options={{headerShown: false}} />
          <Stack.Screen name="NovaConta" component={NovaConta}  />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
export default App;
