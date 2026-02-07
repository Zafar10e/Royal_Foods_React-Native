import { getCurrentUser } from '@/lib/appwrite'
// import { User } from '@/type'
import { Models } from 'react-native-appwrite'
import { create } from 'zustand'

export interface User extends Models.Document {
 name: string
 email: string
 avatar: string
}

type AuthStoreType = {
 isAuthenticated: boolean,
 user: User | null,
 isLoading: boolean,
 setIsAuthenticated: (value: boolean) => void,
 setUser: (user: User | null) => void,
 setIsLoading: (isLoading: boolean) => void,
 fetchAuthenticatedUser: () => Promise<void>,
}


const useAuthStore = create<AuthStoreType>((set) => ({
 isAuthenticated: false,
 user: null,
 isLoading: false,

 setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
 setUser: (user: User | null) => set({ user }),
 setIsLoading: (isLoading: boolean) => set({ isLoading }),

 fetchAuthenticatedUser: async () => {
  set({ isLoading: true })

  try {
   const user = await getCurrentUser()

   if (user) { set({ isAuthenticated: true, user: user as User }) }
   else { set({ isAuthenticated: false, user: null }) }


  } catch (err) {
   console.log('Error fetching authenticated user:', err)
  } finally {
   set({ isLoading: false })
  }
 }
}))

export default useAuthStore;