import React from 'react';
import { View, Text,TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

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
          }}
        >
              <Icon name="sign-out" size={36} color={'#fff'} marginRight= {5} />
          <Text style={styles.txtBotaoSair}>Sair</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const DrawerNavigator = () => {
  return (
      <Drawer.Navigator 
        initialRouteName="Home" 
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={styles.drawerScreenOptions}
      >
        <Drawer.Screen 
          name="Home" 
          component={Home} 
          options={{
            drawerLabel: () => (
              <Text style={styles.drawerLabel}>
                Pesquisas
              </Text>
            ),
            drawerIcon: () => (
              <Icon name="file-text" size={30} color={'#fff'} />
            ),
          }}
        />
      </Drawer.Navigator>
  );
}

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

    drawerItemStyle: {
      borderWidth: 0,
      backgroundColor: 'transparent',
    },

    activeBackgroundColor: 'transparent',
    inactiveBackgroundColor: 'transparent',
  },

  footer: {
    height: 900,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  botaoSair: {
    Color: '#fff',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },

  txtBotaoSair: {
    fontSize: 26,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'AveriaLibre-Regular',
  },
});

export default DrawerNavigator;
