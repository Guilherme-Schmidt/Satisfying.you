import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RecuperarSenha = () => {
  const [email, setEmail] = useState('');
  const [erroEmail, setErroEmail] = useState('');

  const verificaEmail = texto => {
    setEmail(texto); //garante atualização do valor do email
    const emailRegex = /^(?!.*\.{2})[^\s@]+@[^\s@]+\.[^\s@]+$/; //regex para validar email

    if (texto === '' || emailRegex.test(texto)) {
      setErroEmail('');
    } else {
      setErroEmail('E-mail parece ser inválido');
    }
  };

  return (
    <View style={estilos.tela}>

      <View style={estilos.header}>
        <TouchableOpacity style={estilos.iconVoltar}>
          <Icon name="arrow-back" size={55} color="#573FBA" />
        </TouchableOpacity>
        <Text style={estilos.txtHeader}>Recuperação de senha</Text>
      </View>

      <View style={estilos.cPrincipal}>
        <View style={estilos.cInput}>
          <Text style={estilos.txtEmail}>E-mail</Text>
          <TextInput
            value={email}
            onChangeText={verificaEmail} //chama a função verificaEmail ao digitar
            style={estilos.txtInput}
            keyboardType="email-address"
            autoCapitalize="none"></TextInput>
          <Text style={estilos.txtErro}>{erroEmail}</Text>
        </View>
        <TouchableOpacity style={estilos.botaoFundo}>
          <Text style={estilos.txtBotao}>RECUPERAR</Text>
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
    fontSize: 33,
    fontFamily: 'AveriaLibre-Regular',
    color: '#FFFFFF',
    marginLeft: '3.5%',
  },

  iconVoltar: {
    marginLeft: '2%',
  },

  cPrincipal: {
    flex: 0.8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#372775',
  },

  cInput: {
    justifyContent: 'center',
    width: '60%',
  },

  botaoFundo: {
    backgroundColor: '#49B976',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
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
