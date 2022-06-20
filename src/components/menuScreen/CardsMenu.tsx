import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native';

import { ThemeContext } from '../../context/ThemeContext';
import { ProductoNormal } from '../../interfaces';
import { Card } from './Card';

import pizzaApi from '../../api/pizzaApi';
import { themeStyles } from '../../themeStyles';



export const CardsMenu = ({ route: { params: { whatIs, focus } } }: any) => {

    const { theme } = useContext(ThemeContext);
    const [productos, setProductos] = useState([] as ProductoNormal[]);

    const [title, setTitle] = useState('');

    useEffect(() => {
        if (focus === 0) {
            if (whatIs === 'pizzas') {
                obtenerProductos('62943d80c3e39e6ae55afee3');
            } else if (whatIs === 'acompañamientos') {
                obtenerProductos('62943df8c3e39e6ae55afee7');
            } else if (whatIs === 'postres') {
                obtenerProductos('62943e0ec3e39e6ae55afee9');
            }
        }
    }, [])


    const obtenerProductos = async (id: string) => {
        const { data } = await pizzaApi.get(`/categorias/${id}`);
        setTitle(data.titulo);

        if (data.productos) {
            data.productos.map(async (id: string) => {
                await pizzaApi.get('/productos/' + id)
                    .then(res => {
                        return setProductos(prod => [...prod, res.data.producto]);
                    })
                    .catch(console.log)
            });
        }
    }


    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                flexGrow: 1,
                alignItems: 'center',
                ...(theme === 'clear')
                    ? themeStyles.clearModeContainer
                    : themeStyles.darkModeContainer,
            }}
        >
            <Text
                style={{
                    ...styles.title,
                    ...(theme === 'clear')
                        ? themeStyles.clearModeTitle
                        : themeStyles.darkModeTitle,
                }}
            >
                {title}
            </Text>

            {
                productos.length > 0 && (
                    productos.map((producto: ProductoNormal) => (
                        <Card key={producto._id + Math.random()} data={producto} />
                    ))

                )
            }

        </ScrollView >
    )
}



const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'rgb(145, 14, 14)',
        textAlign: 'center',

        marginVertical: 20,
        paddingHorizontal: 10,

        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
})