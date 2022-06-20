import { StyleSheet } from "react-native";

export const themeStyles = StyleSheet.create({
    clearModeContainer: {
        backgroundColor: '#fff',
    },
    darkModeContainer: {
        backgroundColor: '#333',
        color: 'white'
    },

    clearModeCard: {
        backgroundColor: '#fff',
    },
    darkModeCard: {
        backgroundColor: '#000',
        borderColor: '#333',
        borderBottomColor: '#333',
    },
    
    clearModeTitle: {
        color: 'rgb(145, 14, 14)'
    },
    clearModeTitleRed: {
        color: 'rgb(145, 14, 14)',

        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    darkModeTitle: {
        color: 'white',
        textShadowColor: '#111',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
    },
    darkModeTitleWhite: {
        color: '#fff',

        textShadowColor: '#000',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
    },

    clearModeText: {
        color: '#000'
    },
    darkModeText: {
        color: '#fff'
    },

});