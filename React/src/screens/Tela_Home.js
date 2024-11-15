/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { View, StyleSheet, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CardProjeto from '../components/CardProjeto';
import BotaoPesquisa from '../components/BotaoPesquisa';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 25,
    backgroundColor: '#372775',
  },
  barraPesquisaContainer: {
    position: 'absolute', // Fixa a posição no topo da tela
    top: 20, // Ajusta a distância do topo da tela
    left: 25, // Alinha à esquerda
    right: 25, // Alinha à direita
    backgroundColor: 'white',
    height: 40, 
    borderRadius: 5,
    justifyContent: 'center',
   
  },
  icon: {
    position: 'absolute',
    left: 10,
    top: 9,
  },
  textInput: {
    height: '100%',
    paddingLeft: 40,
    fontSize: 14,
    color: 'black',
    fontFamily: 'AveriaLibre-Regular',
  },
});

const Tela_Home = () => {
  const navigation = useNavigation();

  const goToNovaPesquisa = () => {
    navigation.navigate('NewSearch');
  };

  const goToAcoesPesquisa = () => {
    navigation.navigate('AcoesPesquisa'); // Navega para a tela AcoesPesquisa
  };

  const [textPesquisa, setTextoPesquisa] = useState('');

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.main}>
        {/* Barra de pesquisa */}
        <View style={styles.barraPesquisaContainer}>
          <Icon name="magnify" size={24} color="#888" style={styles.icon} />
          <TextInput
            placeholder="Insira o termo de busca..."
            placeholderTextColor="black"
            value={textPesquisa}
            onChangeText={setTextoPesquisa}
            style={styles.textInput}
          />
        </View>

        {/* Projetos de extensão */}
        <ScrollView horizontal contentContainerStyle={{ alignItems: 'center', marginTop: 60, marginBottom: 25}}>
          <CardProjeto
            titulo="MENINAS CPU"
            data="12/12/2023"
            onPress={goToAcoesPesquisa}
          />
          <CardProjeto
            titulo="MENINAS CPU"
            data="12/12/2023"
            onPress={goToAcoesPesquisa}
          />
           <CardProjeto
            titulo="MENINAS CPU"
            data="12/12/2023"
            onPress={goToAcoesPesquisa}
          />
           <CardProjeto
            titulo="MENINAS CPU"
            data="12/12/2023"
            onPress={goToAcoesPesquisa}
          />
        
        </ScrollView>

        {/* Nova Pesquisa */}
        <View>
          <BotaoPesquisa texto="NOVA PESQUISA" onPress={goToNovaPesquisa} />
        </View>
      </View>
    </View>
  );
};

export default Tela_Home;
