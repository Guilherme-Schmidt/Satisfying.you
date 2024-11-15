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

const NewSearch = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [image, setImage] = useState(null);
  
  const goToHome = () =>{
    navigation.navigate('Tela_Home');
  };


  return (
    <View style={estilo.tela}>
      <View style={estilo.cabecalho}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#7A4BCE" />
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
        <Text style={estilo.errorText}>Preencha o nome da pesquisa</Text>

        <Text style={estilo.txtCorpo}>Data</Text>
        <View style={estilo.dateContainer}>
          <TextInput
            style={estilo.txtEntradaData}
            value={data}
            onChangeText={setData}
            placeholder=""
            placeholderTextColor="#3F92C5"
          />
          <MaterialIcons name="calendar-today" size={24} color="#3F92C5" style={estilo.iconeCalendario} />
        </View>
        <Text style={estilo.errorText}>Preencha a data</Text>

        <Text style={estilo.txtCorpo}>Imagem</Text>
        <View style={estilo.imageContainer}>
          <Text style={estilo.imageText}>Câmera/Galeria de imagens</Text>
        </View>

        <View style={estilo.botoesContainer}>
          <TouchableOpacity style={estilo.botaoCadastrar} onPress={goToHome}>
            <Text style={estilo.txtBotao}>CADASTRAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const estilo = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#372775',
    alignItems: 'center',
  },
  cabecalho: {
    backgroundColor: '#2B1D62',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    width: '100%',
  },
  txtcabecalho: {
    color: '#FFFFFF',
    fontFamily: 'AveriaLibre-Bold',
    fontSize: 24,
    marginLeft: 10,
  },
  corpo: {
    paddingHorizontal: 20,
    paddingTop: 10,
    width: '70%',
  },
  errorText: {
    color: '#ff4d4d',
    fontSize: 12,
    marginBottom: 1,
  },
  txtCorpo: {
    fontSize: 16,
    fontFamily: 'AveriaLibre-Regular',
    color: '#FFFFFF',
    marginBottom: 0,
  },
  
  txtEntrada: {
    fontSize: 16,
    fontFamily: 'AveriaLibre-Regular',
    backgroundColor: '#FFFFFF',
    color: '#3F92C5',
    padding: 5,
    marginBottom: 5,
    width: '100%',
  },
  txtEntradaData: {
    fontSize: 16,
    fontFamily: 'AveriaLibre-Regular',
    backgroundColor: '#FFFFFF',
    color: '#3F92C5',
    padding: 5,
    paddingRight: 40, // Espaço para o ícone do calendário
    flex: 1,
  },
  dateContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  iconeCalendario: {
    position: 'absolute',
    right: 10, // Alinha o ícone à direita dentro do TextInput
  },
  imageContainer: {
    backgroundColor: '#FFFFFF',
    height: 60,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    overflow: 'hidden',
  },
  imageText: {
    color: '#999',
    fontSize: 14,
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  botaoCadastrar: {
    backgroundColor: '#37BD6D',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  txtBotao: {
    fontSize: 18,
    fontFamily: 'AveriaLibre-Bold',
    color: '#FFFFFF',
  },
});

export default NewSearch;
