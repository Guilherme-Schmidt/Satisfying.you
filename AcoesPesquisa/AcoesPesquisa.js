import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AcoesPesquisa = () => {
  return (
    <View style={estilos.tela}>

      <View style={estilos.header}>
        <TouchableOpacity style={estilos.iconVoltar}>
          <Icon name="arrow-back" size={55} color="#573FBA" />
        </TouchableOpacity>
        <Text style={estilos.txtHeader}>Carnaval</Text>
      </View>

      <View style={estilos.cCards}>
        <TouchableOpacity style={estilos.cIcon}>
          <Image
            style={estilos.image}
            source={require('./assets/images/modificar.png')}
          />
          <Text style={estilos.txtIcon}>Modificar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.cIcon}>
          <Image
            style={estilos.image}
            source={require('./assets/images/coletar_dados.png')}
          />
          <Text style={estilos.txtIcon}>Coletar dados</Text>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.cIcon}>
          <Image
            style={estilos.image}
            source={require('./assets/images/relatorio.png')}
          />
          <Text style={estilos.txtIcon}>Relatório</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};
const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#372775',
  },

  header: {
    flex: 0.2,
    flexDirection: 'row',
    backgroundColor: '#2B1D62',
    alignItems: 'center',
  },

  txtHeader: {
    fontSize: 35,
    fontFamily: 'AveriaLibre-Regular',
    color: '#FFFFFF',
    marginLeft: '3%',
  },

  iconVoltar: {
    marginLeft: '2%',
  },

  cCards: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  cIcon: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#312464',
    height: 170,
    width: 200,
    borderRadius: 10,
  },

  image: {
    height: 70,
    width: 70,
  },

  txtIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'AveriaLibre-Regular',
    marginTop: 10,
  },
});

export default AcoesPesquisa;
