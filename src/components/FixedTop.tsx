import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { ModalTheme } from './ModalTheme';

export const FixedTop = ({ title }: {title: string}) => {
  
    const [openModal, setOpenModal] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {/* TODO: Hacer el tema */}
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => setOpenModal(true)}
      >
        <Icon
          style={{
            paddingRight: 20,
          }}
          name='cog'
          size={30}
          color='#fff'
        />
      </TouchableOpacity>

          {
            openModal && (
              <ModalTheme active={true} openOrNot={() => setOpenModal(false)} />
            )
          }

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(145, 14, 14)',
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
})