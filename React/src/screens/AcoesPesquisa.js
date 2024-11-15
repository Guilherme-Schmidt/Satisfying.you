import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AcoesPesquisa = (props) => {
  
  const goToModificarPesquisa = () => {
    props.navigation.navigate('ModificarPesquisa');//verificar nome da tela e componente em Stack.Screen 
  };

  const goToColetarDados = () => {
    props.navigation.navigate('Coleta'); //verificar nome da tela e componente em Stack.Screen
  };

  const goToRelatorio = () => {
    props.navigation.navigate('Tela_Relatorio'); // Dentro de um componente no DrawerNavigator
  };

  return (
    <View style={estilos.tela}>
        <TouchableOpacity style={estilos.iconContainer} onPress={goToModificarPesquisa}>
          <Icon name="edit-note" size={80} color="#FFFFFF" />
          <Text style={estilos.txtIcon}>Modificar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.iconContainer} onPress={goToColetarDados}>
          <Icon name="library-add-check" size={80} color="#FFFFFF" />
          <Text style={estilos.txtIcon}>Coletar dados</Text>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.iconContainer} onPress={goToRelatorio}>
          <Icon name="donut-large" size={80} color="#FFFFFF" />
          <Text style={estilos.txtIcon}>Relatório</Text>
        </TouchableOpacity>
    
    </View>
  );
};

const estilos = StyleSheet.create({

  tela: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#372775',
  },

  iconContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#312464',
    height: 170,
    width: 200,
    borderRadius: 10,
  },

  txtIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'AveriaLibre-Regular',
    marginTop: 10,
  }
});

export default AcoesPesquisa;
