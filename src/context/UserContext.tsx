import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import pizzaApi from "../api/pizzaApi";
import { UserProps } from "../interfaces";


interface ContextProps {
    user: UserProps;
    token: string;

    checkLogin: () => void;
    setUser: React.Dispatch<React.SetStateAction<UserProps>>;
    setToken: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext({} as ContextProps);

export const UserContextProvider = ({ children }: any) => {
    const [user, setUser] = useState({} as UserProps);
    const [token, setToken] = useState('');

    useEffect(() => {
        if (Object.entries(user).length !== 0) {
            AsyncStorage.setItem('user', JSON.stringify(user.correo));
        }
    }, [user]);

    const checkLogin = async () => {
        const userStorage = await AsyncStorage.getItem('user');
        const userLS = await JSON.parse(userStorage || '{}');

        if (userLS.length > 0) {
            await pizzaApi.post('/auth/loginEmail', { correo: userLS })
                .then(res => {
                    setUser(res.data.usuario);
                    setToken(res.data.token);

                    AsyncStorage.setItem('user', JSON.stringify(res.data.usuario.correo));
                    AsyncStorage.setItem('token', JSON.stringify(res.data.token));
                })
                .catch(console.log)
        }

    }


    return (
        <UserContext.Provider value={{
            user,
            token,

            checkLogin,
            setUser,
            setToken
        }}>
            {children}
        </UserContext.Provider>
    )
}