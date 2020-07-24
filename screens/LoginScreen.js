import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar, LayoutAnimation } from 'react-native'
import * as firebase from 'firebase'

export default function LoginScreen(props) {
    const [ email, setEmail ] = React.useState('')
    const [ password, setPassword ] = React.useState('')
    const [ errorMessage, setErrorMessage ] = React.useState(null)

    const handleLogin = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => setErrorMessage(error.message))
    }
    LayoutAnimation.easeInEaseOut()
    return (
        <View style={styles.container}>
            <StatusBar barStyle='light-content'></StatusBar>
            <Image source={require('../assets/auth1.png')} style={{position: 'absolute', bottom: 325, right: -425}}></Image>
            <Image source={require('../assets/auth1.png')} style={{position: 'absolute', bottom: -555, right: -525}}></Image>
            <Image source={require('../assets/logo.png')} style={{alignSelf: 'center', width: 70, height: 70}}></Image>

            <Text style={styles.greeting}>
                {`Hello again.\nWelcome back.`}
            </Text>

            <View style={styles.errorMessage}>
                <Text>
                    {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
                </Text>
            </View>

            <View style={styles.form}>
                <View>
                    <Text style={styles.inputTitle}>Email Address</Text>
                    <TextInput 
                        style={styles.input} 
                        autoCapitalize='none' 
                        onChangeText={email => setEmail(email)}
                        value={email}
                    ></TextInput>
                </View>

                <View style={{marginTop: 32}}>
                    <Text style={styles.inputTitle}>Password</Text>
                    <TextInput 
                        style={styles.input} 
                        secureTextEntry 
                        autoCapitalize='none'
                        onChangeText={password => setPassword(password)}
                        value={password}
                    ></TextInput>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={{color: '#FFF', fontWeight: '500'}}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{alignSelf: 'center', marginTop: 32}} onPress={() => props.navigation.navigate('Register')}>
                <Text style={{color: '#414959', fontSize: 13}}>
                    New to SocialApp? <Text style={{color: '#E9446A', fontWeight: '500'}}>Sign Up</Text>
                </Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: 'center',
    },
    errorMessage: {
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30
    },
    error: {
        color: '#E9446A',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center'
    },
    form: {
        marginBottom: 40,
        marginHorizontal: 30
    },
    inputTitle: {
        color: '#BABF9E',
        fontSize: 10,
        textTransform: 'uppercase'
    },
    input: {
        borderBottomColor: '#BABF9E',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: '#161F3D'
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: '#E9446A',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center'
    }

})