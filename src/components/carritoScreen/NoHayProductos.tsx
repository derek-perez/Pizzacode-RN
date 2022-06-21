import React, { useContext } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import Icon from 'react-native-vector-icons/Ionicons'

import { ThemeContext } from '../../context/ThemeContext'
import { themeStyles } from '../../themeStyles'


export const NoHayProductos = () => {

    const { theme } = useContext(ThemeContext)
    const { navigate } = useNavigation<StackNavigationProp<any, any>>();

    return (
        <View
            style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 100
            }}
        >
            <Text
                style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    borderTopColor: 'rgb(145, 14, 14)',
                    borderTopWidth: 2,
                    paddingTop: 20,
                    ...(theme === 'clear')
                        ? themeStyles.clearModeTitle
                        : themeStyles.darkModeTitle,
                }}
            >
                No hay productos en el carrito
            </Text>

            <TouchableOpacity
                onPress={() => navigate('MenuNavigator')}
                style={{
                    width: 275,
                    padding: 10,

                    backgroundColor: 'rgb(154, 14, 14)',
                    borderColor: 'rgb(154, 14, 14)',
                    borderWidth: 2,
                    borderRadius: 5,

                    marginVertical: 20
                }}
                activeOpacity={0.7}
            >
                <Text
                    style={{
                        fontSize: 20,
                        textAlign: 'center',
                        color: '#fff'
                    }}
                >
                    <Icon size={20} name='add' /> Agregar producto
                </Text>
            </TouchableOpacity>

        </View>
    )
}
