import {createAppContainer, createSwitchNavigator } from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import LoadingScreen from './screens/LoadingScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'

import * as Firebase from 'firebase'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDDnjfJpajE7DaLC_whyf-kNz0AThvFGcs",
  authDomain: "socialapp-9590b.firebaseapp.com",
  databaseURL: "https://socialapp-9590b.firebaseio.com",
  projectId: "socialapp-9590b",
  storageBucket: "socialapp-9590b.appspot.com",
  messagingSenderId: "625245498825",
  appId: "1:625245498825:web:f10c6546a3074757b54c18"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const AppStack = createStackNavigator({
  Home: HomeScreen
})

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: 'Loading'
    }
  )
)