import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native'
import Contants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import Fire from '../Fire'
const firebase = require('firebase')
require('firebase/firestore')

export default function PostScreen(props) {
    const [ text, setText ] = React.useState('')
    const [ image, setImage ] = React.useState(null)

    React.useEffect(() => {
        getPhotoPermission()
    })

    const getPhotoPermission = async () => {
        if(Contants.platform.android) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)

            if(status != 'granted') {
                alert('We need permission to access your camera roll')
            }
        }
    }

    const handlePost = () => {
        Fire.shared.addPost({ text: text.trim(), localUri: image}).then(ref => {
            setText('')
            setImage(null)
            props.navigation.goBack()
        }).catch(error => {
            alert(error)
        })
    }
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        })

        if(!result.cancelled) {
            setImage(result.uri)
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Ionicons name='md-arrow-back' size={24} color='#D8D9DB'></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePost}>
                    <Text style={{fontWeight: '500'}}>Add Post</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <Image source={require('../assets/avatar.jpg')} style={styles.avatar}></Image>
                <TextInput 
                    autoFocus={true} 
                    multiline={true} 
                    numberOfLines={4} 
                    style={{flex: 1}} 
                    placeholder='Want to share something?'
                    onChangeText={text => setText(text)}
                    value={text}
                ></TextInput>
            </View>

            <TouchableOpacity style={styles.photo} onPress={pickImage}>
                <Ionicons name='md-camera' size={32} color='#D8D9Db'></Ionicons>
            </TouchableOpacity>

            <View style={{marginHorizontal: 32, marginTop: 32, height: 150}}>
                <Image source={{ uri: image}} style={{width: '100%', height: '100%'}}></Image>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#D8D9DB'
    },
    inputContainer: {
        margin: 32,
        flexDirection: 'row',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16,

    },
    photo: {
        alignItems: 'flex-end',
        marginHorizontal: 32
    }

})