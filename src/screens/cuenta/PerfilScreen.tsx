import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import pizzaApi from "../../api/pizzaApi";

import { ContentItemText } from "../../components/cuentaScreen/ContentItemText";
import { ThemeContext } from "../../context/ThemeContext";
import { UserContext } from "../../context/UserContext";
import { themeStyles } from "../../themeStyles";


export const PerfilScreen = () => {

    const { user, token } = useContext(UserContext);
    const { theme } = useContext(ThemeContext);

    const [name, setName] = useState(true);
    const [email, setEmail] = useState(true);
    const [telephone, setTelephone] = useState(true);
    const [buttonsContainer, setButtonsContainer] = useState(false);

    const [nameText, setNameText] = useState('');
    const [emailText, setEmailText] = useState('');
    const [telephoneText, setTelephoneText] = useState('');


    const handleUpdate = async () => {

        await pizzaApi.put('/usuarios/' + user._id, {
            nombre: nameText !== '' ? nameText : user.nombre,
            correo: emailText !== '' ? emailText : user.correo,
            telefono: telephoneText !== '' ? telephoneText : user.telefono
        }, { headers: { 'x-token': token } })
            .then(res => {
                if (res.status === 200) {
                    Alert.alert(
                        'Actualización exitosa',
                        'Se ha actualizado correctamente. Los cambios se verán reflejados en un momento'
                    )

                    setButtonsContainer(false);

                    setName(true);
                    setEmail(true);
                    setTelephone(true);
                }
            })
            .catch(err => console.log(err.response.data))

    }

    const handleCancel = () => {
        setName(true);
        setEmail(true);
        setTelephone(true);

        setButtonsContainer(false);
    }



    return (
        <View
            style={{
                ...styles.content,
                ...(theme === 'clear')
                    ? themeStyles.clearModeContainer
                    : themeStyles.darkModeContainer
            }}
        >
            <Text
                style={{
                    ...styles.title,
                    ...(theme === 'clear')
                        ? themeStyles.clearModeTitle
                        : themeStyles.darkModeTitle
                }}
            >
                <Icon name='person' size={25} color={(theme === 'clear') ? 'rgb(145, 14, 14)' : 'white'} /> La información de tu perfil:
            </Text>
            <Text
                style={{
                    marginBottom: 45,
                    fontSize: 18,
                    ...(theme === 'clear')
                        ? themeStyles.clearModeText
                        : themeStyles.darkModeText
                }}
            >
                (Presiona durante 3 segundos para editar)
            </Text>

            <View>
                <ContentItemText
                    icon={'person'}
                    boolean={name}
                    span={'Nombre'}
                    contentValue={user.nombre}
                    setBoolean={setName}
                    setText={setNameText}
                    setButtonsContainer={setButtonsContainer}
                />
                <ContentItemText
                    icon={'mail'}
                    boolean={email}
                    span={'Correo electrónico'}
                    contentValue={user.correo}
                    setBoolean={setEmail}
                    setText={setEmailText}
                    setButtonsContainer={setButtonsContainer}
                />
                <ContentItemText
                    icon={'call'}
                    boolean={telephone}
                    span={'Teléfono'}
                    contentValue={user.telefono}
                    setBoolean={setTelephone}
                    setText={setTelephoneText}
                    setButtonsContainer={setButtonsContainer}
                />
            </View>

            {
                (buttonsContainer) && (
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            onPress={handleUpdate}
                            activeOpacity={0.7}
                            style={styles.buttonUpdate}
                        >
                            <Text style={styles.buttonUpdateText}>Actualizar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={handleCancel}
                            activeOpacity={0.7}
                            style={styles.buttonCancel}
                        >
                            <Text style={styles.buttonCancelText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                )
            }

        </View>
    )
}


const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        color: 'rgb(145, 14, 14)',
        marginVertical: 15,
        marginBottom: 10,
        fontSize: 25
    },

    buttonsContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
        marginTop: 20
    },

    buttonUpdate: {
        backgroundColor: '#198754',
        padding: 10,
        marginVertical: 15,
        borderRadius: 5
    },
    buttonUpdateText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    buttonCancel: {
        backgroundColor: '#dc3545',
        padding: 10,
        marginVertical: 15,
        borderRadius: 5
    },
    buttonCancelText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    }

})