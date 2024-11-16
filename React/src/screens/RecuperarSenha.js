import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';


const RecuperarSenha = (props) => {
  const [email, setEmail] = useState('');
  const [erroEmail, setErroEmail] = useState('');

  const verificaEmail = (texto) => {
    setEmail(texto); //garante atualização do valor do email
    const emailRegex = /^(?!.*\.{2})[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    if (texto === '' || emailRegex.test(texto)) {
      setErroEmail('');
    } else {
      setErroEmail('E-mail parece ser inválido');
    }
  };

  const validarRecuperação = () => {
    // Verificar se e-mail está preenchido
    if (email === '') {
      alert('É necessário informar um E-mail.');
      return; //encerra função
    }
    // Verificar se não há erro de e-mail
    if (erroEmail === '') {
      props.navigation.goBack(); //volta para login e desimpilha esta tela
    }
  };
 

  return (
    <View style={estilos.tela}>
     
        <View style={estilos.inputContainer}>
          <Text style={estilos.txtEmail}>E-mail</Text>
          <TextInput
            value={email}
            onChangeText={verificaEmail} //chama a função verificaEmail ao digitar
            style={estilos.txtInput}
            keyboardType="email-address"
            autoCapitalize="none"></TextInput>
          <Text style={estilos.txtErro}>{erroEmail}</Text>
        </View>
        <TouchableOpacity style={estilos.botaoContainer} onPress={validarRecuperação}>
          <Text style={estilos.txtBotao}>RECUPERAR</Text>
        </TouchableOpacity>
     
    </View>
  );
};

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#372775',
  },

  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '75%',
  },

  botaoContainer: {
    backgroundColor: '#49B976',
    justifyContent: 'center',
    alignItems: 'center',
    width: '75%',
    height: '15%',
    marginTop: '5%',
    elevation: 10,
  },

  txtEmail: {
    fontSize: 20,
    fontFamily: 'AveriaLibre-Regular',
    color: '#FFFFFF',
  },

  txtInput: {
    backgroundColor: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'AveriaLibre-Regular',
    color: '#3F92C5',
  },

  txtBotao: {
    fontSize: 20,
    fontFamily: 'AveriaLibre-Regular',
    color: '#FFFFFF',
  },

  txtErro: {
    color: '#FD7979',
    marginTop: '2%',
    fontSize: 16,
    fontFamily: 'AveriaLibre-Regular',
  },
});

export default RecuperarSenha;
