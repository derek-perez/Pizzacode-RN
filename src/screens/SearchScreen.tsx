import React, { useContext, useEffect, useState } from 'react';

import { StyleSheet, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import { Card } from '../components/menuScreen/Card';

import pizzaApi from '../api/pizzaApi';
import { ThemeContext } from '../context/ThemeContext';
import { ProductoNormal } from '../interfaces';
import { themeStyles } from '../themeStyles';


export const SearchScreen = () => {

  const { theme } = useContext(ThemeContext);
  const [text, onChangeText] = useState('');
  const [productos, setProductos] = useState([] as any);

  useEffect(() => {
    if (text.length > 0) {
      setTimeout(() => {
        getProducts(text);
      }, 500);
    }
  }, [text]);

  const getProducts = async (text = '') => {
    await pizzaApi.get('/productos/search/' + text)
      .then(res => {
        setProductos(res.data.productos);
      })
      .catch(err => {
        console.log(err);
      })
  }


  return (
    <View
      style={{
        ...styles.container,
        ...(theme === 'clear')
          ? themeStyles.clearModeContainer
          : themeStyles.darkModeContainer
      }}
    >
      <View style={{
        ...styles.buscador,
        ...(theme === 'dark') ? styles.buscadorDark : ''
      }}>
        <TextInput
          style={{
            ...styles.input,
            ...(theme === 'dark') ? styles.inputDark : ''
          }}
          placeholder="Buscar"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={onChangeText}
        />
        <Icon
          name='search-outline'
          size={25}
          color={(theme === 'dark') ? '#fff' : '#000'}
        />
      </View>

      <ScrollView
        contentContainerStyle={{
          ...styles.container,
          paddingBottom: 100,
          ...(theme === 'clear')
            ? themeStyles.clearModeContainer
            : themeStyles.darkModeContainer
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontSize: 25,
            fontWeight: 'bold',
            marginVertical: 10
          }}
        >
          {text}
        </Text>

        {
          productos !== [] && (
            productos.map((producto: ProductoNormal) => (
              <Card
                key={producto._id}
                data={producto}
              />
            ))
          )
        }
        
      </ScrollView>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  buscador: {
    width: '90%',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    marginTop: 20,

    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,

    shadowColor: '#000',
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 10,

  },
  buscadorDark: {
    backgroundColor: '#555',
  },

  input: {
    flex: 1,
    fontSize: 18,
    color: 'black'
  },
  inputDark: {
    color: '#fff'
  }

});