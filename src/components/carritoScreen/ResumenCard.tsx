import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { ThemeContext } from '../../context/ThemeContext';
import { ProductoNormal } from '../../interfaces';
import { themeStyles } from '../../themeStyles';


export const ResumenCard = ({producto}: {producto: ProductoNormal}) => {

    const { theme } = useContext(ThemeContext);

    return (
        <View key={producto._id} style={styles.resumenTextContainer}>
            <Text
                style={{
                    ...styles.resumenText,
                    ...(theme === 'clear')
                        ? themeStyles.clearModeText
                        : themeStyles.darkModeText
                }}
            >
                <Text>{producto.nombre}: </Text>
                <Text style={{ fontWeight: 'bold' }}>{producto.cantidad}</Text>
            </Text>

            <Text
                style={{
                    ...styles.resumenText,
                    fontWeight: 'bold',
                    ...(theme === 'clear')
                        ? themeStyles.clearModeText
                        : themeStyles.darkModeText
                }}
            >
                <Text>Precio: ${producto.precioTotal}</Text>
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    resumenTextContainer: {
        width: '75%',
        display: 'flex',
        alignItems: 'flex-start',

        borderTopColor: 'rgb(154, 14, 14)',
        borderTopWidth: 2,
        paddingVertical: 15,

    },
    resumenText: {
        height: 30,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontSize: 18
    }
});