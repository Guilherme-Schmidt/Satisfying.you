import {Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#37BD6D',
    padding: 7,
    elevation: 10,
    marginTop: 2
  },
  texto: {
    fontFamily: 'AveriaLibre-Regular',
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
  },
});
const BotaoPesquisa = props => {
  return (
    <TouchableOpacity style={styles.main} onPress={props.onPress}>
      <Text style={styles.texto}>{props.texto}</Text>
    </TouchableOpacity>
  );
};

export default BotaoPesquisa;
