/* eslint-disable react/react-in-jsx-scope */
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {Icon} from 'react-native-paper';
import {PieChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';

const styles = StyleSheet.create({
  cabecalho: {
    backgroundColor: '#2B1D62',
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },
  texto: {
    marginLeft: 5,
    fontSize: 25,
    fontFamily: 'AveriaLibre-Regular',
    color: '#FFFFFF',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontFamily: 'AveriaLibre-Regular',
    padding: 20,
    color: '#FFFFFF',
  },
});

const Tela_Relatorio = () => {
  const data = [
    {
      name: 'Excelente',
      population: 15,
      color: '#F1CE7E',
      legendFontColor: '#FFFFFF',
    },
    {
      name: 'Bom',
      population: 7,
      color: '#5FCDA4',
      legendFontColor: '#FFFFFF',
    },
    {
      name: 'Neutro',
      population: 27,
      color: '#6994FE',
      legendFontColor: '#FFFFFF',
    },
    {
      name: 'Ruim',
      population: 5,
      color: '#EA7288',
      legendFontColor: '#FFFFFF',
    },
    {
      name: 'Péssimo',
      population: 2,
      color: 'red',
      legendFontColor: '#FFFFFF',
    },
  ];

  const chartConfig = {};

  return (
    <View style={styles.main}>
      {/* Cabeçalho */}
      <View style={styles.cabecalho}>
        <Icon source="arrow-left" color="#573FBA" size={30} />
        <Text style={styles.texto}>Relatório</Text>
      </View>
      {/* Conteúdo */}
      <View>
        {/* Titulo */}
        <View style={styles.container}>
          <Text style={styles.titulo}>Ubuntu 2022</Text>
        </View>

        {/* Grafico de Pizza */}
        <View>
          <PieChart
            data={data}
            width={Dimensions.get('screen').width}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            }}
            accessor={'population'}
            backgroundColor={'transparent'}
            avoidFalseZero={true}
          />
        </View>

        {/* informações */}
        <View></View>
      </View>
    </View>
  );
};

export default Tela_Relatorio;
