import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import pizzaApi from "../../api/pizzaApi";

import { ThemeContext } from "../../context/ThemeContext";
import { Pago, PagoEnHistorial } from "../../interfaces";

import { themeStyles } from "../../themeStyles";


interface Props {
    payment: string;
    index: number;
}

export const ReciboComponent = ({ payment, index }: Props) => {

    const { theme } = useContext(ThemeContext);
    const [pago, setPago] = useState({} as Pago);
    const [productos, setProductos] = useState([] as PagoEnHistorial[]);

    useEffect(() => {
        getPago();
    }, []);

    const getPago = async () => {
        await pizzaApi.get('/pagos/' + payment)
            .then(res => {
                setPago(res.data);

                const productosToMap = eval(`[${res.data.productos[0]}]`);
                setProductos(productosToMap);
            })
            .catch(console.log)
    }


    return (
        <View
            style={{
                ...styles.receipt,
                ...(theme === 'clear')
                    ? themeStyles.clearModeCard
                    : themeStyles.darkModeCard
            }}
        >
            <View style={styles.receiptHeader}>
                <Text
                    style={{
                        fontSize: 18,
                        ...(theme === 'clear')
                            ? themeStyles.clearModeText
                            : themeStyles.darkModeText
                    }}
                >
                    Pago #{index + 1}
                </Text>
                <Text
                    style={{
                        fontSize: 18,
                        ...(theme === 'clear')
                            ? themeStyles.clearModeText
                            : themeStyles.darkModeText
                    }}
                >
                    {pago.fecha}
                </Text>
            </View>

            <View style={styles.receiptBody}>
                {
                    productos.map((pago: PagoEnHistorial) => (
                        <View key={pago.total + Math.random()} style={styles.itemBody}>
                            <Text
                                style={{
                                    ...styles.itemProduct,
                                    ...(theme === 'clear')
                                        ? themeStyles.clearModeText
                                        : themeStyles.darkModeText
                                }}
                            >
                                Producto: {pago.cantidad} {pago.producto}
                            </Text>
                            <Text
                                style={{
                                    ...styles.itemTotal,
                                    ...(theme === 'clear')
                                        ? themeStyles.clearModeTitle
                                        : themeStyles.darkModeTitle
                                }}
                            >
                                ${pago.total}.00
                            </Text>
                        </View>
                    ))
                }


                <View style={{
                    ...styles.itemBody,
                    marginTop: 35,

                    borderTopColor: 'rgb(145, 14, 14)',
                    borderTopWidth: 1,

                    paddingTop: 10
                }}>
                    <Text
                        style={{
                            ...styles.itemProduct,
                            ...(theme === 'clear')
                                ? themeStyles.clearModeText
                                : themeStyles.darkModeText
                        }}>
                        Total:
                    </Text>
                    <Text
                        style={{
                            ...styles.itemTotal,
                            ...(theme === 'clear')
                                ? themeStyles.clearModeTitle
                                : themeStyles.darkModeTitle
                        }}
                    >
                        ${pago.total}.00
                    </Text>
                </View>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    receipt: {
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        marginVertical: 20,
        padding: 20,

        borderColor: 'rgb(145, 14, 14)',
        borderWidth: 1,
        borderRadius: 5,

        backgroundColor: 'rgb(255, 255, 255)',
    },
    receiptHeader: {
        width: '100%',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginBottom: 25,
        paddingBottom: 10,

        borderBottomWidth: 1,
        borderBottomColor: 'rgb(145, 14, 14)',
    },

    receiptBody: {
        width: '100%'
    },
    itemBody: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 5
    },
    itemProduct: {
        margin: 0,
        color: '#000',
        fontSize: 16
    },
    itemTotal: {
        color: 'rgb(145, 14, 14)',
        fontWeight: 'bold',
        margin: 0
    }
})