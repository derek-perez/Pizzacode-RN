import React, { useContext, useEffect, useState } from 'react'

import { ScrollView } from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';

import pizzaApi from '../api/pizzaApi';
import { Carousel } from '../components/homeScreen/Carousel';
import { ImgIntro } from '../components/homeScreen/ImgIntro';

import { ThemeContext } from '../context/ThemeContext';
import { Categoria } from '../interfaces';
import { themeStyles } from '../themeStyles';


export const HomeScreen = () => {

  const { theme } = useContext(ThemeContext);
  const [categorias, setCategorias] = useState([] as Categoria[]);

  useEffect(() => {
    SplashScreen.hide();

    obtenerCategoria('62944a912d2cf8cfb17e0bba');
    obtenerCategoria('6297d0b9dc8697bcc42e7f1b');
    obtenerCategoria('6297d40fdc8697bcc42e7f9f');
  }, []);

  const obtenerCategoria = async (id = '') => {
    const { data } = await pizzaApi.get('/categorias/' + id);

    categorias.filter(ctg => {
      (ctg._id === data._id)
        ? categorias.splice(categorias.indexOf(ctg), 1)
        : console.log();
    })

    return setCategorias(ctg => [...ctg, data]);
  }


  return (
    <ScrollView contentContainerStyle={{
      ...(theme === 'clear')
        ? themeStyles.clearModeContainer
        : themeStyles.darkModeContainer,
    }}>
      <ImgIntro />


      {
        categorias.map(categoria => (
          <Carousel key={categoria._id} title={categoria.titulo} data={categoria.productos} />
        ))
      }

    </ScrollView>
  )
}