import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

import { ThemeContextProvider } from './src/context/ThemeContext';
import { MainNavigator } from './src/navigators/MainNavigator';
import { CarritoContextProvider } from './src/context/CarritoContext';
import { UserContextProvider } from './src/context/UserContext';


const App = () => {
  return (
    <NavigationContainer>
      {/* El context del user */}
      <UserContextProvider>
        {/* El context del carrito */}
        <CarritoContextProvider>
          {/* El context del tema */}
          <ThemeContextProvider>
            {/* La app */}
            <MainNavigator />
          </ThemeContextProvider>
        </CarritoContextProvider>
      </UserContextProvider>
    </NavigationContainer>
  )
}


export default App;