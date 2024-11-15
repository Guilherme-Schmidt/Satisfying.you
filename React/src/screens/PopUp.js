import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const PopUp = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade" // Animação para exibir o modal
    >
      <View style={estilo.container}>
        <View style={estilo.popUp}>
          <Text style={estilo.texto}>Tem certeza de apagar essa pesquisa?</Text>
          <View style={estilo.botao}>
            <TouchableOpacity style={estilo.botao1} onPress={onConfirm}>
              <Text style={estilo.textoBotao}>Sim</Text>
            </TouchableOpacity>
            <TouchableOpacity style={estilo.botao2} onPress={onCancel}>
              <Text style={estilo.textoBotao}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente
  },

  popUp: {
    backgroundColor: '#2B1F5C',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: 350,
    borderRadius: 10,
  },

  texto: {
    fontFamily: 'AveriaLibre-Regular',
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },

  botao: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },

  botao1: {
    backgroundColor: '#FF8383',
    width: '45%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  botao2: {
    backgroundColor: '#3F92C5',
    width: '45%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  textoBotao: {
    fontFamily: 'AveriaLibre-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default PopUp;
