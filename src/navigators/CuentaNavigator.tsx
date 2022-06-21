import React, { useContext, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

import { PerfilScreen, ContraseñasScreen, DireccionesScreen, TarjetasScreen, PagosScreen } from '../screens/cuenta';

import { FixedTop } from '../components/FixedTop';
import { ThemeContext } from '../context/ThemeContext';
import { UserContext } from '../context/UserContext';
import { LogoutButton } from '../components/cuentaScreen/LogoutButton';
import { UserProps } from '../interfaces';


const Drawer = createDrawerNavigator();

export const CuentaNavigator = () => {

  const { navigate } = useNavigation<DrawerNavigationProp<any, any>>();

  const { user, setUser } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  if (Object.entries(user).length === 0) {
    navigate('AuthNavigator');
  }

  return (
    <Drawer.Navigator
      initialRouteName='PerfilScreen'
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: 'rgb(145, 14, 14)',
          height: 75
        },

        drawerStyle: {
          backgroundColor: (theme === 'dark') ? '#333' : '#fff'
        },

        drawerActiveBackgroundColor: 'rgb(145, 14, 14)',
        drawerActiveTintColor: 'white',

        drawerInactiveTintColor: '#888'

      }}
    >
      <Drawer.Screen
        name="PerfilScreen"
        component={PerfilScreen}
        options={{
          headerTitle: () => <FixedTop title='Tu perfil' />,
          drawerLabel: 'Tu perfil',
          drawerIcon: ({ color }) => {
            return (
              <Icon
                name='person'
                size={25}
                color={color}
              />
            )
          }
        }}
      />
      <Drawer.Screen
        name="ContraseñasScreen"
        component={ContraseñasScreen}
        options={{
          headerTitle: () => <FixedTop title='Tus contraseñas' />,
          drawerLabel: 'Tus contraseñas',
          drawerIcon: ({ color }) => {
            return (
              <Icon
                name='lock-closed'
                size={25}
                color={color}
              />
            )
          }
        }}
      />
      <Drawer.Screen
        name="DireccionesScreen"
        component={DireccionesScreen}
        options={{
          headerTitle: () => <FixedTop title='Tus direcciones' />,
          drawerLabel: 'Tus direcciones',
          drawerIcon: ({ color }) => {
            return (
              <Icon
                name='map'
                size={25}
                color={color}
              />
            )
          }
        }}
      />
      <Drawer.Screen
        name="TarjetasScreen"
        component={TarjetasScreen}
        options={{
          headerTitle: () => <FixedTop title='Tus tarjetas' />,
          drawerLabel: 'Tus tarjetas',
          drawerIcon: ({ color }) => {
            return (
              <Icon
                name='card'
                size={25}
                color={color}
              />
            )
          }
        }}
      />
      <Drawer.Screen
        name="PagosScreen"
        component={PagosScreen}
        options={{
          headerTitle: () => <FixedTop title='Historial de pagos' />,
          drawerLabel: 'Historial de pagos',
          drawerIcon: ({ color }) => {
            return (
              <Icon
                name='receipt'
                size={25}
                color={color}
              />
            )
          }
        }}
      />

      <Drawer.Screen
        name="LogoutScreen"
        component={LogoutButton}
        listeners={{
          focus: async () => {
            navigate('TabsNavigator');
            setUser({} as UserProps);

            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('token');
          }
        }}
        options={{
          headerTitle: '',
          drawerLabel: 'Cerrar sesión'
        }}
      />

    </Drawer.Navigator>
  );
}
