// import { User } from "@/store/auth.store"
import { User } from '@/type'

import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite"

export const appwriteConfig = {
 endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
 platform: 'com.Royal_Foods',
 projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
 databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
 userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USERCOLLECTION_ID,
}



export const client = new Client()

client
 .setEndpoint(appwriteConfig.endpoint!)
 .setProject(appwriteConfig.projectId!)
 .setPlatform(appwriteConfig.platform)

export const account = new Account(client)
export const databases = new Databases(client)
export const avatars = new Avatars(client)

interface CreateUserParams {
 email: string
 password: string
 name: string
}


export const createUser = async ({ email, password, name }: CreateUserParams) => {
 try {
  const newAccount = await account.create(ID.unique(), email, password, name)

  if (!newAccount) {
   console.log('Failed to create account');
   throw Error;
  }

  const avatarUrl = avatars.getInitialsURL(name)

  const newUser = await databases.createDocument(
   appwriteConfig.databaseId!,
   appwriteConfig.userCollectionId!,
   ID.unique(),
   { email, name, accountId: newAccount.$id, avatar: avatarUrl },
  )
  return newUser

 } catch (error) {
  if (error instanceof Error) {
   console.error(error.message)
   throw error
  }
  console.log(error)
  throw new Error('Unknown Err, while creating appwrite account')
 }
}



export const signIn = async ({ email, password }: { email: string, password: string }) => {
 try {
  // Reset any existing session
  await resetSession()

  // Always try to create a new session with provided credentials
  await account.createEmailPasswordSession(email, password)

  //if successful, fetch and return the user
  return await getCurrentUser()

 } catch (error: any) {
  if (error.code === 401) {
   throw new Error('Invalid Credentials')
  }
  throw error
 }
}


// A helper to ensure no duplicate sessions exist
export const resetSession = async () => {
 try {
  // Try to get the current session
  await account.getSession('current');
  // If found, delete it
  await account.deleteSession('current');
 } catch {
  // No active session, safe to ignore
 }
};


export const getCurrentUser = async (): Promise<User | null> => {
 try {
  // throws if session doesn't exist
  const currentSession = await account.get()
  // if (!currentSession) throw Error;     // redundant check

  // fetch user details from database
  const currentUser = await databases.listDocuments(
   appwriteConfig.databaseId!,
   appwriteConfig.userCollectionId!,
   [Query.equal('accountId', currentSession.$id)]
  )

  if (currentUser.documents.length === 0) return null

  const { name, email, avatar } = currentUser.documents[0]
  return { ...currentUser.documents[0], name, email, avatar } as User

 } catch (error: any) {
  console.log('Error fetching current user:', error)
  throw new Error('Error fetching current User', { cause: error })
 }
}

