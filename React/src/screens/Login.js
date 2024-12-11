import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth_module } from '../firebase/config';
import { useDispatch } from 'react-redux'; //para disparar açoes do redux
import { reducerSetLogin } from '../../redux/loginSlice'; //ação que será disparada

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const verificaEmail = (texto) => {
    setEmail(texto);
    const emailRegex = /^(?!.*\.\{2\})[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (texto === '' || emailRegex.test(texto)) {
      setErroEmail('');
    } else {
      setErroEmail('E-mail inválido');
    }
  };

  const entrar = async () => {
    try {
      //autenticar usuário no Firebase
      setLoading(true);
      const UserCredential = await signInWithEmailAndPassword(auth_module, email, password);

      //recuperar o uid do usuario que efetuou o login
      const userID = UserCredential.user.uid;

      //ação que será disparada no reducer de login para armazenar na store os estados atuais dos dados de login
      dispatch(reducerSetLogin({ email: email, userID: userID }));

      //limpar erro email
      setErroEmail('');

      //navegar para home
      navigation.navigate('DrawerNavigator'); //Home está contida no drawer
    }
    catch (error) {
      console.log('Falha ao autenticar usuário: ' + JSON.stringify(error));
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/invalid-email') {
        setErroEmail('E-mail e/ou senha inválidos');
      } else if (error.code === 'auth/too-many-requests') {
        setErroEmail('Muitas tentativas falhas. Aguarde alguns minutos antes de tentar novamente.');
      } else if (error.code === 'auth/missing-password') {
        setErroEmail('É necessário informar a senha.');
      } else {
        setErroEmail('Erro ao fazer login.');
      }
    }
    finally {
      setLoading(false);
    }
  };

  const goToNovaConta = () => {
    navigation.navigate('NovaConta');
  };

  const goToRecuperarSenha = () => {
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
            secureTextEntry
          />
          <Text style={estilos.txtErro}>{erroEmail}</Text>
        </View>

        {loading ? (
          <TouchableOpacity style={estilos.botaoFundo}>
            <Text style={estilos.txtBotao}>Autenticando...</Text>
            <ActivityIndicator style={estilos.loadingIndicator} size={'small'} color={'white'} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={estilos.botaoFundo} onPress={entrar}>
            <Text style={estilos.txtBotao}>Entrar</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[estilos.botaoCriarFundo, { marginTop: 15 }]}
          onPress={goToNovaConta}>
          <Text style={estilos.txtBotao}>Criar minha conta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.botaoSenha}
          onPress={goToRecuperarSenha}>
          <Text style={estilos.txtBotao}>Esqueci minha senha</Text>
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
    marginTop: 2,
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
    color: '#FFFFFF',
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
    height: 33,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#49B976',
    elevation: 10,
    marginTop: -5,
  },
  txtErro: {
    color: '#FD7979',
    marginTop: '2%',
    fontSize: 16,
    fontFamily: 'AveriaLibre-Regular',
    marginBottom: 3,
  },
  txtBotao: {
    fontFamily: 'AveriaLibre-Regular',
    fontSize: 20,
    color: '#FFFFFF',
  },

  botaoCriarFundo: {
    height: 33,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#419ED7',
    marginBottom: 4,
    elevation: 10,
  },

  botaoSenha: {
    height: 33,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B5C7D1',
    elevation: 10,
    marginTop: 3,
    marginBottom: 10,
  },
  loadingIndicator: {
    position: 'absolute',
    right: 200,
  },
});

export default Login;
