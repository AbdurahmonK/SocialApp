import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function LoginScreen() {
    return (
        <View style={styles.container}>
            <Text>Loging</Text>
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