import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

import { Appearance } from "react-native";


export interface ThemeContextProps {
    theme: string;
    themeChange: string;
    
    setThemeChange: Dispatch<SetStateAction<string>>;
}

export const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeContextProvider = ({ children }: any) => {
    const [themeChange, setThemeChange] = useState('');
    const [theme, setTheme] = useState('');

    const themeLoaded = AsyncStorage.getItem('checkbox');

    const checkTheme = async () => {
        if (await themeLoaded === 'predetermined') {
            setThemeChange('predetermined');
            Appearance.getColorScheme() === 'light'
                ? setTheme('clear')
                : setTheme('dark');

        } else if (await themeLoaded === 'clear') {
            setThemeChange('clear');
            setTheme('clear');
            
        } else if (await themeLoaded === 'dark') {
            setThemeChange('dark');
            setTheme('dark');
        }
    }

    useEffect(() => {
        checkTheme();
    }, []);
    
    useEffect(() => {
        if (themeChange === 'predetermined') {
            Appearance.getColorScheme() === 'light'
                ? setTheme('clear')
                : setTheme('dark');
        } else if (themeChange === 'clear') {
            setTheme('clear');
        } else if (themeChange === 'dark') {
            setTheme('dark');
        }
    }, [themeChange]);
    


    return (
        <ThemeContext.Provider
            value={{
                theme,
                themeChange,
                
                setThemeChange
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
};