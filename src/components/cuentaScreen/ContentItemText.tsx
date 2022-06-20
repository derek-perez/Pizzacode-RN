import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import { ThemeContext } from '../../context/ThemeContext';
import { themeStyles } from '../../themeStyles';

// TODO: Agregar llamada a funcion para guardar datos
interface ItemProps {
    icon: any;
    boolean: boolean;
    span: string;
    contentValue: string;

    setText: (value: React.SetStateAction<string>) => void;
    setBoolean: (value: React.SetStateAction<boolean>) => void
    setButtonsContainer: (value: React.SetStateAction<boolean>) => void;
}


export const ContentItemText = ({ icon, boolean, span, contentValue, setBoolean, setText, setButtonsContainer }: ItemProps) => {

    const { theme } = useContext(ThemeContext);
    const [textContent, setTextContent] = useState(contentValue);

    const handleClick = () => {
        setBoolean(false);
        setButtonsContainer(true);
    }

    const handleChange = (e: string) => {
        setText(e);
        setTextContent(e);
    }


    return (
        <View style={styles.contentItemText}>
            <View
                style={{
                    ...styles.contentItemLabel
                }}
            >
                <Icon name={icon} size={25} color={(theme === 'clear') ? 'rgb(145, 14, 14)': 'white'} style={{ marginRight: 10 }} />
                <Text
                    style={{
                        ...styles.contentItemTextMain,
                        ...(theme === 'clear')
                            ? themeStyles.clearModeTitleRed
                            : themeStyles.darkModeTitleWhite
                    }}
                >
                    {span}:
                </Text>
            </View>
            {
                (boolean)
                    ?
                    <View>
                        <Text
                            onLongPress={handleClick}
                            style={{
                                ...styles.contentItemTextInfo,
                                ...(theme === 'clear')
                                    ? themeStyles.clearModeText
                                    : themeStyles.darkModeText
                            }}
                        >
                            {contentValue}
                        </Text>
                    </View>

                    :
                    <View>
                        <TextInput
                            style={{
                                ...styles.input,
                                ...(theme === 'clear')
                                    ? themeStyles.clearModeText
                                    : themeStyles.darkModeText
                            }}
                            autoFocus
                            value={textContent}
                            onChangeText={handleChange}
                            autoCapitalize={'none'}
                        />
                    </View>
            }
        </View>
    )
}



const styles = StyleSheet.create({
    contentItemText: {
        display: 'flex',
        alignItems: 'center',
        minWidth: 350,

        borderTopWidth: 2,
        borderTopColor: 'rgb(145, 14, 14)',

        borderBottomWidth: 2,
        borderBottomColor: 'rgb(145, 14, 14)',

        marginBottom: 20,
        padding: 10,
    },
    contentItemLabel: {
        width: '100%',

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },

    contentItemTextMain: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    contentItemTextInfo: {
        fontSize: 18,
        marginLeft: 10,
    },
    input: {
        width: 325,
        marginLeft: 10,
        color: 'black',

        borderWidth: 1,
        borderColor: 'rgb(145, 14, 14)',

        padding: 5,
        borderRadius: 5,
    },
})