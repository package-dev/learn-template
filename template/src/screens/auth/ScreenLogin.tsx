
import { navigate } from '@navigation/rootNavigation';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    StatusBar,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native';

import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import SafeAreaView from 'react-native-safe-area-view'
import LoginSocial from './LoginSocial';
import store from '@stores/index';
import { switchRoute } from '@stores/appstate';

export default function LoginScreen2() {
    useEffect(() => {
        StatusBar.setBarStyle('light-content', true);
    }, []);
    function Login() {
        store.dispatch(switchRoute('app'))
    }
    function SignUp() { navigate('ScreenSignUp') }
    function Forgot() { navigate('ScreenForgot') }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (


        <SafeAreaView style={{ flex: 1, backgroundColor: '#222' }} forceInset={{ bottom: 'never' }}>
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                }}
                style={{ flex: 1 }}
            >
                <LinearGradient
                    colors={['#222', '#222', '#111']}
                    style={styles.container}
                >
                    <Text style={styles.welcomeText}>{'Template'}</Text>
                    <Text style={styles.loginText}>Login</Text>
                    <TextInput
                        placeholder='Email Address'
                        placeholderTextColor='#808e9b'
                        style={styles.input}
                        autoCorrect={true}
                        autoCapitalize={'characters'}
                        keyboardType='email-address'
                        textContentType='emailAddress'
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        placeholder='Password'
                        placeholderTextColor='#808e9b'
                        style={styles.input}
                        secureTextEntry={true}
                        textContentType='password'
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={Forgot}>
                        <Text style={styles.fpText}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={Login} style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                    <LoginSocial />
                    <View style={styles.signUpTextView}>
                        <Text style={styles.signUpText}>Don't have an account?</Text>
                        <TouchableOpacity onPress={SignUp}>
                            <Text style={[styles.signUpText, { color: '#B53471' }]}>
                                {' Sign Up'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    welcomeText: {
        fontSize: 30,
        fontWeight: '900',
        color: '#fff',
        alignSelf: 'center',
    },
    loginText: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#333',
        borderRadius: 6,
        marginTop: 10,
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#808e9b',
    },
    fpText: {
        alignSelf: 'flex-end',
        color: '#B33771',
        fontSize: 18,
        fontWeight: '600',
        marginTop: 10,
    },
    loginButton: {
        backgroundColor: '#833471',
        paddingVertical: 12,
        borderRadius: 6,
        marginTop: 20,
    },
    loginButtonText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#fafafa',
        alignSelf: 'center',
    },
    loginWithBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50,
    },
    iconButton: {
        backgroundColor: '#333',
        padding: 14,
        marginHorizontal: 10,
        borderRadius: 100,
    },
    signUpTextView: {
        marginTop: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signUpText: {
        color: '#808e9b',
        fontSize: 20,
        fontWeight: '500',
    },
});