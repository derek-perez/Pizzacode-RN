import React, { useContext } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../../context/ThemeContext';

import { themeStyles } from '../../themeStyles';


interface Props {
    name: string;
    
    setText: (value: React.SetStateAction<string>) => void;
}

export const InputPassword = ({ name, setText }: Props) => {

    const { theme } = useContext(ThemeContext);

    return (
        <View style={styles.inputContainer}>
            <Text
                style={{
                    ...styles.inputTitle,
                    ...(theme === 'clear')
                        ? themeStyles.clearModeTitle
                        : themeStyles.darkModeTitle
                }}
            >
                {name}:
            </Text>

            <View 
                style={{
                    ...(theme === 'clear')
                        ? styles.inputWithIcon
                        : styles.inputWithIconDark
                }}
            >
                <Icon name='lock-open' size={25} color={(theme === 'clear') ? '#000' : '#ddd'} />
                <TextInput
                    style={{
                        ...(theme === 'clear')
                            ? styles.input
                            : styles.inputDark
                    }}
                    placeholder='******'
                    onChangeText={newText => setText(newText)}
                    placeholderTextColor='#aaa'
                    secureTextEntry
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    inputContainer: {
        width: '75%',
        marginTop: 35
    },
    inputTitle: {
        color: 'rgb(145, 14, 14)',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },

    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',

        borderColor: '#333',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    inputWithIconDark: {
        flexDirection: 'row',
        alignItems: 'center',

        borderColor: 'rgb(145, 14, 14)',
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 10,
    },


    input: {
        flex: 1,
        paddingHorizontal: 10,
        color: '#000'
    },
    inputDark: {
        flex: 1,
        paddingHorizontal: 10,
        color: 'white'
    }
})