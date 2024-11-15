/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CardProjeto from '../components/CardProjeto';
import BotaoPesquisa from '../components/BotaoPesquisa';
import BarraDePesquisa from '../components/BarraDePesquisa';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  cabecalho: {
    backgroundColor: '#2B1D62',
    flexDirection: 'row',
    padding: 10,
  },
  main: {
    flex: 1,
    padding: 25,
  },
});

const Tela_Home = props => {
  const navigation = useNavigation();

  const goToNovaPesquisa = () => {
    navigation.navigate('NewSearch');
  };

  const goToDrawer = () => {
    navigation.navigate('DrawerNavigator');
  };

  const goToAcoesPesquisa = () => {
    navigation.navigate('AcoesPesquisa'); // Navega para a tela AcoesPesquisa
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.cabecalho} onPress={goToDrawer}>
        <Icon name="menu" size={35} color="#FFF"/>
      </TouchableOpacity>

      <View style={styles.main}>
        {/* Barra de pesquisa */}
        <View style={{ flex: 1 }}>
          <BarraDePesquisa />
        </View>

        {/* Projetos de extensão */}
        <ScrollView horizontal contentContainerStyle={{ alignItems: 'center' }}>
        <CardProjeto titulo="MENINAS CPU" data="12/12/2023" onPress={goToAcoesPesquisa} />
        <CardProjeto titulo="MENINAS CPU" data="12/12/2023" onPress={goToAcoesPesquisa} />
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
