import React, { useContext } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import { ThemeContext } from '../../context/ThemeContext';
import { UserContext } from '../../context/UserContext';
import { ReciboComponent } from '../../components/cuentaScreen/ReciboComponent';

import { themeStyles } from '../../themeStyles';


export const PagosScreen = () => {

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
        <Icon name='receipt' size={25} color={(theme === 'clear') ? 'rgb(145, 14, 14)' : 'white'} /> Tus pagos:
      </Text>

      <Text
        style={{
          ...styles.subTitle,
          ...(theme === 'clear')
            ? themeStyles.clearModeText
            : themeStyles.darkModeText
        }}
      >
        (Este es tu historial de los pagos que has hecho)
      </Text>

      <View style={styles.pagosContainer}>
        {
          user.pagos !== [] && (
            user.pagos.map((id: string, index: number) => (
              <ReciboComponent key={id} payment={id} index={index} />
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
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    marginVertical: 15,
    color: 'rgb(145, 14, 14)',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 18,
    color: '#000',
    paddingHorizontal: 10
  },

  pagosContainer: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    marginVertical: 25
  }
});