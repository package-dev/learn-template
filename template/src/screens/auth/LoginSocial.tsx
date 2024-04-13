import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements';

export default function LoginSocial() {
    return (
        <View style={styles.loginWithBar}>
            <TouchableOpacity style={styles.iconButton}>
                <Icon name='google' type='font-awesome' size={30} color='#808e9b' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
                <Icon
                    name='facebook-square'
                    type='font-awesome'
                    size={30}
                    color='#808e9b'
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
                <Icon name='apple' type='font-awesome' size={30} color='#808e9b' />
            </TouchableOpacity>
        </View>
    )
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