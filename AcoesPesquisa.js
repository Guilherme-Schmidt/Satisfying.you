import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const AcoesPesquisa = () => {
 
  return (
    <View style={estilos.tela}>

      <View style={estilos.header}>

        <TouchableOpacity style={estilos.iconVoltar}>
          <Image  style={{height: 33, width: 33}} source={require("./Assets/flecha_voltar.png")}/>
        </TouchableOpacity>
        <Text style={estilos.txtHeader}>Carnaval</Text>

      </View>

      <View style={estilos.cCards}>

        <TouchableOpacity style={estilos.cIcon}>
          <Image style={{height:65, width:65}} source={require("./Assets/modificar.png")}/>
          <Text style={estilos.txtIcon}>Modificar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.cIcon}>
          <Image style={{height:65, width:65}} source={require("./Assets/coletar_dados.png")}/>
          <Text style={estilos.txtIcon}>Coletar dados</Text>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.cIcon}>
          <Image style={{height:65, width:65}} source={require("./Assets/relatorio.png")}/>
          <Text style={estilos.txtIcon}>Relatório</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}
const estilos = StyleSheet.create({

  tela: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#372775',
  },

  header: {
    flex: 0.2,
    flexDirection: 'row',
    backgroundColor:'#2B1D62',
    alignItems: 'center',
  },

  txtHeader: {
    fontSize: 35,
    color: '#FFFFFF',
    marginLeft: '3.5%'
  },

  iconVoltar:{
    marginLeft: '2%'
  },

  cCards: {
    flex:0.8,
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
    borderRadius: 10
  },

  txtIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    marginTop: 10
  }

});

export default AcoesPesquisa;