import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CarritoContext } from '../../context/CarritoContext';
import { ThemeContext } from '../../context/ThemeContext';

import { ProductoNormal } from '../../interfaces';
import { themeStyles } from '../../themeStyles';



export const CardCart = ({ data }: { data: ProductoNormal }) => {

    const { theme } = useContext(ThemeContext);
    const { store, setStore, setPrecioTotalCarrito } = useContext(CarritoContext);

    const [cantidad, setCantidad] = useState(1);

    const { _id, nombre, descripcion, imagen, precio } = data;
    const [precioTotal, setPrecioTotal] = useState(precio || 0);

    useEffect(() => {
        setPrecioTotalCarrito((prev: number) => prev + precioTotal);
    }, []);

    useEffect(() => {
        store.filter((producto: ProductoNormal) => {
            if (producto._id === _id) {
                producto.cantidad = cantidad;
                producto.precioTotal = precioTotal;

                setStore([...store]);
            };
        });
    }, [precio, cantidad])



    const handleRemoveProduct = () => {
        if (precio) {
            if (cantidad > 1) {
                setCantidad(cantidad - 1);
                setPrecioTotal(precioTotal - precio);

                setPrecioTotalCarrito((prev: number) => prev - precio);
            }
        }
    }

    const handleAddProduct = () => {
        if (precio) {
            setCantidad(cantidad + 1);
            setPrecioTotal(precioTotal + precio);

            setPrecioTotalCarrito((prev: number) => prev + precio);
        }
    }

    const deleteProduct = () => {
        AsyncStorage.getItem('store')
            .then(res => {
                const storage = JSON.parse(res || '[]');

                if (storage !== []) {
                    storage.splice(storage.indexOf(_id), 1);

                    setTimeout(() => {
                        AsyncStorage.setItem('store', JSON.stringify(storage));

                        setStore([...storage]);
                    }, 250);
                }
            })

        setPrecioTotalCarrito((prev: number) => prev - precioTotal);
    }


    return (
        <View style={{
            ...styles.card,
            ...(theme === 'clear')
                ? themeStyles.clearModeCard
                : themeStyles.darkModeCard
        }}>
            <Image style={styles.img} source={{ uri: imagen }} />
            <Text style={{
                ...styles.cardTitle,
                ...(theme === 'clear')
                    ? themeStyles.clearModeTitle
                    : themeStyles.darkModeTitle,
            }}>
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

            <Text style={{
                ...styles.cardPriceText,
                ...(theme === 'clear')
                    ? themeStyles.clearModeTitle
                    : themeStyles.darkModeTitle,
            }}>
                ${precioTotal}
            </Text>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={handleRemoveProduct}
                    style={{
                        ...styles.button,
                        ...styles.buttonLeft
                    }}
                >
                    <Text style={{
                        ...styles.buttonsAdd,
                        ...(theme === 'clear')
                            ? themeStyles.clearModeText
                            : themeStyles.darkModeText
                    }}>
                        -
                    </Text>
                </TouchableOpacity>

                <Text style={{
                    ...styles.button,
                    ...(theme === 'clear')
                        ? themeStyles.clearModeText
                        : themeStyles.darkModeText
                }}>
                    {cantidad}
                </Text>

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={handleAddProduct}
                    style={{
                        ...styles.button,
                        ...styles.buttonRight
                    }}
                >
                    <Text style={{
                        ...styles.buttonsAdd,
                        ...(theme === 'clear')
                            ? themeStyles.clearModeText
                            : themeStyles.darkModeText
                    }}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={deleteProduct}
                style={styles.cardButton}
            >
                <Text style={styles.cardButtonText}>Quitar del carrito</Text>
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

        height: 525,
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

        borderRadius: 10,
    },
    cardTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        color: 'rgb(145, 14, 14)',
    },
    cardDescription: {
        fontSize: 18,
        paddingHorizontal: 10,
        color: '#444',
    },

    cardPriceText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgb(145, 14, 14)'
    },

    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',

        marginVertical: 10,
    },

    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        fontSize: 20,
        textAlign: 'center',

        borderWidth: 0,
    },
    buttonsAdd: {
        fontSize: 20,
        paddingVertical: 1,
        fontWeight: 'bold'
    },
    buttonLeft: {
        borderWidth: 2,
        borderColor: 'rgb(145, 14, 14)',
        borderRadius: 100,

        paddingHorizontal: 10,
        marginHorizontal: 10
    },
    buttonRight: {
        borderWidth: 2,
        borderColor: 'rgb(145, 14, 14)',
        borderRadius: 100,

        paddingHorizontal: 10,
        marginHorizontal: 10
    },

    cardButton: {
        width: '90%',
        padding: 10,
        backgroundColor: 'rgb(145, 14, 14)',
        textAlign: 'center',
        marginVertical: 10,
        borderRadius: 10,
    },
    cardButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    }
})