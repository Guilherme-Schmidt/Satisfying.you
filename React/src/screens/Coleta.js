import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'; // Importar o hook useNavigation
import { db } from '../firebase/config';
import { doc, increment, updateDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';

//componente facebutton
const FaceButton = ({ nomeIcone, corIcone, textoIcone, votoCampo }) => {

  const navigation = useNavigation();

  //Acessar dados de usuario e de pesquisa da store (ids)
  const userID = useSelector((state) => state.login.userID);
  const pesquisaID = useSelector((state) => state.pesquisa.pesquisaID)

  const goToAgradecimento = async () => {

    navigation.navigate('Agradecimento');

    //contabilizar voto no Fisrestore (atualização de documento)
    try {
      const PesquisaID_Ref = doc(db, 'usuarios', userID, 'pesquisas', pesquisaID);
      await updateDoc(PesquisaID_Ref, {
        [votoCampo]: increment(1) //define o nome do campo de forma dinamica e incrementa seu valor em 1 
      });
      console.log(`Voto registrado em ${votoCampo}`);
    }
    catch (error) {
      console.log('Erro ao registar voto');
    }
  };

  return (
    <TouchableOpacity onPress={goToAgradecimento} style={styles.faceButton}>
      <Icon name={nomeIcone} size={50} color={corIcone} />
      <Text style={styles.faceText}>{textoIcone}</Text>
    </TouchableOpacity>
  );
};

const Coleta = () => {
  const navigation = useNavigation();

  //acessar o nome da pesquisa selecionada através da store
  const nomePesquisa = useSelector((state) => state.pesquisa.nome);
  //pegar o ano atual da pesquisa
  const date = new Date();

  return (
    <View style={styles.tela}>
      <View style={styles.cabecalho}>
        <Text style={styles.questionText}>O que você achou do {nomePesquisa} {date.getFullYear()}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <FaceButton nomeIcone="sentiment-very-dissatisfied" corIcone="#D71616" textoIcone="Péssimo" votoCampo="pessimo" />
        <FaceButton nomeIcone="sentiment-dissatisfied" corIcone="#FF360A" textoIcone="Ruim" votoCampo="ruim" />
        <FaceButton nomeIcone="sentiment-neutral" corIcone="#FFC632" textoIcone="Neutro" votoCampo="neutro" />
        <FaceButton nomeIcone="sentiment-satisfied-alt" corIcone="#37BD6D" textoIcone="Bom" votoCampo="bom" />
        <FaceButton nomeIcone="sentiment-very-satisfied" corIcone="#25BC22" textoIcone="Excelente" votoCampo="excelente" />
      </View>

      {/* Botão de Voltar escondido */}
      <TouchableOpacity style={styles.voltarButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={45} color="#372775" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#372775',
    alignItems: 'center',
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centraliza na horizontal
    padding: 15,
    width: '100%',
  },
  questionText: {
    fontSize: 30,
    color: 'white',
    fontFamily: 'AveriaLibre-Bold',
    marginTop: 50,
    marginBottom: 60, // Dá uma margem para garantir que o título fique no topo
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Distribui os botões de maneira equilibrada
    alignItems: 'center',
    width: '100%',
  },
  faceButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceText: {
    color: 'white',
    marginTop: 5,
    fontSize: 24,
  },
  voltarButton: {
    position: 'absolute',
    top: 3,
    right: 10,
    padding: 10,
    borderRadius: 30,
    zIndex: 1, // Garante que o botão fique sobre os outros elementos
  },
});

export default Coleta;
