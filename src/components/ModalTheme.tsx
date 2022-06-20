import React, { useContext, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../context/ThemeContext';


export const ModalTheme = ({ active, openOrNot }: { active: boolean, openOrNot: () => void }) => {

    const { setThemeChange } = useContext(ThemeContext);
    const [openModal, setOpenModal] = useState(active);

    const [activeCheckbox1, setActiveCheckbox1] = useState(true);
    const [activeCheckbox2, setActiveCheckbox2] = useState(false);
    const [activeCheckbox3, setActiveCheckbox3] = useState(false);

    // Lógica del cambio de tema
    const changeTheme = async (id?: string | undefined, justNow?: boolean) => {

        const checkbox = AsyncStorage.getItem('checkbox');

        if (justNow) {
            if (await checkbox === 'predetermined') {
                setActiveCheckbox1(true);
                setActiveCheckbox2(false);
                setActiveCheckbox3(false);
            } else if (await checkbox === 'clear') {
                setActiveCheckbox1(false);
                setActiveCheckbox2(true);
                setActiveCheckbox3(false);
            } else if (await checkbox === 'dark') {
                setActiveCheckbox1(false);
                setActiveCheckbox2(false);
                setActiveCheckbox3(true);
            }
        }


        if (id) {
            switch (id) {
                case '1':
                    setActiveCheckbox1(true);
                    setActiveCheckbox2(false);
                    setActiveCheckbox3(false);

                    setThemeChange('predetermined');
                    AsyncStorage.setItem('checkbox', 'predetermined');
                    break;
                case '2':
                    setActiveCheckbox1(false);
                    setActiveCheckbox2(true);
                    setActiveCheckbox3(false);

                    setThemeChange('clear');
                    AsyncStorage.setItem('checkbox', 'clear');
                    break;
                case '3':
                    setActiveCheckbox1(false);
                    setActiveCheckbox2(false);
                    setActiveCheckbox3(true);

                    setThemeChange('dark');
                    AsyncStorage.setItem('checkbox', 'dark');
                    break;
            }
        }
    };

    changeTheme(undefined, true);


    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={openModal}
            onDismiss={() => setOpenModal(false)}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>Escoje el tema de la aplicación</Text>

                    <View style={styles.optionsContainer}>
                        <TouchableOpacity
                            activeOpacity={0.3}
                            style={styles.option}
                            onPress={() => changeTheme('1')}
                        >
                            <Icon
                                name='ellipse-outline'
                                size={25}
                                color='black'
                                style={{
                                    ...styles.optionCheckbox,
                                    ...(activeCheckbox1) ? styles.checkboxActive : '',
                                }}
                            />
                            <Text style={styles.optionText}>Tema predeterminado</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.3}
                            style={styles.option}
                            onPress={() => changeTheme('2')}
                        >
                            <Icon
                                name='ellipse-outline'
                                size={25}
                                color='black'
                                style={{
                                    ...styles.optionCheckbox,
                                    ...(activeCheckbox2) ? styles.checkboxActive : '',
                                }}
                            />
                            <Text style={styles.optionText}>Tema claro</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.3}
                            style={styles.option}
                            onPress={() => changeTheme('3')}
                        >
                            <Icon
                                name='ellipse-outline'
                                size={25}
                                color='black'
                                style={{
                                    ...styles.optionCheckbox,
                                    ...(activeCheckbox3) ? styles.checkboxActive : '',
                                }}
                            />
                            <Text style={styles.optionText}>Tema oscuro</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                            setOpenModal(false);
                            openOrNot();
                        }}
                    >
                        <Text style={styles.button}>Cerrar ventana</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',

        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: '80%',
        height: 450,
        backgroundColor: '#fff',
        borderRadius: 10,

        justifyContent: 'space-between',

        borderTopColor: 'rgb(145, 14, 14)',
        borderTopWidth: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        paddingVertical: 40,

        marginBottom: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },

    optionsContainer: {
        padding: 20,
        paddingBottom: 0
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    optionCheckbox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        width: 25,
        height: 25
    },
    checkboxActive: {
        borderRadius: 100,
        color: 'white',
        backgroundColor: 'rgb(145, 14, 14)',
    },
    optionText: {
        fontSize: 20,
        color: 'black',
        marginLeft: 5
    },

    button: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgb(145, 14, 14)',
        textAlign: 'center',
        paddingVertical: 20,
    }
});