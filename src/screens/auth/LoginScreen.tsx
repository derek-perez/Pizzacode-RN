import React, { useContext, useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, ScrollView, Alert } from "react-native"

import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";


import { ThemeContext } from "../../context/ThemeContext";
import { UserContext } from "../../context/UserContext";
import { themeStyles } from "../../themeStyles";
import pizzaApi from "../../api/pizzaApi";
import { useNavigation } from "@react-navigation/native";



export const LoginScreen = () => {

    const { navigate } = useNavigation<StackNavigationProp<any, any>>();

    const { setUser, setToken } = useContext(UserContext);
    const { theme } = useContext(ThemeContext);

    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const regExp = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;

        if (correo === '' || password === '') {
            Alert.alert(
                'Error',
                'Todos los campos son obligatorios'
            )
        }

        if (correo !== '') {
            if (!regExp.test(correo)) {
                Alert.alert(
                    'Error',
                    'El correo no es válido'
                )
            }
        }

        await pizzaApi.post('/auth/login', {
            correo,
            password
        })
            .then(res => {
                setUser(res.data.usuario);
                setToken(res.data.token);
                AsyncStorage.setItem('token', res.data.token);

                navigate('CuentaNavigator')
            })
            .catch(err => {
                Alert.alert(
                    'Error',
                    'El correo o la contraseña son incorrectos'
                )
            })
    }


    return (
        <ScrollView
            contentContainerStyle={{
                ...styles.container,
                ...(theme === 'clear')
                    ? themeStyles.clearModeContainer
                    : themeStyles.darkModeContainer
            }}
        >
            <Icon
                onPress={() => navigate('TabsNavigator', { screen: 'HomeScreen' })}
                style={styles.icon}
                name='close'
                size={35}
                color={(theme === 'clear') ? 'rgb(145, 14, 14)' : '#fff'}
            />
            <Text
                style={{
                    ...styles.titleForm,
                    ...(theme === 'clear')
                        ? themeStyles.clearModeTitle
                        : themeStyles.darkModeTitle
                }}
            >
                Inicia sesión
            </Text>


            <View style={styles.contentCard}>
                <View style={styles.form}>
                    <View style={styles.formGroup}>
                        <Icon
                            name='mail'
                            size={25}
                            color={(theme === 'clear') ? '#000' : 'white'}
                        />
                        <TextInput
                            style={{
                                ...styles.formInput,
                                color: (theme === 'clear') ? 'black' : 'white'
                            }}
                            placeholder='Correo electrónico'
                            onChangeText={newText => setCorreo(newText)}
                            defaultValue={correo}
                            placeholderTextColor={(theme === 'clear') ? '#555' : '#888'}
                            keyboardType="email-address"
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <Icon
                            name='lock-closed'
                            size={25}
                            color={(theme === 'clear') ? '#000' : 'white'}
                        />
                        <TextInput
                            style={{
                                ...styles.formInput,
                                color: (theme === 'clear') ? 'black' : 'white'
                            }}
                            placeholder='******'
                            onChangeText={newText => setPassword(newText)}
                            defaultValue={password}
                            placeholderTextColor={(theme === 'clear') ? '#555' : '#888'}
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity onPress={handleLogin} activeOpacity={0.5} style={styles.button}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                color: 'white',
                                fontSize: 20
                            }}
                        >
                            Iniciar sesión
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.goToLogin}>
                    <Image source={require('../../assets/ingresar-image.png')} />
                    <Text
                        style={{
                            fontWeight: 'bold',
                            color: (theme === 'clear') ? 'rgb(145, 14, 14)' : 'white',
                            fontSize: 20,
                            marginVertical: 25
                        }}
                    >
                        ¿No tienes una cuenta? <Text onPress={() => navigate('RegisterScreen')} style={{ color: '#4a6da7' }}> Regístrate</Text>
                    </Text>
                </View>
            </View>

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: '100%',

        alignItems: 'center',

        paddingTop: 30        
    },
    icon: {
        position: 'absolute',
        top: 30,
        left: 20,
        fontWeight: 'bold',
    },
    titleForm: {
        fontWeight: 'bold',
        fontSize: 35,
        color: 'rgb(145, 14, 14)',
        marginBottom: 15
    },

    contentCard: {
        width: '100%',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        margin: 25
    },

    form: {
        width: '100%',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },

    formGroup: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,

        borderColor: 'rgb(145, 14, 14)',
        borderWidth: 2,

        padding: 10,
        borderRadius: 5,
    },
    formInput: {
        flex: 1,
        width: '100%',

        backgroundColor: 'transparent',
        marginLeft: 10,

        fontSize: 18
    },

    btnsSM: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 25,
    },
    titleSM: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10
    },
    buttonSocialMedia: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

        height: 50,
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 15,

        borderColor: 'rgb(145, 14, 14)',
        borderWidth: 2,
    },
    imgBtn: {
        width: 30,
        height: 30,
        marginRight: 15
    },
    imgBtnFacebook: {
        width: 40,
        height: 40,
        marginRight: 15
    },

    button: {
        width: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        height: 50,
        backgroundColor: 'rgb(145, 14, 14)',
        borderRadius: 10,
        marginBottom: 25
    },

    goToLogin: {
        width: '100%',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }

})