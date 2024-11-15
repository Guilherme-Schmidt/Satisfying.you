import {useState} from 'react';
import {TextInput, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: 10,
  },
});

const BarraDePesquisa = () => {
  const [textPesquisa, setTextoPesquisa] = useState('');

  return (
    <View style={styles.main}>
      <Icon name="magnify" size={20} />
      <TextInput
        placeholder="Insira o termo de busca..."
        placeholderTextColor={'black'}
        value={textPesquisa}
        onChangeText={setTextoPesquisa}
        style={{fontFamily:'AveriaLibre-Regular',width: '100%'}}
      />
    </View>
  );
};

export default BarraDePesquisa;
