import { View, Text, StyleSheet } from "react-native";

const Agradecimento = (props) => {

    const sair = () => {
        props.navigation.pop();
    }

    setTimeout(sair, 3000);//Temporizador 3 segundos

    return (
        <View style={st.containerTexo}>
            <Text style={st.texto}>
                Obrigado por participar da pesquisa!</Text>
            <Text style={st.texto}>
                Aguardamos você no próximo ano!</Text>     
        </View>
    )
}//OK

//Conteiner Estilos
const st = StyleSheet.create({
     containerTexo: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        backgroundColor: '#372775',
        padding: '12%'
    },
     texto: {
        fontSize: 30,
        color: 'white',
        fontFamily: 'AveriaLibre-Regular',
        textAlign: 'center'
    }
})// OK

export default Agradecimento