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

const ModifySearch = () => {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('16/02/2024');
  const [image, setImage] = useState(null);

  return (
    <View style={estilo.tela}>
      <View style={estilo.cabecalho}>
        <TouchableOpacity>
          <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={estilo.txtcabecalho}>Modificar pesquisa</Text>
      </View>

      <View style={estilo.corpo}>
        <Text style={estilo.txtCorpo}>Nome</Text>
        <TextInput
          style={estilo.txtEntrada}
          value={nome}
          onChangeText={setNome}
          placeholder="Carnaval 2024"
          placeholderTextColor="#3F92C5"
        />
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
        <Text style={estilo.txtCorpo}>Imagem</Text>
        <View style={estilo.imageContainer}>
          <Text style={estilo.imageText}>Câmera/Galeria de imagens</Text>
        </View>

        <TouchableOpacity style={estilo.botaoSalvar}>
          <Text style={estilo.txtBotao}>SALVAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={estilo.botaoApagar}>
          <MaterialIcons name="delete" size={24} color="#FFFFFF" />
          <Text style={estilo.txtApagar}>Apagar</Text>
        </TouchableOpacity>
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
    fontFamily: 'AveriaLibre',
    fontSize: 24,
    marginLeft: 10,
  },
  corpo: {
    paddingHorizontal: 20,
    paddingTop: 10,
    width: '90%',
  },
  txtCorpo: {
    fontSize: 16,
    fontFamily: 'Averia Libre',
    color: '#FFFFFF',
    marginBottom: 5,
    textAlign: 'left',
  },
  txtEntrada: {
    fontSize: 14,
    fontFamily: 'Averia Libre',
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    width: '100%',
  },
  txtEntradaData: {
    fontSize: 14,
    fontFamily: 'Averia Libre',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  imageContainer: {
    backgroundColor: '#FFFFFF',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 5,
  },
  imageText: {
    color: '#999',
    fontSize: 14,
  },
  botaoSalvar: {
    backgroundColor: '#37BD6D',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBotao: {
    fontSize: 18,
    fontFamily: 'Averia Libre',
    color: '#FFFFFF',
  },
  botaoApagar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  txtApagar: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 5,
  },
});

export default ModifySearch;
