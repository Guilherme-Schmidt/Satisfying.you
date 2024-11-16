
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  main: {
    fontFamily: 'AveriaLibre-Regular',
    backgroundColor: '#fff',
    width: 180,
    height: 180,
    marginRight: 35,
    padding: 7,
    borderRadius: 10,
  },

  text: {
    fontFamily: 'AveriaLibre-Regular',
    textAlign: 'center',
  },
});

const CardProjeto = props => {
  const imgAleatoria =
    'https://picsum.photos/id/' +
    Math.round(Math.random() * 100).toString() +
    '/750';

  return (
    <TouchableOpacity style={styles.main} onPress={props.onPress}>
      {/* Imagem */}
     
        <Image
          style={{flex: 1}}
          source={{uri: imgAleatoria}}
          resizeMode='cover'
        />
    
      {/* Titulo */}
      <View>
        <Text style={[styles.text, {fontSize: 20, color: '#3F92C5'}]}>
          {props.titulo}
        </Text>
      </View>
      {/* Data */}
      <View>
        <Text style={[styles.text, {fontSize: 13, color: '#8B8B8B'}]}>{props.data}</Text> 
      </View>
    </TouchableOpacity>
  );
};

export default CardProjeto;
