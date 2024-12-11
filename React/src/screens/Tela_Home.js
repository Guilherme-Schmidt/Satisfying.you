/* eslint-disable react-native/no-inline-styles */
import { View, StyleSheet, Text, TextInput, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CardPesquisa from '../components/CardPesquisa';
import BotaoPesquisa from '../components/BotaoPesquisa';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { reducerSetPesquisa } from '../../redux/pesquisaSlice';

const Tela_Home = () => {
  const navigation = useNavigation();
  const [textPesquisa, setTextoPesquisa] = useState('');
  const [listaPesquisas, setListaPesquisas] = useState([]); //será uma lista de objetos de pesquisa
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  //acessar o estado atual do userID armazenado na store
  const userID = useSelector((state) => state.login.userID)

  //Pesquisas associadas ao usuário autenticado atual 
  const pesquisasRef = collection(db, 'usuarios', userID, 'pesquisas'); //referência à sub-coleção pesquisas de um usuário específico

  //assim que a tela home for aberta, executa a função useEffect que contém a função para recuperar os dados do Firestore
  useEffect(() => {

    //definição da consulta
    const consultaPesquisas = query(
      pesquisasRef,
      orderBy('timestamp', 'desc') //para as pesquisas mais novas aparecerem primeiro 
    );

    //Função que executa a consulta (onSnapshot é executado sempre que houver alteração na coleção consultada)
    const unsubscribe = onSnapshot(consultaPesquisas, (snapshot) => {
      const pesquisas = [];
      snapshot.forEach((doc) => {
        pesquisas.push({
          id: doc.id, //id do documento no firestore
          ...doc.data() //restante dos dados do documento
        })
      })
      //setar o state que armazenará as pesquisas
      setListaPesquisas(pesquisas);
      //desabilitar o  ActivityIndicator
      setLoading(false);
    })
  }, []) // [] para o useEffect ser excutado somente uma única vez nessa tela


  const goToNovaPesquisa = () => {
    navigation.navigate('NewSearch');
  };

  //capturar os dados da pesquisa selecionada e navegar para AcoesPesquisa
  const goToAcoesPesquisa = (pesquisaID, nome, data, imagem) => {
    //ação que será disparada no reducer de pesquisa para armazenar na store os estados atuais dos dados da pesquisa
    dispatch(reducerSetPesquisa({ pesquisaID: pesquisaID, nome: nome, data: data, imagem: imagem }));
    //navegar para AcoesPesquisa
    navigation.navigate('AcoesPesquisa');
    console.log(pesquisaID)
  };

  //Componente para ser usado no renderItem da FlatList
  const itemCard = ({ item }) => ( //item. -> acessa os campos do documento de pesquisa cadastrado no Firestore
    <CardPesquisa
      imagem={item.imagem}
      titulo={item.nome}
      data={item.data}
      onPress={() => goToAcoesPesquisa(item.id, item.nome, item.data, item.imagem)} // item.id é o id do documento de pesquisa no Firestore
    />
  );

  return (
    <View style={styles.main}>
      {/* Barra de pesquisa */}
      <View style={styles.barraPesquisaContainer}>
        <Icon name="magnify" size={24} color="#888" />
        <TextInput
          placeholder="Insira o termo de busca..."
          placeholderTextColor="black"
          value={textPesquisa}
          onChangeText={setTextoPesquisa}
          style={styles.textInput}
        />
      </View>

      {/* renderização condicional dos cards */}
      {loading ? (
        <ActivityIndicator style={styles.loadingIndicator} size={'large'} color={'white'} />
      ) : listaPesquisas.length === 0 ? (
        <Text style={styles.msgListaVazia}>Não há pesquisas cadastradas</Text>
      ) : (
        <FlatList
          horizontal
          data={listaPesquisas}
          renderItem={itemCard}
          contentContainerStyle={styles.flatList}
          keyExtractor={(pesquisa) => pesquisa.id}
        />
      )
    }
      
      {/* Nova Pesquisa */}
      <View>
        <BotaoPesquisa texto="NOVA PESQUISA" onPress={goToNovaPesquisa} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 10,
    backgroundColor: '#372775',
  },
  barraPesquisaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  textInput: {
    flex: 1, //ocupar todo o espaço restante da barra de pesquisa
    fontSize: 14,
    color: 'black',
    fontFamily: 'AveriaLibre-Regular',
  },
  flatList: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 25,
  },
  msgListaVazia: {
    flex: 1,
    alignSelf: 'center',
    color: '#FFFFFF',
    fontFamily: 'AveriaLibre-Regular',
    fontSize: 25,
    marginTop: '7%'
  },
  loadingIndicator: {
    flex: 1
  },
});

export default Tela_Home;
