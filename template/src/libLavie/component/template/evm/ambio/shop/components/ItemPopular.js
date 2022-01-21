import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Typography, BasicButton, Icon, Block } from '@uiCore'
import { LIGHT } from '@uiCore/Theme/colors'
export function ItemPopular ({ onPress, name }) {
  return (
    <TouchableOpacity style={styles.itemKeyPopular} onPress={onPress}>
      <Typography
        numberOfLines={1}
        style={{ fontSize: 14 }}
        color={LIGHT.text}
        maxLength={150}
      >
        {name}
      </Typography>
    </TouchableOpacity>
  )
}
export const ItemSearch = ({ name, onRemove, onPress }) => {
  return (
    <BasicButton onPress={onPress}>
      <Block row justifyContentSB height={50} style={styles.itemSearch}>
        <Typography color={LIGHT.text}>{name}</Typography>
        <BasicButton onPress={onRemove}>
          <Icon name='close-outline' family='Ionicons' size={30} color='red' />
        </BasicButton>
      </Block>
    </BasicButton>
  )
}
const styles = StyleSheet.create({
  itemSearch: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#C7C6C69D',
    marginHorizontal: 10
  },
  itemKeyPopular: {
    minWidth: 100,
    maxWidth: 150,
    height: 40,
    backgroundColor: LIGHT.card,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    paddingHorizontal: 5
  }
})
