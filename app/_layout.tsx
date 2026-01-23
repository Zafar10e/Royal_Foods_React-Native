import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import '../global.css';


export default function RootLayout() {

 const [fontsLoaded] = useFonts({
  'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
  'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
  'Quicksand-Regular': require('../assets/fonts/Quicksand-Regular.ttf'),
  'Quicksand-Light': require('../assets/fonts/Quicksand-Light.ttf'),
 });

 useEffect(() => {
  if (fontsLoaded) SplashScreen.hideAsync();
 }, [fontsLoaded])

 return <Stack screenOptions={{ headerShown: false }} />;
}
