import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { CarritoContext } from '../../context/CarritoContext';

import { ThemeContext } from '../../context/ThemeContext';
import { Producto, ProductoNormal } from '../../interfaces';
import { themeStyles } from '../../themeStyles';


export const Card = ({ data, inlineStyles }: { data: ProductoNormal, inlineStyles?: object }) => {

    const { theme } = useContext(ThemeContext);
    const { setStore } = useContext(CarritoContext);
    const [clicked, setClicked] = useState(0);

    const { _id, nombre, descripcion, imagen, precio } = data;

    useEffect(() => {
        notAdd();
    }, [])

    const notAdd = async () => {
        const store = await AsyncStorage.getItem('store');

        if (store) {
            const idInStore = JSON.parse(store);

            if (idInStore.includes(_id)) {
                setClicked(1);
            }
        }

    }


    return (
        <View
            key={_id}
            style={{
                ...styles.card,
                ...inlineStyles,
                ...(theme === 'clear')
                    ? themeStyles.clearModeCard
                    : themeStyles.darkModeCard,
            }}
        >
            <Image style={styles.img} source={{ uri: imagen }} />
            <Text
                style={{
                    ...styles.cardTitle,
                    ...(theme === 'clear')
                        ? themeStyles.clearModeTitle
                        : themeStyles.darkModeTitle
                }}
            >
                {nombre}
            </Text>
            <Text style={{
                ...styles.cardDescription,
                ...(theme === 'clear')
                    ? themeStyles.clearModeText
                    : themeStyles.darkModeText,
            }}>
                {descripcion}
            </Text>

            <Text
                style={{
                    ...styles.cardPriceText,
                    ...(theme === 'clear')
                        ? themeStyles.clearModeText
                        : themeStyles.darkModeText
                }}
            >
                ${precio}
            </Text>

            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.cardButton}
                onPress={() => {
                    if (clicked < 1) {
                        setClicked(clicked + 1);
                        setStore((prevState: ProductoNormal[]) =>
                            [
                                ...prevState,
                                {
                                    _id,
                                    nombre,
                                    descripcion,
                                    imagen,
                                    precio
                                }
                            ]);
                    }
                }}
            >
                <Text
                    style={{
                        ...styles.buttonText,
                        ...(theme === 'clear')
                            ? themeStyles.clearModeText
                            : themeStyles.darkModeText
                    }}
                >
                    Añadir al carrito <Icon style={{ fontSize: 18 }} name='chevron-forward' />
                </Text>
            </TouchableOpacity>

        </View>
    )
}


const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        backgroundColor: '#fff',

        height: 500,
        marginVertical: 25,
        padding: 10,

        borderTopColor: 'rgb(154, 14, 14)',
        borderTopWidth: 15,

        borderColor: '#aaa',
        borderWidth: 1.5,
        borderRadius: 10,
    },
    img: {
        width: 300,
        height: 175,

        borderRadius: 5,
    },
    cardTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'rgb(145, 14, 14)',
        marginVertical: 10,
    },
    cardDescription: {
        fontSize: 18,
        paddingHorizontal: 10,
        color: '#444'
    },

    cardPriceText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgb(145, 14, 14)'
    },

    cardButton: {
        width: '100%',
        backgroundColor: 'rgb(145, 14, 14)',
        padding: 10,
        textAlign: 'center',
        marginVertical: 10,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})