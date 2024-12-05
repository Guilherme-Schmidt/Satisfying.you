import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  Image
} from 'react-native';
import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

const NewSearch = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [Erronome, setErroNome] = useState('');
  const [Errodata, setErroData] = useState('');
  const [imagem, setImagem] = useState('');//será uma string em base64

  //Redimensionamento do tamanho da imagem e conversão para base 64
  const converteUriToBase64 = async (uri) => {

    const resizedImage = await ImageResizer.createResizedImage(
      uri, // URI da imagem original
      200,  // Largura
      200,  // Altura
      'JPEG', // Formato (JPEG ou PNG)
      100  // Qualidade (0-100)
    );

    const imageUri = await fetch(resizedImage.uri);
    const imageBlob = await imageUri.blob();
    console.log(imageBlob);

    const reader = new FileReader();

    //Quando a leitura estiver completa, atribui o resultado a setImagem
    reader.onloadend = () => {
      setImagem(reader.result);
    };
    reader.readAsDataURL(imageBlob); //Converte Blob para Base64
  };

  //escolher imagem na galeria
  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (result) => {
      //Verificar se uma imagem foi selecionada
      if (result.assets && result.assets.length > 0) {
        console.log(result.assets[0].uri); //uri da imagem selecionada
        converteUriToBase64(result.assets[0].uri); //converte a imagem selecionada para base64
      }
    });
  };

  const addPesquisa = () => {

    const auth = getAuth();
    const userID = auth.currentUser.uid; //obtém o uid do usuário autenticado atual
    const pesquisas_SubCollection = collection(db, 'usuarios', userID, 'pesquisas'); //referência p/ subcoleção pesquisas do respectivo usuário autenticado (usando userID)

    if (!userID) {
      alert('Usuário não autenticado');
      return;
    }

    const docPesquisa = {
      Nome: nome,
      data: data,
      imagem: imagem,
      excelente: 0,
      bom: 0,
      neutro: 0,
      ruim: 0,
      pessimo: 0,
    }

    addDoc(pesquisas_SubCollection, docPesquisa)
      .then((docRef) => {
        console.log("Novo documento inserido com sucesso: " + docRef.id); //id do documento de pesquisa adicionado à subcoleção pesquisas
      })
      .catch((error) => {
        console.log("Erro: " + error);
      })
  }

  const verificaNome = (texto) => {
    setNome(texto);
    if (texto === '') {
      setErroNome('Preencha o nome da pesquisa');
    }
    else {
      setErroNome('');
    }
  }

  const verificaData = (texto) => {
    setData(texto);
    if (texto === '') {
      setErroData('Preencha a data');
    }
    else {
      setErroData('');
    }
  }

  const cadastrarPesquisa = () => {
    if (nome === '' || data === '' || imagem === '') {
      alert('Todos os campos devem ser preenchidos.');
      return; //encerra função
    }
    else if (Erronome === '' && Errodata === '') {
      //cadastrar no firestore
      addPesquisa();
      navigation.goBack(); //Volta para Home(Drawer) e desimpilha esta tela
    }
  }

  return (
    <View style={estilo.tela}>

      <View style={estilo.corpo}>
        <Text style={estilo.txtCorpo}>Nome</Text>
        <TextInput
          style={estilo.txtEntrada}
          value={nome}
          onChangeText={verificaNome}
        />
        <Text style={estilo.errorText}>{Erronome}</Text>

        <Text style={estilo.txtCorpo}>Data</Text>
        <View style={estilo.dateContainer}>
          <TextInput
            style={estilo.txtEntradaData}
            value={data}
            onChangeText={verificaData}
            placeholder=""
            placeholderTextColor="#3F92C5"
          />
          <MaterialIcons name="calendar-today" size={24} color="#3F92C5" style={estilo.iconeCalendario} />
        </View>
        <Text style={estilo.errorText}>{Errodata}</Text>

        <Text style={estilo.txtCorpo}>Imagem</Text>
        <TouchableOpacity style={estilo.imagemContainer} onPress={pickImage}>
          {imagem ? (
            <Image source={{ uri: imagem }} style={estilo.imagem} />
          ) : (
            <Text style={estilo.imagemText}>Câmera/Galeria de imagens</Text>
          )}

        </TouchableOpacity>

        <View style={estilo.botoesContainer}>
          <TouchableOpacity style={estilo.botaoCadastrar} onPress={cadastrarPesquisa}>
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
    justifyContent: 'center'
  },

  corpo: {
    paddingHorizontal: 20,
    marginTop: 4,
    width: '70%',
  },
  errorText: {
    color: '#ff4d4d',
    fontSize: 13,
    marginBottom: 1,
    fontFamily: 'AveriaLibre-Regular'
  },
  txtCorpo: {
    fontSize: 16,
    fontFamily: 'AveriaLibre-Regular',
    color: '#FFFFFF',
  },

  txtEntrada: {
    fontSize: 16,
    fontFamily: 'AveriaLibre-Regular',
    backgroundColor: '#FFFFFF',
    color: '#3F92C5',
    padding: 3,
    marginBottom: 2,
    width: '100%',
  },
  txtEntradaData: {
    fontSize: 16,
    fontFamily: 'AveriaLibre-Regular',
    backgroundColor: '#FFFFFF',
    color: '#3F92C5',
    padding: 3,
    paddingRight: 40, // Espaço para o ícone do calendário
    flex: 1,
  },
  dateContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  iconeCalendario: {
    position: 'absolute',
    right: 10, // Alinha o ícone à direita dentro do TextInput
  },
  imagemContainer: {
    backgroundColor: '#FFFFFF',
    height: 70,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    overflow: 'hidden',
  },
  imagemText: {
    color: '#999',
    fontSize: 14,
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  botaoCadastrar: {
    backgroundColor: '#37BD6D',
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    elevation: 10,
    marginBottom: 7
  },
  txtBotao: {
    fontSize: 18,
    fontFamily: 'AveriaLibre-Bold',
    color: '#FFFFFF'
  },

  imagem: {
    height: 100,
    width: 100,
    resizeMode: 'cover'
  }
});

export default NewSearch;
