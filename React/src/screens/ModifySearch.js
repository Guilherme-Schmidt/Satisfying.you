import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PopUp from '../components/PopUp';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImageResizer from 'react-native-image-resizer';
import { launchImageLibrary } from 'react-native-image-picker';
import { db } from '../firebase/config';
import { updateDoc, doc, deleteDoc, collection, query, where, getDocs, } from 'firebase/firestore';
import { useSelector } from 'react-redux';

const ModifySearch = ({ navigation }) => {

  const [nome, setNome] = useState(useSelector((state) => state.pesquisa.nome)); //vir com o nome pré-preenchido acordo com a pesquisa selecionada
  const [data, setData] = useState(useSelector((state) => state.pesquisa.data)); //vir com a data pré-preenchida de acordo com a pesquisa selecionada
  const [imagem, setImagem] = useState(useSelector((state) => state.pesquisa.imagem)) //vir com a imagem pré-carregada de acordo com a pesquisa selecionada
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  //Redimensionamento do tamanho da imagem e conversão para base 64
  const converteUriToBase64 = async (uri) => {

    const resizedImage = await ImageResizer.createResizedImage(
      uri, // URI da imagem original
      200,  // Largura
      200,  // Altura
      'JPEG', // Formato (JPEG ou PNG)
      100  // Qualidade (0-100)
    );

    const imageUri = await fetch(resizedImage.uri);
    const imageBlob = await imageUri.blob();
    console.log(imageBlob);

    const reader = new FileReader();

    //Quando a leitura estiver completa, atribui o resultado a setImagem
    reader.onloadend = () => {
      setImagem(reader.result);
    };
    reader.readAsDataURL(imageBlob); //Converte Blob para Base64
  };

  //escolher imagem na galeria
  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (result) => {
      //Verificar se uma imagem foi selecionada
      if (result.assets && result.assets.length > 0) {
        console.log(result.assets[0].uri); //uri da imagem selecionada
        converteUriToBase64(result.assets[0].uri); //converte a imagem selecionada para base64
      }
    });
  };

  //Calendário
  const onChangeDate = (event, selectedDate) => {
    if (event.type === 'set' && selectedDate) {
      setShowDatePicker(false);  // Fecha o DateTimePicker após a seleção
      const formattedDate = format(selectedDate, 'dd/MM/yyyy', { locale: ptBR });
      setData(formattedDate);
    }
    else if (event.type === 'dismissed') {
      setShowDatePicker(false); // Fecha o DateTimePicker se o usuário cancelar
    }
  };

  //valores de usuario e de pesquisa (ids) acessados da store no redux
  const userID = useSelector((state) => state.login.userID);
  const pesquisaID = useSelector((state) => state.pesquisa.pesquisaID)

  //atualizar no firestore pelo id da pesquisa
  const modificarPesquisa = async () => {

    //realizar uma consulta para verificar se já nao existe uma pesquisa com o mesmo nome a ser atualizado, exceto pela pesquisa atual selecionada
    const pesquisas_SubCollection = collection(db, 'usuarios', userID, 'pesquisas');
    const q = query(pesquisas_SubCollection, where('nome', '==', nome.toUpperCase().trim()), where('__name__', '!=', pesquisaID)) // Ignora a pesquisa atual pelo ID para nao dar erro nela caso seu nome nao seja modificado.' __name__' é o id do doc no firestore

    //referencia ao documento de pesquisa selecionado através do id do documento
    const PesquisaID_Ref = doc(db, 'usuarios', userID, 'pesquisas', pesquisaID);

    try {
      setLoading(true);
      //execução da consulta
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty === false) {
        Alert.alert('Erro de modificação', 'Pesquisa não modificada, pois já existe uma pesquisa com esse nome.')
        return;
      }

      await updateDoc(PesquisaID_Ref, {
        nome: nome.toUpperCase().trim(),
        data: data,
        imagem: imagem,
      });
      console.log("Documento atualizado com sucesso");
      navigation.pop(2); //desimpilha 2 telas para voltar para home(drawer)
    }
    catch (error) {
      console.log("Erro ao atualizar documento: " + error);
    }
    finally{
      setLoading(false);
    }
  }

  //Deletar no firestore pelo id da pesquisa
  const deletarPesquisa = async () => {

    const PesquisaID_Ref = doc(db, 'usuarios', userID, 'pesquisas', pesquisaID);

    try {
      await deleteDoc(PesquisaID_Ref);
      console.log("Documento deletado com sucesso");
      navigation.pop(2); //desimpilha 2 telas para voltar para home(drawer)
      setPopUpVisible(false);
    }
    catch (error) {
      console.log("Erro ao deletar documento: " + error);
    }
  };

  const showPopUp = () => { //mostrar pop up
    setPopUpVisible(true);
  };

  const goToAcoesPesquisa = () => {
    navigation.goBack(); // desimpilha esta tela para voltar para açoes pesquisa caso clique em cancelar no pop up
    setPopUpVisible(false);
  };

  return (
    <View style={estilo.tela}>
      <View style={estilo.corpo}>
        <Text style={estilo.txtCorpo}>Nome</Text>
        <TextInput
          style={estilo.txtEntrada}
          value={nome}
          onChangeText={setNome}
        />
        <Text style={estilo.txtCorpo}>Data</Text>
        <View style={estilo.dateContainer}>
          <TextInput
            style={estilo.txtEntradaData}
            value={data}
            onFocus={() => {
              if (!showDatePicker) {
                setShowDatePicker(true); // Apenas abre o calendário se não estiver visível
              }
            }}
            showSoftInputOnFocus={false} // Desabilita o teclado
          />
          <TouchableOpacity style={estilo.iconeCalendario} onPress={() => setShowDatePicker(true)}>
            <MaterialIcons name="calendar-today" size={24} color="#3F92C5" />
          </TouchableOpacity>
        </View>
        {/*renderização condicional do calendario */}
        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display='default'
            onChange={onChangeDate}
            locale="pt-BR" //define a localização para português do Brasil
          />
        )}
        <Text style={estilo.txtCorpo}>Imagem</Text>
        <TouchableOpacity style={estilo.imageContainer} onPress={pickImage}>
          <Image source={{ uri: imagem }} style={estilo.imagem} />
        </TouchableOpacity>
        <View style={estilo.botoesContainer}>
          {loading ? (
            <TouchableOpacity style={estilo.botaoSalvar}>
              <Text style={estilo.txtBotao}>MODIFICANDO...</Text>
              <ActivityIndicator style={estilo.loadingIndicator} size={'small'} color={'white'} />
            </TouchableOpacity>

          ) : (
            <TouchableOpacity style={estilo.botaoSalvar} onPress={modificarPesquisa}>
              <Text style={estilo.txtBotao}>SALVAR</Text>
            </TouchableOpacity>

          )}

          <TouchableOpacity style={estilo.botaoApagar} onPress={showPopUp}>
            <MaterialIcons name="delete" size={24} color="#FFFFFF" />
            <Text style={estilo.txtApagar}>Apagar</Text>
          </TouchableOpacity>
          <PopUp visible={popUpVisible} onConfirm={deletarPesquisa} onCancel={goToAcoesPesquisa} />
        </View>
      </View>
    </View>
  );
};

const estilo = StyleSheet.create({
  tela: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#372775',
    alignItems: 'center',
  },
  corpo: {
    paddingHorizontal: 20,
    paddingTop: 10,
    width: '80%',
  },
  txtCorpo: {
    fontSize: 16,
    fontFamily: 'AveriaLibre-Regular',
    color: '#FFFFFF',
    marginBottom: 1,
  },
  txtEntrada: {
    fontSize: 16,
    fontFamily: 'AveriaLibre-Regular',
    backgroundColor: '#FFFFFF',
    color: '#3F92C5',
    padding: 5,
    marginBottom: 10,
    width: '100%',
  },
  txtEntradaData: {
    fontSize: 16,
    fontFamily: 'AveriaLibre-Regular',
    backgroundColor: '#FFFFFF',
    color: '#3F92C5',
    padding: 5,
    flex: 1,
  },
  dateContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconeCalendario: {
    position: 'absolute',
    right: 10, // Alinha o ícone à direita dentro do TextInput
  },
  imageContainer: {
    backgroundColor: '#FFFFFF',
    height: 78,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    overflow: 'hidden',
  },
  imagem: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 11,
  },
  botaoSalvar: {
    flex: 1,
    backgroundColor: '#37BD6D',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  txtBotao: {
    fontSize: 18,
    fontFamily: 'AveriaLibre-Bold',
    color: '#FFFFFF',
  },
  botaoApagar: {
    alignItems: 'center',
    bottom: 2,
    right: -85,
  },
  txtApagar: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'AveriaLibre-Regular',
    marginTop: -5, // Ajusta a posição do texto para que fique logo abaixo do ícone
  },
  loadingIndicator: {
    position: 'absolute',
    right: 155,
  },

});

export default ModifySearch;
