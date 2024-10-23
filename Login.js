import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <View >
                <Text style={styles.title}>Satisfying.you</Text>
                <Icon name="sentiment-satisfied" size={48} color="#FFFFFF" />

            </View>
            <View >
                <Text style={styles.textInput}>E-mail</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="jurandir.pereira@hotmail.com"
                    placeholderTextColor="#3F92C5"
                />

                <Text style={styles.textInput}>Senha</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="**********"
                    placeholderTextColor="#3F92C5"
                    secureTextEntry
                />
                <Text style={styles.errorMessage}> E-mail e/ou senha inválidos.</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.botaoFundo}>
                    <Text style={styles.botaoTexto}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoCriarFundo}>
                    <Text style={styles.botaoCriarText}>Criar minha conta</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoSenha}>
                    <Text style={styles.botaoCriarText}>Esquecia minha senha</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#372775',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:20,
        height:'100%'
    },
    title:{
        fontFamily:'AveriaLibre-Regular',
        fontSize:32,
        color:'#FFFFFF',
    },
    textInput:{
        fontFamily:'AveriaLibre-Regular',
        fontSize:24,
        color:'#FFFFFF',
        marginBottom:10,
    },
    input:{
        height: 50,
        backgroundColor:'#FFFFFF',
        color:'#3F92C5',
        fontFamily:'AveriaLibre-Regular',
        fontSize:28,
        paddingTop:9,
        paddingBottom:9,
        paddingLeft:22,
        marginBottom:40,
    },
    errorMessage:{
        fontFamily:'AveriaLibre-Regular',
        fontSize:24,
        color:'#FD7979'
    },
    botaoFundo:{
        height:50,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#49B976',
        border:'none',
    },
    botaoTexto:{
        fontFamily: 'AveriaLibre-Regular',
        fontSize:28,
        color:'#FFFFFF',
    },
    botaoCriarFundo:{
        marginTop:120,
        marginBottom:20,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#419ED7',
        height:35,
    },
    botaoCriarText:{
        fontFamily:'AveriaLibre-Regular',
        fontSize:24,
        color:'#FFFFFF'
    },
    botaoSenha:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#B0CCDE',
        height:35,
    }

})

export default Login;
