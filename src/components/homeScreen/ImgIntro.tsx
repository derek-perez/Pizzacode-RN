import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export const ImgIntro = () => {

    return (
        <View style={styles.containerImg}>
            <Image style={styles.img} source={require('../../assets/carousel1.jpg')} />
            <View style={styles.imgContainerText}>
                <Image style={styles.imgOnImg} source={require('../../assets/logo.png')} />
                <Text style={styles.textImg} >¡Ven y prueba lo que tenemos para ofrecerte!</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    containerImg: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: '#000',
        width: '100%',

        borderBottomColor: 'rgb(145, 14, 14)',
        borderBottomWidth: 10,

        shadowColor: 'rgb(0, 0, 0)',
        elevation: 10,
    },
    img: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        opacity: 0.4
    },
    imgContainerText: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgOnImg: {
        width: 150,
        height: 150,
        position: 'absolute',
        top: 10,
    },
    textImg: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        position: 'absolute',
        top: '50%',
        width: '100%',

        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10
    }
});