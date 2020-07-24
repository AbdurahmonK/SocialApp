import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native'
import * as firebase from 'firebase'

export default function RegisterScreen(props) {
    const [ name, setName ] = React.useState('')
    const [ email, setEmail ] = React.useState('')
    const [ password, setPassword ] = React.useState('')
    const [ errorMessage, setErrorMessage ] = React.useState(null)

    const handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                return userCredentials.user.updateProfile({
                    displayName: name
                })
            })
            .catch(error => setErrorMessage(error.message))
    }
    return (
        <View style={styles.container}>
            <StatusBar barStyle='light-content'></StatusBar>
            <Image source={require('../assets/auth1.png')} style={{position: 'absolute', bottom: 355, right: -455}}></Image>
            <Image source={require('../assets/auth1.png')} style={{position: 'absolute', bottom: -555, right: -525}}></Image>
            
            <TouchableOpacity style={styles.back} onPress={() => props.navigation.goBack()}>
                <Ionicons name='ios-arrow-round-back' size={32} color='#FFF'/>
            </TouchableOpacity>

            <View style={{ position: 'absolute', top: 4, alignItems: 'center', width: '100%'}}>
                <Text style={styles.greeting}>{`Hi!\nSign Up to get started.`}</Text>
                <TouchableOpacity style={styles.avatar}>
                    <Ionicons name='ios-add' size={40} color='#FFF' style={{marginTop: 6, marginLeft: 2}}/>
                </TouchableOpacity>
            </View>

            <View style={styles.errorMessage}>
                <Text>
                    {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
                </Text>
            </View>

            <View style={styles.form}>
                <View>
                    <Text style={styles.inputTitle}>Full Name</Text>
                    <TextInput 
                        style={styles.input} 
                        autoCapitalize='none' 
                        onChangeText={name => setName(name)}
                        value={name}
                    ></TextInput>
                </View>

                <View style={{marginTop: 32}}>
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

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={{color: '#FFF', fontWeight: '500'}}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{alignSelf: 'center', marginTop: 32}} onPress={() => props.navigation.navigate('Login')}>
                <Text style={{color: '#414959', fontSize: 13}}>
                    Already have an Accaunt? <Text style={{color: '#E9446A', fontWeight: '500'}}>Login</Text>
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
        // color: '#FFF'
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
    },
    back: {
        position: 'absolute',
        top: 48,
        left: 32,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(21, 22, 48, 0.1)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#E1E2E6',
        marginTop: 48,
        justifyContent: 'center',
        alignItems: 'center'
    }

})