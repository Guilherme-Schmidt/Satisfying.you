import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NovaConta = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaTemp, setSenhaTemp] = useState('');
  const [erroSenha, setErroSenha] = useState(false);
  const [erroEmail, setErroEmail] = useState(false);
  const navigation = useNavigation();
  const [image, setImage] = useState(); // Imagem padrão

  const difSenha = () => {
    if (senha !== senhaTemp) {
      setErroSenha(true);
    } else {
      setErroSenha(false);
    }
  };

  const emailPadrao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validarEmail = (email) => {
    setErroEmail(!emailPadrao.test(email));
    setEmail(email);
  };

  const validarCadastro = () => {
    validarEmail(email);
    difSenha();
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
        <Text
          style={[
            estilo.erro,
            { color: erroEmail ? '#FD7979' : '#372775' },
          ]}
        >
          Formato de e-mail inválido
        </Text>

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
          onChangeText={setSenhaTemp}
          secureTextEntry={true}
        />
        <Text
          style={[
            estilo.erro,
            { color: erroSenha ? '#FD7979' : '#372775' },
          ]}
        >
          O campo repetir senha difere da senha
        </Text>
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
    alignItems: 'center'
  },

  corpo: {
  flexDirection: 'column',
  justifyContent: 'center',
  width: '70%',

  },

  txtCorpo: {
    fontSize: 15,
    fontFamily: 'AveriaLibre-Regular',
    color: '#FFFFFF',
  
  },

  txtEntrada: {
    fontSize: 14,
    fontFamily: 'AveriaLibre-Regular',
    backgroundColor: '#FFFFFF',
    color: '#3F92C5',
    height: 35,
  },

  espacamentoSenha: {
    marginBottom: 10,
  },

  erro: {
    fontSize: 15,
    fontFamily: 'AveriaLibre-Regular',
    marginBottom: 4,
  },

  botao: {
    backgroundColor: '#37BD6D',
    width: '70%',
    padding: 5,
    marginTop: 5,
    elevation: 10
  },
  
  txtBotao: {
    fontSize: 20,
    fontFamily: 'AveriaLibre-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default NovaConta;