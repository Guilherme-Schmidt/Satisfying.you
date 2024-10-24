import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const NewSearch = () => {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [image, setImage] = useState(null);

  return (
    <View style={estilo.tela}>
      <View style={estilo.cabecalho}>
        <TouchableOpacity>
          <Image source={require('./assets/images/flecha_voltar.png')} />
        </TouchableOpacity>
        <Text style={estilo.txtcabecalho}>Nova Pesquisa</Text>
      </View>

      <View style={estilo.corpo}>
        <Text style={estilo.txtCorpo}>Nome</Text>
        <TextInput
          style={estilo.txtEntrada}
          value={nome}
          onChangeText={setNome}
          placeholder=""
          placeholderTextColor="#fff"
        />
        <Text style={estilo.errorText}>Preencha no nome da pesquisa</Text>

        <Text style={estilo.txtCorpo}>Data</Text>
        <View style={estilo.dateContainer}>
          <TextInput
            style={estilo.txtEntradaData}
            value={data}
            onChangeText={setData}
            placeholder=""
            placeholderTextColor="#fff"
          />

          <TouchableOpacity>
            <MaterialIcons name="calendar-today" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={estilo.errorText}>Preencha a data</Text>

        <Text style={estilo.txtCorpo}>Imagem</Text>
        <View style={estilo.imageContainer}>
          <Text style={estilo.imageText}>Câmera/Galeria de imagens</Text>
        </View>

        <TouchableOpacity style={estilo.botao}>
          <Text style={estilo.txtBotao}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const estilo = StyleSheet.create({
    tela: {
      flex: 1,
      backgroundColor: '#372775',
      alignItems: 'center', // Centraliza horizontalmente
    },
    cabecalho: {
        backgroundColor: '#2B1D62',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 1, 
        width: '100%',
      },
    txtcabecalho: {
      color: '#FFFFFF',
      fontFamily: 'Averia Libre',
      fontSize: 28,
      marginLeft: 10,
    },
    corpo: {
      paddingHorizontal: 20,
      paddingTop: 10,
      width: '90%',
    },
    errorText: {
      color: '#ff4d4d',
      fontSize: 12,
      marginBottom: 15,
    },
    txtCorpo: {
      fontSize: 16,
      fontFamily: 'Averia Libre',
      color: '#FFFFFF',
      marginBottom: 5,
      textAlign: 'left', 
    },
    txtEntrada: {
      fontSize: 14, // Mantido
      fontFamily: 'Averia Libre',
      backgroundColor: '#FFFFFF',
      padding: 5, 
      marginBottom: 15,
      borderRadius: 5,
      width: '100%', 
    },
    txtEntradaData: {
      fontSize: 14, 
      fontFamily: 'Averia Libre',
      backgroundColor: '#FFFFFF',
      padding: 5, // Mantido
      borderRadius: 5,
      flex: 1,
      width: '80%', 
    },
    dateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
      width: '100%', 
    },
    imageContainer: {
      backgroundColor: '#FFFFFF',
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
      borderRadius: 5,
      width: '100%', 
    },
    imageText: {
      color: '#999',
      fontSize: 14,
    },
    botao: {
      backgroundColor: '#37BD6D',
      padding: 8,
      marginTop: 5,
      borderRadius: 5,
      width: '100%', // Faz o botão ocupar a largura total
    },
    txtBotao: {
      fontSize: 20,
      fontFamily: 'Averia Libre',
      color: '#FFFFFF',
      textAlign: 'center',
    },
  });
  
export default NewSearch;
