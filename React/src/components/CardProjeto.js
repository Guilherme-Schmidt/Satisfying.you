import React, {useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

const styles = StyleSheet.create({
  main: {
    fontFamily: 'AveriaLibre-Regular',
    backgroundColor: '#fff',
    width: 180,
    aspectRatio: 1,
    marginRight: 15,
    padding: 15,
    borderRadius: 15,
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
    <View style={styles.main}>
      {/* Imagem */}
      <View style={{flex: 1}}>
        <Image
          style={{flex: 1}}
          source={{uri: imgAleatoria}}
          resizeMode="center"
        />
      </View>

      {/* Nome */}
      <View>
        <Text style={[styles.text, {fontSize: 24, color: '#3F92C5'}]}>
          {props.titulo}
        </Text>
      </View>
      {/* Data */}
      <View>
        <Text style={[styles.text, {fontSize: 14}]}>{props.data}</Text>
      </View>
    </View>
  );
};

export default CardProjeto;
