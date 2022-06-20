import React, { useContext, useState } from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { ThemeContext } from '../context/ThemeContext';
import { CardsMenu } from '../components/menuScreen/CardsMenu';


const Tab = createMaterialTopTabNavigator();

export const MenuNavigator = () => {

  const { theme } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: (theme === 'clear') ? 'rgb(145, 14, 14)' : 'white',
        tabBarInactiveTintColor: '#aaa',
        tabBarStyle: {
          backgroundColor: (theme === 'clear') ? '#fff' : '#333',
        },
        tabBarIndicatorStyle: {
          backgroundColor: 'rgb(145, 14, 14)',
        }
      }}
    >
      <Tab.Screen
        name="PizzasScreen"
        initialParams={{ whatIs: 'pizzas', focus: 0 }}
        component={CardsMenu}
        options={{
          tabBarLabel: 'Pizzas',
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: 'bold'
          }
        }}
      />
      <Tab.Screen
        name="AcompañamientosScreen"
        initialParams={{ whatIs: 'acompañamientos', focus: 0 }}
        component={CardsMenu}
        options={{
          tabBarLabel: 'Acompañamientos',
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: 'bold'
          }
        }}
      />
      <Tab.Screen
        name="PostresScreen"
        initialParams={{ whatIs: 'postres', focus: 0 }}
        component={CardsMenu}
        options={{
          tabBarLabel: 'Postres',
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: 'bold'
          }
        }}
      />
    </Tab.Navigator>
  );
}