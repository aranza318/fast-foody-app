import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import { useEffect } from 'react';
import { store } from './src/app/store';
import { Provider } from 'react-redux';
//import MainNavigator from './src/navigation/MainNavigator';
import MainNavigation from './src/navigation/MainNavigation';

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
    
      <Provider store={store}>
       <MainNavigation />
       <StatusBar style="light" />
      </Provider>
    
  );
}

