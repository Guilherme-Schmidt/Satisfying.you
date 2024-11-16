import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'; // Importar o hook useNavigation

const Login = ({  }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const navigation = useNavigation(); 
  const verificaEmail = texto => {
    setEmail(texto);
    const emailRegex = /^(?!.*\.{2})[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (texto === '' || emailRegex.test(texto)) {
      setErroEmail('');
    } else {
      setErroEmail('E-mail e/ou senha inválidos');
    }
  };

  const goToHome = () =>{
    navigation.navigate('DrawerNavigator'); //Home está contida no drawer
  };

  const goToNovaConta = () =>{
    navigation.navigate('NovaConta');
  };

  const goToRecuperarSenha = () =>{
    navigation.navigate('RecuperarSenha');
  };

  return (
    <View style={estilos.tela}>
      <View style={estilos.header}>
        <Text style={estilos.title}>Satisfying.you</Text>
        <Icon name="sentiment-satisfied" size={40} style={estilos.icon} />
      </View>

      <View style={estilos.cPrincipal}>
        <View style={estilos.cInput}>
          <Text style={estilos.txtEmail}>E-mail</Text>
          <TextInput
            value={email}
            onChangeText={verificaEmail}
            style={estilos.txtInput}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={estilos.cInput}>
          <Text style={estilos.txtEmail}>Senha</Text>
          <TextInput
            style={estilos.txtInput}
            value={password}
            onChangeText={setPassword}
            placeholder="**********"
            placeholderTextColor="#3F92C5"
            secureTextEntry
          />
          <Text style={estilos.txtErro}>{erroEmail}</Text>
        </View>

        <TouchableOpacity
          style={estilos.botaoFundo} onPress={goToHome}
        >
          <Text style={estilos.txtBotao}>ENTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          // eslint-disable-next-line react-native/no-inline-styles
          style={[estilos.botaoCriarFundo, { marginTop: 30 }]}
          onPress={goToNovaConta}
        >
          <Text style={estilos.botaoCriarText}>Criar minha conta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.botaoSenha} onPress={goToRecuperarSenha}>
          <Text style={estilos.botaoCriarText}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#372775',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  header: { 
    flexDirection: 'row', // Coloca o ícone e o texto lado a lado
    alignItems: 'center', // Alinha o ícone e o texto verticalmente
    justifyContent: 'center', // Centraliza o conteúdo horizontalmente
    marginBottom: 15,
  },

  title: {
    fontSize: 34,
    fontFamily: 'AveriaLibre-Regular',
    color: '#FFFFFF',
    marginLeft: '3%',
  },

  icon: {
    marginLeft: 10, // Espaço entre o texto e o ícone
    marginTop: 3,
    color: '#FFFFFF'
  },

  cPrincipal: {
    alignItems: 'center',
    width: '100%',
  },

  cInput: {
    width: '80%',
    marginBottom: 10,
  },

  txtEmail: {
    fontSize: 14,
    fontFamily: 'AveriaLibre-Regular',
    color: '#FFFFFF',
    marginBottom: 4,
  },

  txtInput: {
    height: 35,
    backgroundColor: '#FFFFFF',
    color: '#3F92C5',
    fontFamily: 'AveriaLibre-Regular',
    fontSize: 14,
    paddingLeft: 10,
    width: '100%',
  },

  botaoFundo: {
    height: 35,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#49B976',
    marginBottom: 10,
    elevation: 10
  },
  txtErro: {
    color: '#FD7979',
    marginTop: '2%',
    fontSize: 16,
    fontFamily: 'AveriaLibre-Regular',
  },
  txtBotao: {
    fontFamily: 'AveriaLibre-Regular',
    fontSize: 14,
    color: '#FFFFFF',
  },

  botaoCriarFundo: {
    height: 35,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#419ED7',
    marginBottom: 4,
    elevation: 10
  },

  botaoCriarText: {
    fontFamily: 'AveriaLibre-Regular',
    fontSize: 14,
    color: '#FFFFFF',
  },

  botaoSenha: {
    height: 35,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B5C7D1',
    elevation: 10
  },
});

export default Login;
