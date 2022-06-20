import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import pizzaApi from '../../api/pizzaApi';

import { ThemeContext } from '../../context/ThemeContext';
import { Producto } from '../../interfaces';
import { themeStyles } from '../../themeStyles';
import { Card } from '../menuScreen/Card';



interface Props {
    title: string;
    data: string[];
    titleStyles?: object;
}

export const Carousel = ({ data, title, titleStyles }: Props) => {

    const [productos, setProductos] = useState([] as Producto[]);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        data.map(id => obtenerProducto(id));
    }, []);

    const obtenerProducto = async (id = '') => {
        const { data } = await pizzaApi.get('/productos/' + id);

        productos.filter(prod => {
            (prod.producto._id === data._id)
                ? productos.splice(productos.indexOf(prod), 1)
                : console.log();
        })

        return setProductos(prod => [...prod, data]);
    }



    return (
        <View key={title} style={{
            ...styles.container,
            ...(theme === 'clear')
                ? themeStyles.clearModeContainer
                : themeStyles.darkModeContainer,
        }}>
            <Text style={{
                ...styles.title,
                ...(titleStyles !== {}) ? titleStyles : '',
                ...(theme === 'clear')
                    ? themeStyles.clearModeTitle
                    : themeStyles.darkModeTitle,
            }}>
                {title}
            </Text>


            <FlatList
                data={productos}
                keyExtractor={(item) => item.producto._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Card
                        key={item.producto._id + Math.random()}
                        data={item.producto}
                        inlineStyles={{ width: 350, marginHorizontal: 10 }}
                    />
                )}
            />

        </View>
    )
}


const styles = StyleSheet.create({
    title: {
        width: '90%',
        textAlign: 'center',
        paddingTop: 30,

        fontSize: 30,
        fontWeight: 'bold',
        color: 'rgb(145, 14, 14)',
    },

    container: {
        flex: 1,
        backgroundColor: '#333',
        alignItems: 'center',
        marginVertical: 25,
    },

    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',

        width: 350,
        height: 500,
        borderTopColor: 'rgb(145, 14, 14)',
        borderTopWidth: 15,

        borderBottomColor: '#aaa',
        borderRightColor: '#aaa',
        borderLeftColor: '#aaa',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderRadius: 10,

        margin: 10,
        padding: 20,
        backgroundColor: '#fff',
    },
    img: {
        width: '95%',
        height: 175,
        borderRadius: 5
    },
    titleCard: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'rgb(145, 14, 14)',
        marginTop: 20,
        marginBottom: 10
    },
    desc: {
        fontSize: 18,
        color: '#444',
        padding: 10,
        marginVertical: 10,
        textAlign: 'center'
    },

    cardButtonText: {
        width: '90%',
        fontSize: 20,
        paddingVertical: 10,
        fontWeight: 'bold',
        backgroundColor: 'rgb(145, 14, 14)',
        color: 'white',
        textAlign: 'center',
        marginVertical: 10,
        borderRadius: 10,
    }
});