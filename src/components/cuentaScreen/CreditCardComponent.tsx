import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import pizzaApi from '../../api/pizzaApi';

import { Tarjeta } from '../../interfaces';


interface Props {
    card: string;
    index: number;
}

export const CreditCardComponent = ({ card, index }: Props) => {

    const [tarjeta, setTarjeta] = useState({} as Tarjeta);

    let numberCard1 = '';
    let numberCard2 = '';
    let numberCard3 = '';
    let numberCard4 = '';

    if (tarjeta.numero) {
        numberCard1 = tarjeta.numero.substring(0, 4);
        numberCard2 = tarjeta.numero.substring(4, 8);
        numberCard3 = tarjeta.numero.substring(8, 12);
        numberCard4 = tarjeta.numero.substring(12, 16);
    }
    
    useEffect(() => {
        getTarjeta();
    }, []);
    
    const getTarjeta = async () => {
        await pizzaApi.get('/tarjetas/' + card)
            .then(res => {
                setTarjeta(res.data);
            })
            .catch(console.log)
    }


    return (
        <View style={styles.card}>
            <View style={styles.topCard}>
                <Text style={styles.titleCard}>Tarjeta #{index + 1}</Text>
            </View>

            <Image source={require('../../assets/chip-card.png')} style={styles.chipImg} />

            <Text style={styles.cardNumber}>{numberCard1}   {numberCard2}   {numberCard3}   {numberCard4}</Text>
            <View style={styles.sectionCardNumbers}>
                <Text style={{ marginTop: 5, color: '#fff' }}>{tarjeta.cvv}</Text>
                <Text style={{ marginTop: 5, color: '#fff' }}>{tarjeta.fechaExpiracion}</Text>
            </View>

            <Text style={{color: '#fff'}}>{tarjeta.nombre}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    card: {
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

        borderRadius: 10,

        padding: 20,
        margin: 20,
        
        backgroundColor: 'rgba(145, 14, 14, 0.8)',
        color: 'white',
        fontSize: 18,

        shadowColor: '#000',
        elevation: 10,
    },
    titleCard: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },

    topCard: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    chipImg: {
        height: 65,
        width: 65,
        marginTop: 30
    },
    cardNumber: {
        width: '100%',
        letterSpacing: 2,
        fontSize: 23,
        marginBottom: 0,
        color: '#fff'
    },
    sectionCardNumbers: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        fontSize: 17
    }
})