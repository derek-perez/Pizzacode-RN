import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { TabsNavigator } from './TabsNavigator';
import { MenuNavigator } from './MenuNavigator';
import { CuentaNavigator } from './CuentaNavigator';
import { AuthNavigator } from './AuthNavigator';

import { CarritoContext } from '../context/CarritoContext';
import { UserContext } from '../context/UserContext';


const Stack = createStackNavigator();

export const MainNavigator = () => {

  const { user, checkLogin } = useContext(UserContext);
  const { checkStore } = useContext(CarritoContext);

  useEffect(() => {
    checkStore();
    checkLogin();
  }, []);


  return (
    <Stack.Navigator
      initialRouteName='TabsNavigator'
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="TabsNavigator" component={TabsNavigator} />
      <Stack.Screen name="MenuNavigator" component={MenuNavigator} />
      <Stack.Screen name="CuentaNavigator" component={CuentaNavigator} />
      <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
    </Stack.Navigator>
  );
}