import { Redirect } from 'expo-router';

const Index = () => {
 const isAuthenticated = true

 if (!isAuthenticated) {
  return (
   <Redirect href='/(auth)/sign-in' />
  )
 }

 return <Redirect href='/(tabs)' />
}

export default Index;