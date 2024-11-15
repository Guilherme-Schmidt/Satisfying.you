import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'; // Importar o hook useNavigation

const FaceButton = ({ nomeIcone, corIcone, textoIcone, onPress }) => {
  const navigation = useNavigation();

  const goToAgradecimento = () =>{
    navigation.navigate('Agradecimento');
  }

  return (
    <TouchableOpacity onPress={goToAgradecimento} style={styles.faceButton}>
      <Icon name={nomeIcone} size={50} color={corIcone} />
      <Text style={styles.faceText}>{textoIcone}</Text>
    </TouchableOpacity>
  );
};

const Coleta = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.tela}>
      <View style={styles.cabecalho}>
        <Text style={styles.questionText}>O que você achou do Carnaval 2024?</Text>
      </View>

      <View style={styles.buttonContainer}>
        <FaceButton nomeIcone="sentiment-very-dissatisfied" corIcone="#D71616" textoIcone="Péssimo" />
        <FaceButton nomeIcone="sentiment-dissatisfied" corIcone="#FF360A" textoIcone="Ruim" />
        <FaceButton nomeIcone="sentiment-neutral" corIcone="#FFC632" textoIcone="Neutro" />
        <FaceButton nomeIcone="sentiment-satisfied-alt" corIcone="#37BD6D" textoIcone="Bom" />
        <FaceButton nomeIcone="sentiment-very-satisfied" corIcone="#25BC22" textoIcone="Excelente" />
      </View>

      {/* Botão de Voltar */}
      <TouchableOpacity style={styles.voltarButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="#fff" />
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
    fontFamily: 'AveriaLibre-Bold', // Certifique-se de que a fonte está disponível
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
    top: 30,
    right: 20,
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 30,
    zIndex: 1, // Garante que o botão fique sobre os outros elementos
  },
});

export default Coleta;
