import {IconCore} from '@component'
import React, {forwardRef, useState, useImperativeHandle, useRef} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from 'react-native'

const LoginScreen1 = ({handlerForgot, handlerLogin, handlerRegister}, ref) => {
  const [usename, setUserName] = useState('admin')
  const [password, setPassword] = useState('123456')
  const [showPass, setShowPass] = useState(true)
  const refPass = useRef()
  useImperativeHandle(ref, () => ({
    getUserName () {
      return usename
    },
    getPassword () {
      return password
    },
  }))
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <StatusBar
          hidden={true}
          backgroundColor={'#ddd'}
          barStyle='dark-content'
        />
        <View style={[styles.bigCircle, {backgroundColor: '#00D4FA'}]}></View>
        <View style={[styles.smallCircle, {backgroundColor: '#06B3E7'}]}></View>
        <View style={[styles.centerizedView, {marginTop: 20}]}>
          <View style={styles.authBox}>
            <View
              style={[
                styles.logoBox,
                {
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: '#06B3E7',
                  width: 120,
                  height: 120,
                  top: -60,
                },
              ]}>
              {/* <Icon
                color='#fff'
                name='comments'
                type='font-awesome'
                size={50}
              /> */}
              <Image
                source={require('@image/logo_evn_fu2.png')}
                style={{
                  width: 70,
                  height: 70,
                  resizeMode: 'contain',
                  borderRadius: 40,
                }}
              />
            </View>
            <Text style={styles.loginTitleText}>Đăng nhập</Text>
            <View style={styles.hr}></View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Tên người dùng</Text>
              <TextInput
                style={styles.input}
                keyboardType='email-address'
                textContentType='emailAddress'
                value={usename}
                onChangeText={setUserName}
                placeholder='Nhập tên người dùng'
                placeholderTextColor={'#ccc'}
                returnKeyType='next'
                onSubmitEditing={() => refPass.current.focus()}
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Mật khẩu</Text>
              <TextInput
                ref={refPass}
                style={styles.input}
                secureTextEntry={showPass}
                textContentType='password'
                value={password}
                onChangeText={setPassword}
                placeholder='Nhập mật khẩu'
                placeholderTextColor={'#ccc'}
                returnKeyType='done'
                onSubmitEditing={handlerLogin}
              />
              <IconCore
                onPress={() => setShowPass(!showPass)}
                name={showPass ? 'eye-off' : 'eye'}
                size={20}
                color='gray'
                position='absolute'
                right={20}
                top={40}
              />
            </View>
            <TouchableOpacity
              onPress={handlerLogin}
              style={[styles.loginButton, {backgroundColor: '#006EFA'}]}>
              <Text style={styles.loginButtonText}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlerRegister}>
              <Text style={styles.registerText}>
                Bạn chưa có tài khoản? Đăng ký ngay!
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlerForgot}>
              <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}
export default forwardRef(LoginScreen1)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  bigCircle: {
    width: Dimensions.get('window').height * 0.7,
    height: Dimensions.get('window').height * 0.7,
    backgroundColor: '#ff6b81',
    borderRadius: 1000,
    position: 'absolute',
    right: Dimensions.get('window').width * 0.25,
    top: -50,
  },
  smallCircle: {
    width: Dimensions.get('window').height * 0.4,
    height: Dimensions.get('window').height * 0.4,
    backgroundColor: '#ff7979',
    borderRadius: 1000,
    position: 'absolute',
    bottom: Dimensions.get('window').width * -0.2,
    right: Dimensions.get('window').width * -0.3,
  },
  centerizedView: {
    width: '100%',
    top: '15%',
  },
  authBox: {
    width: '80%',
    backgroundColor: '#fafafa',
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoBox: {
    width: 100,
    height: 100,
    backgroundColor: '#eb4d4b',
    borderRadius: 1000,
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: -50,
    marginBottom: -50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  loginTitleText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
  },
  hr: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#444',
    marginTop: 6,
  },
  inputBox: {
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#dfe4ea',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#ff4757',
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 4,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  forgotPasswordText: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 16,
  },
})
