import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import * as firebase from 'firebase'
import Fire from '../Fire'

export default function LoadingScreen(props) {
    React.useEffect(() => {
        firebase.auth().onAuthStateChanged( user => {
            props.navigation.navigate(user ? 'App' : 'Auth')
        })
    })

    return (
        <View style={styles.container}>
            <Text>Loading...</Text>
            <ActivityIndicator size='large'></ActivityIndicator>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})