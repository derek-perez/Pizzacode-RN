import React, { useContext, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { ThemeContext } from '../../context/ThemeContext';
import { InputPassword } from '../../components/cuentaScreen/InputPassword';

import { UserContext } from '../../context/UserContext';
import { themeStyles } from '../../themeStyles';
import pizzaApi from '../../api/pizzaApi';


export const ContraseñasScreen = () => {

  const { user, token } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');


  const handleUpdate = async () => {
    if (password2 !== password) {
      Alert.alert(
        'Error',
        'Las contraseñas no coinciden'
      )
    }

    if (password === '' && password2 === '') {
      Alert.alert(
        'Error',
        'Los campos de las contraseñas no pueden estar vacías'
      )
    }

    if ((password !== '' && password2 !== '') && (password2 === password)) {
      await pizzaApi.put('/usuarios/' + user._id, {
        password
      }, { headers: { 'x-token': token } })
        .then(res => {
          if (res.status === 200) {
            Alert.alert(
              'Actualización exitosa',
              'Se ha actualizado correctamente la contraseña'
            )

            setPassword('');
            setPassword2('');
          }
        })
        .catch(err => console.log(err.response.data))
    }
  }


  return (
    <View
      style={{
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
        <Icon name='lock-open' size={25} color={(theme === 'clear') ? 'rgb(145, 14, 14)' : 'white'} /> Cambia tu contraseña
      </Text>

      <Text
        style={{
          ...styles.subTitle,
          ...(theme === 'clear')
            ? themeStyles.clearModeText
            : themeStyles.darkModeText
        }}
      >
        (Aquí puedes cambiar la contraseña de tu cuenta)
      </Text>


      <InputPassword name='Contraseña nueva' setText={setPassword} />
      <InputPassword name='Repetir contraseña nueva' setText={setPassword2} />

      <TouchableOpacity
        onPress={handleUpdate}
        activeOpacity={0.7}
        style={styles.buttonUpdate}
      >
        <Text style={styles.buttonUpdateText}>Actualizar</Text>
      </TouchableOpacity>

    </View >
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 10
  },

  buttonUpdate: {
    backgroundColor: '#198754',
    padding: 10,
    marginTop: 50,
    borderRadius: 5
  },
  buttonUpdateText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },

});