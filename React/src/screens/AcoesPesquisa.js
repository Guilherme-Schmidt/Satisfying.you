import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AcoesPesquisa = () => {

  const navigation = useNavigation(); //hook useNavigation
  const route = useRoute(); //hook useRoute()
  const { titulo } = route.params || {} //desestruturação para acessar a propriedade titulo. route.params guarda os objetos passados durante a navegação

  // Define o título do header (atualiza o título antes que a tela seja exibida ao usuário)
  useLayoutEffect(() => {
    if (titulo) {
      navigation.setOptions({ title: titulo });
    }
  }, [navigation, titulo]); //dependencias , sempre que uma delas mudarem o useLayoutEffect será executado

  const goToModificarPesquisa = () => {
    navigation.navigate('ModificarPesquisa');
  };

  const goToColetarDados = () => {
    navigation.navigate('Coleta');
  };

  const goToRelatorio = () => {
    navigation.navigate('Tela_Relatorio');
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
