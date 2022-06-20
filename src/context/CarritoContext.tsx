import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ProductoNormal } from "../interfaces";


export const CarritoContext = createContext({} as any);

export const CarritoContextProvider = ({ children }: any) => {
    const [store, setStore] = useState([] as ProductoNormal[]);
    const [precioTotalCarrito, setPrecioTotalCarrito] = useState(0);

    useEffect(() => {
        if (store && store.length > 0) {
            AsyncStorage.setItem('store', JSON.stringify(store));

            setStore(store);
        }
    }, [store]);

    const checkStore = async () => {
        const storePrev = await AsyncStorage.getItem('store');
        const storeProducts = JSON.parse(String(storePrev));

        return setStore(storeProducts);
    }


    return (
        <CarritoContext.Provider
            value={{
                store,
                precioTotalCarrito,

                checkStore,
                setStore,
                setPrecioTotalCarrito
            }}
        >
            {children}
        </CarritoContext.Provider>
    )
}