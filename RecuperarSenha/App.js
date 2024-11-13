//Exemplo de App.js
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/screens/Login';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RecuperarSenha from './src/screens/RecuperarSenha';

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
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="RecuperarSenha"
          component={RecuperarSenha}
          options={{headerTitle: 'Recuperar Senha'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
