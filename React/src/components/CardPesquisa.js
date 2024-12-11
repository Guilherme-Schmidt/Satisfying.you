
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

const CardPesquisa = props => {

  return (
    <TouchableOpacity style={styles.main} onPress={props.onPress}>
      {/* Imagem */}

      <Image
        style={{ flex: 1 }}
        source={{ uri: props.imagem }}
        resizeMode="cover"
      />

      {/* Titulo */}
      <View>
        <Text style={[styles.text, { fontSize: 20, color: '#3F92C5' }]}>
          {props.titulo}
        </Text>
      </View>
      {/* Data */}
      <View>
        <Text style={[styles.text, { fontSize: 13, color: '#8B8B8B' }]}>{props.data}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    fontFamily: 'AveriaLibre-Regular',
    backgroundColor: '#fff',
    width: 170,
    height: 165,
    marginRight: 35,
    padding: 3,
    borderRadius: 5,
  },

  text: {
    fontFamily: 'AveriaLibre-Regular',
    textAlign: 'center',
  },
});

export default CardPesquisa;
