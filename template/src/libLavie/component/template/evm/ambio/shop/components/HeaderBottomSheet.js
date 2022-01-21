import React from 'react'
import {Block, Typography, Icon} from '@uiCore'
const HeaderBottomSheet = ({
  onPress,
  title,
  icon,
  colorIcon,
  colorTitle,
  backgroundColor,
  borderRadius
}) => {
  return (
    <Block
      row
      height={50}
      middle
      backgroundColor={backgroundColor}
      style={{
        paddingHorizontal: 10,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: '#fff',
        borderTopLeftRadius:borderRadius,
        borderTopRightRadius:borderRadius
      }}>
      <Typography color={colorTitle} size={18}>
        {title}
      </Typography>
      <Icon
        name={icon}
        onPress={onPress}
        color={colorIcon}
        family={'Ionicons'}
        size={34}
        style={{position: 'absolute', right: 10}}
      />
    </Block>
  )
}
export default HeaderBottomSheet
import PropTypes from 'prop-types'
import { LIGHT } from '@uiCore/Theme/colors'
HeaderBottomSheet.defaultProps = {
  onPress: null,
  title: 'text',
  icon: 'close',
  colorIcon: '#fff',
  colorTitle: '#fff',
  backgroundColor: LIGHT.primary,
  borderRadius:15
}
HeaderBottomSheet.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  icon: PropTypes.string,
  colorIcon: PropTypes.string,
  colorTitle: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderRadius:PropTypes.number
}
