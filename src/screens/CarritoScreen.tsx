import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import pizzaApi from '../api/pizzaApi';

import { CardCart } from '../components/carritoScreen/CardCart';
import { ResumenCard } from '../components/carritoScreen/ResumenCard';

import { CarritoContext } from '../context/CarritoContext';
import { ThemeContext } from '../context/ThemeContext';

import { ProductoNormal } from '../interfaces';
import { themeStyles } from '../themeStyles';


export const CarritoScreen = () => {

  const { theme } = useContext(ThemeContext);
  const { store, productsResume, precioTotalCarrito, setProductsResume } = useContext(CarritoContext);
  

  return (
    <ScrollView
      contentContainerStyle={{
        ...styles.container,
        ...(theme === 'clear')
          ? themeStyles.clearModeContainer
          : themeStyles.darkModeContainer,
      }}
    >
      <View
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Text style={{
          ...styles.title,
          ...(theme === 'clear')
            ? themeStyles.clearModeTitle
            : themeStyles.darkModeTitle,
        }}>
          Tu carrito:
        </Text>

        {
          store !== [] && (
            store.map((producto: any) => (
              <CardCart
                key={producto._id}
                data={producto}
              />
            ))
          )
        }

      </View>

      <View style={styles.containerResumen}>
        <Text
          style={{
            ...styles.titleResumen,
            ...(theme === 'clear')
              ? themeStyles.clearModeTitle
              : themeStyles.darkModeTitle
          }}
        >
          Resúmen del carrito:
        </Text>

        <View style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          {
            (store) && (
              store.map((producto: ProductoNormal) => (
                <ResumenCard key={producto._id} producto={producto} />
              ))
            )
          }
        </View>

        <View style={{ borderTopColor: 'rgb(145, 14, 14)', borderTopWidth: 5, marginTop: 20 }}>
          <Text
            style={{
              ...styles.resumenText,
              ...(theme === 'clear')
                ? themeStyles.clearModeText
                : themeStyles.darkModeText
            }}
          >
            <Text>Total:</Text> <Text>${precioTotalCarrito}.00</Text>
          </Text>
        </View>

      </View>


      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
      >
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            color: '#fff'
          }}
        >
          Seguir con el proceso <Icon size={20} name='chevron-forward' />
        </Text>
      </TouchableOpacity>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 20,
    color: 'rgb(145, 14, 14)',
    textAlign: 'center'
  },

  containerResumen: {
    flex: 1,
    width: '100%',

    alignItems: 'center',
    borderTopColor: 'rgb(154, 14, 14)',
    borderTopWidth: 5,
    padding: 10
  },
  titleResumen: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 40
  },

  resumenText: {
    width: '100%',

    fontSize: 25,
    padding: 10
  },

  button: {
    width: 275,
    padding: 10,

    backgroundColor: 'rgb(154, 14, 14)',
    borderColor: 'rgb(154, 14, 14)',
    borderWidth: 2,
    borderRadius: 5,

    marginVertical: 20
  }

});