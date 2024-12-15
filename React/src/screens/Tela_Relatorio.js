import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Tela_Relatorio = () => {

  const [votos, setVotos] = useState([])

  //valores armazenados na store (redux)
  const userID = useSelector((state) => state.login.userID);
  const pesquisaID = useSelector((state) => state.pesquisa.pesquisaID)

  //Recuperar votos armazenados no Firestore
  const recuperaVotos = async () => {

    const PesquisaID_Ref = doc(db, 'usuarios', userID, 'pesquisas', pesquisaID);  //referência ao documento de pesquisa específico

    try {
      const docSnapshot = await getDoc(PesquisaID_Ref); //getDoc -> consultar os dados de um documento em específico

      const dataDB = [
        {
          name: 'Voto(s) em Excelente',
          population: docSnapshot.get('excelente'),  //recuperar somente os dados de votação
          color: '#F1CE7E',
          legendFontColor: '#FFFFFF',
          legendFontSize: 16,
        },
        {
          name: 'Voto(s) em Bom',
          population: docSnapshot.get('bom'),
          color: '#6994FE',
          legendFontColor: '#FFFFFF',
          legendFontSize: 16,
        },
        {
          name: 'Voto(s) em Neutro',
          population: docSnapshot.get('neutro'),
          color: '#5FCDA4',
          legendFontColor: '#FFFFFF',
          legendFontSize: 16,
        },
        {
          name: 'Voto(s) em Ruim',
          population: docSnapshot.get('ruim'),
          color: '#EA7288',
          legendFontColor: '#FFFFFF',
          legendFontSize: 16,
        },
        {
          name: 'Voto(s) Péssimo',
          population: docSnapshot.get('pessimo'),
          color: '#53D8D8',
          legendFontColor: '#FFFFFF',
          legendFontSize: 16,
        },
      ];

      setVotos(dataDB);  
    }
    catch (error) {
      console.log("Erro ao fazer consulta ao documento: " + error);
    }
  }

  //Função para verificar se todos os votos têm population igual a 0
  const verificaVotacao = votos.every((voto) => voto.population === 0);

  //Será executado assim que a tela carregar
  useEffect(() => {
    recuperaVotos();
  }, []);

  return (
    <View style={styles.main}>
      {/* Conteúdo */}
      <View>
        {votos.length === 0 ? (
          <View>
            <Text style={styles.loadingText}>Carregando Dados...</Text>
            <ActivityIndicator style={styles.loadingIndicator} size={'large'} color={'white'} />
          </View>
        ) : verificaVotacao ? (
          <Text style={styles.VerificaVotacaoTxt}>Não há votos para essa pesquisa por enquanto</Text>
        ) : (
          //gráfico de pizza
          <PieChart
            data={votos}
            width={Dimensions.get('screen').width}
            height={270}
            chartConfig={{
              color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            }}
            accessor={'population'}
            backgroundColor={'transparent'}
            absolute={true}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  main: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#372775',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 25,
    fontFamily: 'AveriaLibre-Regular',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  VerificaVotacaoTxt: {
    fontSize: 30,
    fontFamily: 'AveriaLibre-Regular',
    color: '#FFFFFF',
  }

});

export default Tela_Relatorio;
