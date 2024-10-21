import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import TabNavigator from './src/navigation/TabNavigator';
import { Text, StyleSheet } from 'react-native';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    'AfacadFlux': require('./assets/fonts/AfacadFlux-Variable.ttf'),
    'Pacifico': require('./assets/fonts/Pacifico-Regular.ttf')
  });
 
  useEffect(() => {
    if (loaded || error){
      SplashScreen.hideAsync();
    }
  },[loaded, error]);
  if(!loaded && !error){
    return null;
  }
  return (
    <>
      
       <TabNavigator />
      <StatusBar style="light" />
    </>
  );
}

const styles = StyleSheet.create({

});
