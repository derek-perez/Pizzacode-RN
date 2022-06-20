import React, { useContext } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import { UserContext } from '../../context/UserContext';
import { ThemeContext } from '../../context/ThemeContext';
import { DireccionCard } from '../../components/cuentaScreen/DireccionCard';

import { themeStyles } from '../../themeStyles';


export const DireccionesScreen = () => {

  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);

  return (
    <ScrollView
      contentContainerStyle={{
        ...styles.container,
        ...(theme === 'clear')
          ? themeStyles.clearModeContainer
          : themeStyles.darkModeContainer
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
        <Icon name='map' size={25} /> Tus direcciones:
      </Text>

      <Text
        style={{
          ...styles.subTitle,
          ...(theme === 'clear')
            ? themeStyles.clearModeText
            : themeStyles.darkModeText
        }}
      >
        (Aquí aparecen las direcciones que en alguna vez has ocupado en alguna compra)
      </Text>

      <View style={styles.addressContainer}>
        {
          user.direcciones !== [] && (
            user.direcciones.map((id: string, index: number) => (
              <DireccionCard key={id} direction={id} index={index} />
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
    fontSize: 25,
    fontWeight: 'bold'
  },
  subTitle: {
    color: '#000',
    fontSize: 16,
    paddingHorizontal: 20
  },

  addressContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  }

});