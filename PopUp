import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PopUp = () => {
  return (
    <View style={estilo.container}>
      <View style={estilo.popUp}>
        <View>
          <Text style={estilo.texto}>Tem certeza de apagar essa pesquisa?</Text>
        </View>
        <View style={estilo.botao}>
          <TouchableOpacity style={estilo.botao1}>
            <Text style={estilo.textoBotao}>Sim</Text>
          </TouchableOpacity>
          <TouchableOpacity style={estilo.botao2}>
            <Text style={estilo.textoBotao}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  popUp: {
    backgroundColor: '#2B1F5C',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: 450,
  },

  texto: {
    fontFamily: 'AveriaLibre-Regular',
    fontSize: 30,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20, 
  },

  botao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },

  botao1: {
    backgroundColor: '#FF8383',
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 175,
    justifyContent: 'center',
  },

  botao2: {
    backgroundColor: '#3F92C5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 175,
  },

  textoBotao: {
    fontFamily: 'AveriaLibre-Regular',
    fontSize: 32,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default PopUp;
