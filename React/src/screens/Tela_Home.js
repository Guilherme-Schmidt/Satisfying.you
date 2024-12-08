/* eslint-disable react-native/no-inline-styles */
import { View, StyleSheet, Text, TextInput, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CardProjeto from '../components/CardPesquisa';
import BotaoPesquisa from '../components/BotaoPesquisa';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

const Tela_Home = () => {
  const navigation = useNavigation();
  const [textPesquisa, setTextoPesquisa] = useState('');
  const [listaPesquisas, setListaPesquisas] = useState([]); //será uma lista de objetos de pesquisa

  //Pesquisas associadas ao usuário autenticado atual
  const auth = getAuth();
  const userID = auth.currentUser.uid;
  const pesquisas_SubCollection = collection(db, 'usuarios', userID, 'pesquisas');

  //assim que a tela home for aberta executa a função useEffect que contém a função para recuperar os dados do Firestore
  useEffect(() => {
    const consultaPesquisas = query(
      pesquisas_SubCollection,
      orderBy('timestamp', 'desc') //pesquisas mais novas aparecerão primeiro 
    );
    //Função que executa a consulta
    const unsubscribe = onSnapshot(consultaPesquisas, (snapshot) => {
      const pesquisas = [];
      snapshot.forEach((doc) => {
        pesquisas.push({
          id: doc.id, //id do documento do firebase
          ...doc.data() //restante dos atributos do documento
        })
      })
      //setar o state que armazenará as pesquisas
      setListaPesquisas(pesquisas);
    })
  }, []) // [] para o useEffect ser excutado somente uma única vez nessa tela


  const goToNovaPesquisa = () => {
    navigation.navigate('NewSearch');
  };

  //recebe titulo como argumento e passá-lo ao navegar
  const goToAcoesPesquisa = (txtTitulo) => {
    navigation.navigate('AcoesPesquisa', { titulo: txtTitulo }); // Navega para a tela AcoesPesquisa e passa o objeto titulo como um parâmetro, para o titulo do header mudar  de acordo com a pesquisa pressionada
  };

  //Componente para ser usado no renderItem da FlatList
  const itemCard = ({ item }) => (
    <CardProjeto
      id={item.id}
      imagem={item.imagem}
      titulo={item.Nome}
      data={item.data}
      onPress={() => goToAcoesPesquisa(item.titulo)}
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

      {/* Cards */}

      {listaPesquisas.length === 0 ? (
        <Text style={styles.msgListaVazia}>Não há pesquisas cadastradas</Text>
      ) : (
        <FlatList
          horizontal
          data={listaPesquisas}
          renderItem={itemCard}
          contentContainerStyle={styles.flatList}
          keyExtractor={(pesquisa) => pesquisa.id}
        />
      )}

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

  }
});

export default Tela_Home;
