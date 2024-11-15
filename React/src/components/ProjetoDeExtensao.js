import {Card, Icon, Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  texto: {
    fontFamily: 'AveriaLibre-Regular',
    textAlign: 'center',
  },
  card: {
    width: 'auto',
    padding: 10,
    margin: 20,
  },
});

const ProjetoDeExtensao = props => {
  const imgAleatoria =
    'https://picsum.photos/id/' +
    Math.round(Math.random() * 100).toString() +
    '/750';

  const ano = Math.floor(Math.random() * (2025 - 2018)) + 2018;
  const mes = Math.floor(Math.random() * (13 - 1)) + 1;
  const dia = Math.floor(Math.random() * (32 - 1)) + 1;

  const dataAleatoria =
    dia.toString() + '/' + mes.toString() + '/' + ano.toString();

  return (
    <Card
      style={styles.card}
      onPress={() => {
        console.log();
      }}>
      <Card.Cover style source={{uri: imgAleatoria}} />
      <Card.Content>
        <Text style={styles.texto} variant="titleLarge">
          {props.titulo}
        </Text>
        <Text style={styles.texto} variant="bodyMedium">
          {dataAleatoria}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default ProjetoDeExtensao;
