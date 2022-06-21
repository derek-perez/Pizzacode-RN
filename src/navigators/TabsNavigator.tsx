import React, { useContext, useEffect } from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

import { MenuNavigator } from './MenuNavigator';
import { CuentaNavigator } from './CuentaNavigator';

import { CarritoContext } from '../context/CarritoContext';
import { UserContext } from '../context/UserContext';

import { HomeScreen } from '../screens/HomeScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { CarritoScreen } from '../screens/CarritoScreen';
import { FixedTop } from '../components/FixedTop';


const Tab = createBottomTabNavigator();

export const TabsNavigator = () => {

  const { user } = useContext(UserContext);
  const { store } = useContext(CarritoContext);
  const { navigate } = useNavigation<BottomTabNavigationProp<any, any>>();

  let lenght = 0;

  if (store) {
    lenght = store.length;
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'rgb(145, 14, 14)',
          height: 75,
        },

        tabBarActiveBackgroundColor: 'rgb(145, 14, 14)',
        tabBarActiveTintColor: 'white',

        tabBarInactiveBackgroundColor: 'rgba(145, 14, 14, 0.8)',
        tabBarInactiveTintColor: '#aaa',

        tabBarItemStyle: {
          marginBottom: 7
        },

        tabBarStyle: {
          position: 'relative',
          height: 70,
          backgroundColor: 'rgb(145, 14, 14)',
        }
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: () => <FixedTop title='Inicio' />,
          tabBarLabel: 'Inicio',
          tabBarLabelStyle: {
            fontSize: 14
          },
          tabBarActiveTintColor: 'white',

          tabBarIcon: ({ color }) => {
            return <Icon
              color={color}
              size={25}
              name='home-outline'
            />;
          }
        }}
      />
      <Tab.Screen
        name="MenuNavigator"
        component={MenuNavigator}
        options={{
          headerTitle: () => <FixedTop title='Menú' />,
          tabBarLabel: 'Menú',
          tabBarLabelStyle: {
            fontSize: 14
          },
          tabBarIcon: ({ color }) => {
            return <Icon
              color={color}
              size={25}
              name='list-outline'
            />;
          }
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerTitle: () => <FixedTop title='Buscador' />,
          tabBarLabel: 'Buscar',
          tabBarLabelStyle: {
            fontSize: 14
          },
          tabBarIcon: ({ color }) => {
            return <Icon
              color={color}
              size={25}
              name='search-outline'
            />;
          }
        }}
      />
      <Tab.Screen
        name="CarritoScreen"
        component={CarritoScreen}
        options={{
          headerTitle: () => <FixedTop title='Tu carrito' />,
          tabBarBadge: lenght,
          tabBarLabel: 'Carrito',
          tabBarLabelStyle: {
            fontSize: 14
          },
          tabBarIcon: ({ color }) => {
            return <Icon
              color={color}
              size={25}
              name='cart-outline'
            />;
          }
        }}
      />
      <Tab.Screen
        name="CuentaNavigator"
        component={CuentaNavigator}
        listeners={{
          focus: () => {
            if (Object.entries(user).length === 0) {
              navigate('AuthNavigator');
            }
          }
        }}
        options={{
          headerShown: false,
          tabBarLabel: 'Cuenta',
          tabBarLabelStyle: {
            fontSize: 14
          },
          tabBarIcon: ({ color }) => {
            return <Icon
              color={color}
              size={25}
              name='person-outline'
            />;
          }
        }}
      />
    </Tab.Navigator>
  );
}