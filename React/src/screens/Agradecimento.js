import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

const Agradecimento = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const sair = () => {
            navigation.pop();
        };
        const timer = setTimeout(sair, 3000); // Temporizador de 3 segundos
        return () => clearTimeout(timer); // Limpar o timer ao desmontar o componente
    }, [navigation]);

    return (
        <View style={st.containerTexto}>
            <Text style={st.texto}>
                Obrigado por participar da pesquisa!
            </Text>
            <Text style={st.texto}>
                Aguardamos você no próximo ano!
            </Text>
        </View>
    );
};

const st = StyleSheet.create({
    containerTexto: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        backgroundColor: '#372775',
        padding: '12%',
    },
    texto: {
        fontSize: 30,
        color: 'white',
        fontFamily: 'AveriaLibre-Regular',
        textAlign: 'center',
    },
});

export default Agradecimento;
