import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import pizzaApi from "../../api/pizzaApi";

import { ThemeContext } from "../../context/ThemeContext";
import { Direccion } from "../../interfaces";

import { themeStyles } from "../../themeStyles";


interface Props {
    direction: string;
    index: number;
}

export const DireccionCard = ({ direction, index }: Props) => {

    const { theme } = useContext(ThemeContext);
    const [direccion, setDireccion] = useState({} as Direccion);

    useEffect(() => {
        getDirection();
    }, []);

    const getDirection = async () => {
        await pizzaApi.get('/direcciones/' + direction)
            .then(res => {
                setDireccion(res.data);
            })
            .catch(console.log)
    }


    return (
        <View style={{
            ...styles.directionContainer,
            ...(theme === 'clear')
                ? themeStyles.clearModeCard
                : themeStyles.darkModeCard
        }}>
            <Text style={styles.titleDirectionContainer}><Icon name='home' size={25} /> Dirección #{index + 1}:</Text>
            <View style={styles.directionText}>
                <Text style={styles.strong}>Calle:</Text>
                <Text
                    style={{
                        ...(theme === 'clear')
                            ? styles.normal
                            : styles.normalDark
                    }}
                >
                    {direccion.calle}
                </Text>
            </View>
            <View style={styles.directionText}>
                <Text style={styles.strong}>Número:</Text>
                <Text
                    style={{
                        ...(theme === 'clear')
                            ? styles.normal
                            : styles.normalDark
                    }}
                >
                    {direccion.numero}
                </Text>
            </View>
            <View style={styles.directionText}>
                <Text style={styles.strong}>Colonia:</Text>
                <Text
                    style={{
                        ...(theme === 'clear')
                            ? styles.normal
                            : styles.normalDark
                    }}
                >
                    {direccion.colonia}
                </Text>
            </View>
            <View style={styles.directionText}>
                <Text style={styles.strong}>Ciudad:</Text>
                <Text
                    style={{
                        ...(theme === 'clear')
                            ? styles.normal
                            : styles.normalDark
                    }}
                >
                    {direccion.ciudad}
                </Text>
            </View>
            <View style={styles.directionText}>
                <Text style={styles.strong}>Estado:</Text>
                <Text
                    style={{
                        ...(theme === 'clear')
                            ? styles.normal
                            : styles.normalDark
                    }}
                >
                    {direccion.estado}
                </Text>
            </View>
            <View style={styles.directionText}>
                <Text style={styles.strong}>Código postal:</Text>
                <Text
                    style={{
                        ...(theme === 'clear')
                            ? styles.normal
                            : styles.normalDark
                    }}
                >
                    {direccion.codigoPostal}
                </Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    directionContainer: {
        width: '90%',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

        marginVertical: 15,
        marginHorizontal: 10,

        borderColor: 'rgb(145, 14, 14)',
        borderWidth: 1,
        borderRadius: 5,

        padding: 10
    },
    titleDirectionContainer: {
        borderBottomColor: 'rgb(145, 14, 14)',
        borderBottomWidth: 1,

        paddingVertical: 10,
        width: '100%',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgb(145, 14, 14)'
    },
    directionText: {
        width: '100%',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    strong: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'rgb(145, 14, 14)'
    },

    normal: {
        fontSize: 16,
        color: '#000'
    },
    normalDark: {
        fontSize: 16,
        color: '#ccc'
    }
})