import useAuthStore from '@/store/auth.store';
import * as Sentry from '@sentry/react-native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import '../global.css';


Sentry.init({
 dsn: 'https://83f6be15023177b01a37abf41b1d7c26@o4510817991524352.ingest.de.sentry.io/4510818073968720',

 // Adds more context data to events (IP address, cookies, user, etc.)
 // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
 sendDefaultPii: true,

 // Enable Logs
 enableLogs: true,

 // Configure Session Replay
 replaysSessionSampleRate: 0.1,
 replaysOnErrorSampleRate: 1,
 integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

 // uncomment the line below to enable Spotlight (https://spotlightjs.com)
 // spotlight: __DEV__,
});


export default Sentry.wrap(function RootLayout() {

 const { isLoading, fetchAuthenticatedUser } = useAuthStore()

 const [fontsLoaded] = useFonts({
  'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
  'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
  'Quicksand-Regular': require('../assets/fonts/Quicksand-Regular.ttf'),
  'Quicksand-Light': require('../assets/fonts/Quicksand-Light.ttf'),
 });

 useEffect(() => {
  if (fontsLoaded) SplashScreen.hideAsync();
 }, [fontsLoaded])

 useEffect(() => {
  fetchAuthenticatedUser()
 }, [])

 if (!fontsLoaded || isLoading) {
  return null;
 }

 return <Stack screenOptions={{ headerShown: false }} />;
});