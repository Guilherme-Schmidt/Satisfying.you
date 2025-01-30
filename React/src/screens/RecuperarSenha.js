import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { auth_module } from '../firebase/config';
import { sendPasswordResetEmail } from 'firebase/auth';

const RecuperarSenha = (props) => {

  const [email, setEmail] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const [loading, setLoading] = useState(false);


  const validarRecuperação = async () => {
    //Enviar e-mail de redefinição de senha
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth_module, email);
      console.log("Email de redefinição de senha enviado com sucesso.")
      props.navigation.goBack(); //volta para tela de login e desimpilha esta tela
    }
    catch (error) {
      console.log('Falha ao enviar e-mail de redefinição de senha: ' + JSON.stringify(error));
      if (error.code === 'auth/invalid-email') {
        setErroEmail('E-mail inválido!');
      }
      else if (error.code === 'auth/missing-email') {
        setErroEmail('É necessário informar um E-mail');
      }
      else {
        setErroEmail('Erro ao enviar e-mail de redefinição de senha.');
      }
    }
    finally {
      setLoading(false);
    }
  };


  return (
    <View style={estilos.tela}>

      <View style={estilos.inputContainer}>
        <Text style={estilos.txtEmail}>E-mail</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={estilos.txtInput}
          keyboardType="email-address"
          autoCapitalize="none" />
        <Text style={estilos.txtErro}>{erroEmail}</Text>
      </View>

      {loading ? (
        <TouchableOpacity style={estilos.botaoContainer}>
          <Text style={estilos.txtBotao}>Enviando e-mail...</Text>
          <ActivityIndicator style={estilos.loadingIndicator} size={'small'} color={'white'} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={estilos.botaoContainer} onPress={validarRecuperação}>
          <Text style={estilos.txtBotao}>RECUPERAR</Text>
        </TouchableOpacity>
      )}


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
    marginBottom: 3,
  },

  txtInput: {
    backgroundColor: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'AveriaLibre-Regular',
    color: '#3F92C5',
    padding: 5,
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
    fontFamily: 'AveriaLire-Regular',
  },
  loadingIndicator: {
    position: 'absolute',
    right: 170,
  },
});

export default RecuperarSenha;
