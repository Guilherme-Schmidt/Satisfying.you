/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { View, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    height: 40,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1, //ocupar todo o espaço restante da barra de pesquisa
    fontSize: 14,
    color: 'black',
    fontFamily: 'AveriaLibre-Regular',
  },
});

const Tela_Home = () => {
  const navigation = useNavigation();
  const [textPesquisa, setTextoPesquisa] = useState('');

  const goToNovaPesquisa = () => {
    navigation.navigate('NewSearch');
  };

  //recebe titulo como argumento e passá-lo ao navegar
  const goToAcoesPesquisa = (txtTitulo) => {
    navigation.navigate('AcoesPesquisa', {titulo: txtTitulo}); // Navega para a tela AcoesPesquisa e passa o objeto titulo como um parâmetro, para o titulo do header mudar  de acordo com a pesquisa pressionada
  };

  return (
    
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
        <ScrollView horizontal contentContainerStyle={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 25}}>
          <CardProjeto
            titulo="MENINAS CPU"
            data="12/12/2023"
            onPress={() => goToAcoesPesquisa("Meninas CPU")}
          />
          <CardProjeto
            titulo="SECOMP"
            data="12/12/2023"
            onPress={() => goToAcoesPesquisa("Secomp")}
          />
          <CardProjeto
            titulo="UBUNTU"
            data="12/12/2023"
            onPress={() => goToAcoesPesquisa("Ubuntu")}
          />
          <CardProjeto
            titulo="TESTE"
            data="12/12/2023"
            onPress={() => goToAcoesPesquisa("Teste")}
          />
        </ScrollView>

        {/* Nova Pesquisa */}
        <View>
          <BotaoPesquisa texto="NOVA PESQUISA" onPress={goToNovaPesquisa} />
        </View>
      </View>
    
  );
};

export default Tela_Home;