import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import Tela_Home from './Tela_Home';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Text style={styles.textoHeader}>usuario@dominio.com</Text>
      </View>
      <View style={styles.divider} />
      <DrawerItemList {...props} />

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.botaoSair}
          onPress={() => {
            navigation.popToTop();
          }}>
          <Icon name="sign-out" size={30} color={'#fff'} marginRight={5} />
          <Text style={styles.txtBotaoSair}>Sair</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Tela_Home"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={styles.drawerScreenOptions}>
      <Drawer.Screen
        name="Tela_Home"
        component={Tela_Home}
        options={{
          drawerLabel: () => <Text style={styles.drawerLabel}>Pesquisas</Text>,
          drawerIcon: () => <Icon name="file-text" size={30} color={'#fff'} />,
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
  },

  textoHeader: {
    fontSize: 26,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'AveriaLibre-Regular',
  },

  divider: {
    height: 2,
    backgroundColor: '#fff',
    marginBottom: 30,
    width: '75%',
    alignSelf: 'center',
  },

  drawerLabel: {
    fontFamily: 'AveriaLibre-Regular',
    fontSize: 30,
    textAlign: 'flex-start',
    width: '100%',
    color: '#fff',
  },

  drawerScreenOptions: {
    drawerStyle: {
      backgroundColor: '#2B1F5C',
    },

    headerStyle: {
      backgroundColor: '#2B1D62', // Cor do header desta tela 

    },
    headerTintColor: '#FFFFFF', // Cor do texto no header desta tela
    headerTitle: '',
  
    drawerItemStyle: {
      borderWidth: 0,
      backgroundColor: '#2B1F5C'

    },
  },

  footer: {
    marginTop: '45%',
    marginLeft: '4%',
  },

  botaoSair: {
    Color: '#fff',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },

  txtBotaoSair: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'AveriaLibre-Regular',
  },
});

export default DrawerNavigator;
