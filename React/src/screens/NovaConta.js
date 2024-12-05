import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth_module } from '../firebase/config';

const NovaConta = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaTemp, setSenhaTemp] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const navigation = useNavigation();


  const verificaSenha = (texto) => {
    setSenhaTemp(texto);
    if (texto === '' || texto === senha) {
      setErroSenha('');
    } else {
      setErroSenha('O campo repetir senha difere da senha');
    }
  };

  const validarCadastro = () => {
    // Verificar se os campos estão preenchidos ()
    if (email === '' || senha === '' || senhaTemp === '') {
      alert('Todos os campos devem ser preenchidos.');
      return; //encerra função
    }
    // Verificar se as senhas coincidem
    if (senha !== senhaTemp) {
      setErroSenha('O campo repetir senha difere da senha');
      setErroEmail(''); //limpa erro de email
      return;
    }
    else {
      setErroSenha('');
    }

    //realizar cadastro no Firebase
    createUserWithEmailAndPassword(auth_module, email, senha)
      .then((UserCredential) => {
        console.log('Usuário criado com sucesso: ' + JSON.stringify(UserCredential));
        navigation.goBack(); //volta para login e desimpilha esta tela
      })
      .catch((error) => {
        console.log('erro: ' + JSON.stringify(error));
        if (error.code === 'auth/invalid-email') {
          setErroEmail('E-mail inválido');
        }
        else if (error.code === 'auth/email-already-in-use') {
          setErroEmail('Já existe um usuário cadastrado com esse e-mail!');
        }
        else if (error.code === 'auth/weak-password') {
          setErroSenha('A senha deve conter no mínimo 6 caracteres!');
          setErroEmail('');//limpar erro de email
        }
        else {
          alert('Erro ao criar conta.');
        }
      });

  };




  return (
    <View style={estilo.tela}>

      <View style={estilo.corpo}>
        <Text style={estilo.txtCorpo}>E-mail</Text>
        <TextInput
          style={estilo.txtEntrada}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Text style={estilo.txtErro}>{erroEmail}</Text>

        <Text style={estilo.txtCorpo}>Senha</Text>
        <TextInput
          style={[estilo.txtEntrada, estilo.espacamentoSenha]}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={true}
        />

        <Text style={estilo.txtCorpo}>Repetir senha</Text>
        <TextInput
          style={estilo.txtEntrada}
          value={senhaTemp}
          onChangeText={verificaSenha}
          secureTextEntry={true}
        />
        <Text style={estilo.txtErro}>{erroSenha}</Text>

      </View>

      <TouchableOpacity style={estilo.botao} onPress={validarCadastro}>
        <Text style={estilo.txtBotao}>CADASTRAR</Text>
      </TouchableOpacity>

    </View>
  );
};

const estilo = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#372775',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  corpo: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '70%',
  },

  txtCorpo: {
    fontSize: 14,
    fontFamily: 'AveriaLibre-Regular',
    color: '#FFFFFF',
  },

  txtEntrada: {
    fontSize: 14,
    padding: 5,
    fontFamily: 'AveriaLibre-Regular',
    backgroundColor: '#FFFFFF',
    color: '#3F92C5',
    height: 35,
  },

  espacamentoSenha: {
    marginBottom: 20,
  },

  txtErro: {
    color: '#FD7979',
    fontFamily: 'AveriaLibre-Regular',
    marginTop: 2,

  },

  botao: {
    backgroundColor: '#37BD6D',
    width: '70%',
    padding: 5,
    marginTop: 10,
    elevation: 10,
  },

  txtBotao: {
    fontSize: 20,
    fontFamily: 'AveriaLibre-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default NovaConta;
