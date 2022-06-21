import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Ionicons';

import { ThemeContext } from '../../context/ThemeContext';
import { CreditCardComponent } from '../../components/cuentaScreen/CreditCardComponent';

import { themeStyles } from '../../themeStyles';
import { UserContext } from '../../context/UserContext';


export const TarjetasScreen = () => {

  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);

  return (
    <ScrollView
      contentContainerStyle={{
        ...styles.container,
        ...(theme === 'clear')
          ? themeStyles.clearModeContainer
          : themeStyles.darkModeContainer,
      }}
    >
      <Text
        style={{
          ...styles.title,
          ...(theme === 'clear')
            ? themeStyles.clearModeTitle
            : themeStyles.darkModeTitle
        }}
      >
        <Icon name='card' size={30} /> Tus tarjetas:
      </Text>

      <Text
        style={{
          ...styles.subTitle,
          ...(theme === 'clear')
            ? themeStyles.clearModeText
            : themeStyles.darkModeText
        }}
      >
        (Estos son los métodos de pago o tarjetas que has usado o proporcionado en alguna de tus compras)
      </Text>

      <View style={styles.cardContainer}>
        {
          (user && user.cards !== []) && (
            user.cards.map((id: string, index: number) => (
              <CreditCardComponent key={id} card={id} index={index} />
            ))
          )
        }
      </View>

    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    color: 'rgb(145, 14, 14)',
    marginVertical: 15,
    fontSize: 30,
    fontWeight: 'bold'
  },
  subTitle: {
    color: '#000',
    fontSize: 16,
    paddingHorizontal: 20
  },

  cardContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginVertical: 25
  }

});