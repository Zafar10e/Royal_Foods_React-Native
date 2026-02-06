import useAuthStore from '@/store/auth.store';
import { Redirect } from 'expo-router';

const Index = () => {
 const { isAuthenticated } = useAuthStore()
 if (!isAuthenticated) {
  return (
   <Redirect href='/(auth)/sign-in' />
  )
 }

 return <Redirect href='/(tabs)' />
}

export default Index;