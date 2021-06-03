import React from 'react';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { useFonts } from 'expo-font';


import WelcomeScreen from './screens/WelcomeScreen';
import { AppDrawerNavigator } from './components/AppDrawerNavigator'
import { AppTabNavigator } from './components/AppTabNavigator'


export default props => {
  let [fontsLoaded] = useFonts({
    'ShareTechMono-Regular': require('./assets/Fonts/ShareTechMono-Regular.ttf')
  });
return (
    <AppContainer/>
  );
}
const switchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen: WelcomeScreen},
  Drawer:{screen: AppDrawerNavigator},
  BottomTab: {screen: AppTabNavigator},
})

const AppContainer =  createAppContainer(switchNavigator);
