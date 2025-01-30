import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ActivityIndicator,
  Alert
} from 'react-native';
import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { db } from '../firebase/config';
import { collection, addDoc, setDoc, doc, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const NewSearch = () => {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [Erronome, setErroNome] = useState('');
  const [Errodata, setErroData] = useState('');
  const [imagem, setImagem] = useState('');//será uma string em base64
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const verificaNome = (texto) => {
    setNome(texto);
    if (texto === '') {
      setErroNome('Preencha o nome da pesquisa');
    }
    else {
      setErroNome('');
    }
  };

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

  //Calendário
  const onChangeDate = (event, selectedDate) => {
    if (event.type === 'set' && selectedDate) {
      setShowDatePicker(false);  // Fecha o DateTimePicker após a seleção
      const formattedDate = format(selectedDate, 'dd/MM/yyyy', { locale: ptBR });
      setData(formattedDate);
      setErroData('');
    }
    else if (event.type === 'dismissed') {
      setShowDatePicker(false); // Fecha o DateTimePicker se o usuário cancelar
      if (data === '') {
        setErroData('Preencha a data');
      }
    }
  };

  const userEmail = useSelector((state) => state.login.email); //acessar o estado atual do email armazenado na store
  const userID = useSelector((state) => state.login.userID)  //acessar o estado atual do userID armazenado na store

  //Adicionar pesquisa no firestore
  const addPesquisa = async () => {

    //referência p/ subcoleçao pesquisas que estará associada a um userID específico
    const pesquisas_SubCollection = collection(db, 'usuarios', userID, 'pesquisas'); 

    //Verificar se já existe uma pesquisa de mesmo nome (definição da consulta)
    const q = query(pesquisas_SubCollection, where('nome', '==', nome.toUpperCase().trim()));

    try {
      const querySnapshot = await getDocs(q); //getDocs() executa a consulta

      //caso já exista uma pesquisa de mesmo nome
      if (querySnapshot.empty === false) {
        Alert.alert('Erro de Cadastro', 'Pesquisa não adicionada, pois já existe uma pesquisa com esse nome.')
        return;
      }

      //caso não exista, prosseguir com o cadastro
      const docPesquisa = {
        nome: nome.toUpperCase().trim(),
        data: data,
        imagem: imagem,
        excelente: 0,
        bom: 0,
        neutro: 0,
        ruim: 0,
        pessimo: 0,
        timestamp: new Date().getTime(), // Adiciona o timestamp como base para ordenação
      };
      //Adicionar documentos de pesquisa à subcoleção pesquisas
      const docRef = await addDoc(pesquisas_SubCollection, docPesquisa);
      console.log("Novo documento de pesquisa inserido com sucesso (ID): " + docRef.id); //id do documento de pesquisa adicionado à subcoleção pesquisas

      //Adicionar campo email ao documento de usuário
      await setDoc(doc(db, 'usuarios', userID), {
        Email: userEmail
      });
      //console.log("Adição do campo Email no documento de usuário feita com sucesso");
    }
    catch (error) {
      console.log("Erro ao adicionar pesquisa: " + error);
    }
    finally{
      setLoading(false);
    }
  };

  const cadastrarPesquisa = async () => {
    if (nome === '' || data === '' || imagem === '') {
      Alert.alert('Erro de Cadastro', 'Todos os campos devem ser preenchidos.');
      return; //encerra função
    }
    else if (Erronome === '' && Errodata === '') {
      //cadastrar no firestore
      setLoading(true);// Ativa o indicador de carregamento
      await addPesquisa();
      navigation.goBack(); //Volta para Home(Drawer) e desimpilha esta tela
    }
  };

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
            onFocus={() => {
              if (!showDatePicker) {
                setShowDatePicker(true); // Apenas abre o calendário se não estiver visível
              }
            }}
            showSoftInputOnFocus={false} // Desabilita o teclado
          />
          <TouchableOpacity style={estilo.iconeCalendario} onPress={() => setShowDatePicker(true)}>
            <MaterialIcons name="calendar-today" size={24} color="#3F92C5" />
          </TouchableOpacity>
        </View>
        {/*renderização condicional do calendario */}
        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display='default'
            onChange={onChangeDate}
            locale="pt-BR" //define a localização para português do Brasil
          />
        )}
        <Text style={estilo.errorText}>{Errodata}</Text>

        <Text style={estilo.txtCorpo}>Imagem</Text>
        <TouchableOpacity style={estilo.imagemContainer} onPress={pickImage}>
          {/*renderização condicional, conteúdo do TouchableOpacity */}
          {imagem ? (
            <Image source={{ uri: imagem }} style={estilo.imagem} />
          ) : (
            <Text style={estilo.imagemText}>Câmera/Galeria de imagens</Text>
          )}
        </TouchableOpacity>

        <View style={estilo.botoesContainer}>
          {loading ? (
            <TouchableOpacity style={estilo.botaoCadastrar}>
              <Text style={estilo.txtBotao}>CADASTRANDO...</Text>
              <ActivityIndicator style={estilo.loadingIndicator} size={'small'} color={'white'} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={estilo.botaoCadastrar} onPress={cadastrarPesquisa}>
              <Text style={estilo.txtBotao}>CADASTRAR</Text>
            </TouchableOpacity>
          )}
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
    justifyContent: 'center',
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
    fontFamily: 'AveriaLibre-Regular',
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
    marginBottom: 7,
  },
  txtBotao: {
    fontSize: 18,
    fontFamily: 'AveriaLibre-Bold',
    color: '#FFFFFF',
  },
  imagem: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
  },
  loadingIndicator: {
    position: 'absolute',
    right: 135,
  }

});

export default NewSearch;