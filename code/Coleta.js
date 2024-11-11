import { StyleSheet, View, Text, Pressable } from 'react-native'
import Facebutton from '../components/Facebutton';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Coleta = (props) => {

  const sair = () => {
    props.navigation.pop();
  }
  
  const [documento, setDocumento] = useState({})

  const ad = async (atributo) => {
    console.log("\nAtributo da função: " + JSON.stringify(atributo))
  }

  return (
    <View style={st.containerPrincipal}>
      <Pressable onPress={()=>{sair()}} style={st.sair}></Pressable>
      <View style={st.containerTexto}>
        <Text style={st.texto}>
          O que você achou do carnaval 2024?
        </Text>
      </View>
      <View style={st.contaierButton}>
        <Facebutton nomeIcone="sentiment-very-dissatisfied" corIcone="#D71616" textoIcone="Pésssimo" navigation={props.navigation} adicionar={() => { ad({ pessimo: (documento.pessimo || 0) + 1 }) }} />
        <Facebutton nomeIcone="sentiment-dissatisfied" corIcone="#FF360A" textoIcone="Ruim" navigation={props.navigation} adicionar={() => { ad({ ruim: (documento.ruim || 0) + 1 }) }} />
        <Facebutton nomeIcone="sentiment-neutral" corIcone="#FFC632" textoIcone="Neutro" navigation={props.navigation} adicionar={() => { ad({ neutro: (documento.neutro || 0) + 1 }) }} />
        <Facebutton nomeIcone="sentiment-satisfied-alt" corIcone="#37BD6D" textoIcone="Bom" navigation={props.navigation} adicionar={() => { ad({ bom: (documento.bom || 0) + 1 }) }} />
        <Facebutton nomeIcone="sentiment-very-satisfied" corIcone="#25BC22" textoIcone="Excelente" navigation={props.navigation} adicionar={() => { ad({ excelente: (documento.excelente || 0) + 1 }) }} />
      </View>
    </View>
  )
}

const st = StyleSheet.create({
  containerPrincipal: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#372775',
    padding: '2%'
  },
  containerTexto: {
    display: 'flex',
    flex: 0.3,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  texto: {
    fontSize: 30,
    color: 'white',
    fontFamily: 'AveriaLibre-Regular'
  },
  contaierButton: {
    display: 'flex',
    flex: 0.7,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: '3%'
  },
  sair: {
    display: 'flex',
    flex: 0.04,
    alignSelf: 'flex-end',
    width: '5%',
    height: '9%',
  }
})

export default Coleta;
