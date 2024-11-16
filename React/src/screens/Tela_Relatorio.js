/* eslint-disable react/react-in-jsx-scope */
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {Icon} from 'react-native-paper';
import {PieChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';

const styles = StyleSheet.create({

  main: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#372775',
    justifyContent:'center',
    alignItems: 'center'
  },
  
 
});

const Tela_Relatorio = () => {
  const data = [
    {
      name: 'Excelente',
      population: 15,
      color: '#F1CE7E',
      legendFontColor: '#FFFFFF',
      legendFontSize: 16
    },
    {
      name: 'Bom',
      population: 7,
      color: '#5FCDA4',
      legendFontColor: '#FFFFFF',
      legendFontSize: 16
    },
    {
      name: 'Neutro',
      population: 27,
      color: '#6994FE',
      legendFontColor: '#FFFFFF',
      legendFontSize: 16
    },
    {
      name: 'Ruim',
      population: 5,
      color: '#EA7288',
      legendFontColor: '#FFFFFF',
      legendFontSize: 16
    },
    {
      name: 'Péssimo',
      population: 2,
      color: 'red',
      legendFontColor: '#FFFFFF',
      legendFontSize: 16
    },
  ];

  const chartConfig = {};

  return (
    <View style={styles.main}>
      
      {/* Conteúdo */}
    
        {/* Grafico de Pizza */}
        <View>
          <PieChart
            data={data}
            width={Dimensions.get('screen').width}
            height={270}
            chartConfig={{
              color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            }}
            accessor={'population'}
            backgroundColor={'transparent'}
            avoidFalseZero={true}
          />
        </View>
        
      </View>
    
  );
};

export default Tela_Relatorio;
