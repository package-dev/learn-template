import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  ReactNode,
} from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  StyleProp,
  TextStyle,
  ModalBaseProps,
  ViewStyle,
} from 'react-native'
export type ModalUIHandle = {
  close: () => void
  open?: () => void
}
export interface ModalUIProps extends ModalBaseProps {
  animated?: boolean
  valueInit?: string
  styles?: StyleProp<TextStyle>
  styleProps?: StyleProp<ViewStyle>
  mid?: boolean
  outClose?: boolean
  initVisible?: boolean
  status?: boolean
  background?: string
  children?: ReactNode
}
const ModalRef = forwardRef<ModalUIHandle, ModalUIProps>((props, ref) => {
  const {
    animated,
    animationType,
    transparent = true,
    onRequestClose,
    onShow,
    children,
    mid,
    status,
    outClose = true,
    background = defaultProps.background,
    initVisible = false,
    ...rest
  } = props
  const [visible, setVisible] = useState(initVisible)
  useImperativeHandle(ref, () => ({
    close() {
      setVisible(false)
    },
    open() {
      setVisible(true)
    },
  }))
  const styleProps: any = [
    mid && { alignItems: 'center', justifyContent: 'center' },
    { backgroundColor: background },
  ]
  return (
    <Modal
      visible={status !== undefined ? status : visible}
      transparent={transparent}
      animationType={animationType}
      onRequestClose={onRequestClose}
      supportedOrientations={['portrait', 'landscape']}
      onShow={onRequestClose}
      {...rest}>
      <View style={[style.fullScreen, styleProps]}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => (outClose ? setVisible(false) : {})}
          style={style.fullScreen}
        />
        <View>{children}</View>
      </View>
    </Modal>
  )
})
export default ModalRef
ModalRef.defaultProps = {
  animated: true,
  animationType: 'fade',
  transparent: true,
  onRequestClose: () => { },
  onShow: () => { },
}
const style = StyleSheet.create({
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})
const defaultProps = {
  background: '#00000062',
}
