
import { goBack, navigate } from '@navigation/rootNavigation';
import store from '@stores/index';
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
    Alert,
} from 'react-native';

import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import SafeAreaView from 'react-native-safe-area-view'
import LoginSocial from './LoginSocial'
import { switchRoute } from '@stores/appstate';
const PlaceHolder = {
    email: 'Email Address *',
    fullName: 'Full Name',
    password: 'Password *',
    rePassword: 'Password *'
}
export default function ScreenSignUp() {
    useEffect(() => {
        StatusBar.setBarStyle('light-content', true);
    }, []);
    function validate(): boolean {
        return false
    }
    async function SignUp() {
        store.dispatch(switchRoute('app'))
    }
    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
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
                    <Text style={styles.loginText}>SignUp</Text>
                    <TextInput
                        placeholder={PlaceHolder.email}
                        placeholderTextColor='#808e9b'
                        style={styles.input}
                        autoCorrect={true}
                        autoCapitalize={'characters'}
                        //autoCompleteType 
                        keyboardType='email-address'
                        textContentType='emailAddress'
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        placeholder={PlaceHolder.fullName}
                        placeholderTextColor='#808e9b'
                        style={styles.input}
                        autoCorrect={true}
                        autoCapitalize={'characters'}
                        value={fullName}
                        onChangeText={setFullName}
                    />
                    <TextInput
                        placeholder={PlaceHolder.password}
                        placeholderTextColor='#808e9b'
                        style={styles.input}
                        secureTextEntry={true}
                        textContentType='password'
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TextInput
                        placeholder={PlaceHolder.rePassword}
                        placeholderTextColor='#808e9b'
                        style={styles.input}
                        secureTextEntry={true}
                        textContentType='password'
                        value={rePassword}
                        onChangeText={setRePassword}
                    />
                    <TouchableOpacity style={styles.loginButton} onPress={SignUp}>
                        <Text style={styles.loginButtonText}>SignUp</Text>
                    </TouchableOpacity>
                    <LoginSocial />
                    <View style={styles.signUpTextView}>
                        <TouchableOpacity onPress={goBack}>
                            <Text style={[styles.signUpText, { color: '#B53471' }]}>
                                {' Go Back '}
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
        color: '#FFFFFF',
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