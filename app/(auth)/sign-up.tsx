import CustomButton from '@/components/customButton';
import CustomInput from '@/components/customInput';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';

const SignUp = () => {
 const [isSubmitting, setIsSubmitting] = useState(false)
 const [form, setForm] = useState({ name: '', email: '', password: '' })
 const [errors, setErrors] = useState<{ name?: string, email?: string, password?: string, }>({})


 const validateEmail = (email: string): boolean => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email)
 }

 const getPasswordErrors = (password: string): string[] => {
  const errors: string[] = []
  if (password.length < 6) errors.push('at least 6 characters')
  if (!/[A-Z]/.test(password)) errors.push('an uppercase letter')
  if (!/[a-z]/.test(password)) errors.push('a lowercase letter')
  if (!/\d/.test(password)) errors.push('a number')

  return errors
 }


 const submit = async () => {

  let newErrors: { name?: string, email?: string, password?: string } = {}

  if (form.name.length < 3) {
   newErrors.name = 'Name must be at least 3 characters long'
  }

  if (!validateEmail(form.email)) {
   newErrors.email = 'Please enter a valid email address'
  }

  const pwdErrs = getPasswordErrors(form.password)
  if (pwdErrs.length > 0) {
   newErrors.password = `password must have, ${pwdErrs.join(', ')}, to be valid.`
  }

  setErrors(newErrors)

  if (Object.keys(newErrors).length > 0) return;

  setIsSubmitting(true)

  try {
   // call Appwrite Sign-up function

   Alert.alert('Success', 'Sign-up Successful!')
   router.replace('/')

  } catch (error: unknown) {
   const msg = error instanceof Error ? error.message : 'An unexpected error occurred!'
   Alert.alert('Error', msg)
  } finally {
   setIsSubmitting(false)
  }
 }


 return (
  <View className='mx-1 gap-5 p-5'>

   <View>
    <CustomInput
     placeholder='Enter name'
     value={form.name}
     onChangeText={txt => setForm(prev => ({ ...prev, name: txt }))}
     label='Name'
     validationError={!!errors.name}
    />
    {errors.name && <Text className='pl-2 text-xs text-red-400'>{errors.name}</Text>}
   </View>

   <View>
    <CustomInput
     placeholder='Enter email'
     value={form.email}
     onChangeText={txt => setForm(prev => ({ ...prev, email: txt }))}
     label='Email'
     keyboardType='email-address'
     validationError={!!errors.email}
    />
    {errors.email && <Text className='pl-2 text-xs text-red-400'>{errors.email}</Text>}
   </View>

   <View>
    <CustomInput
     placeholder='Enter password'
     value={form.password}
     onChangeText={pwd => setForm(prev => ({ ...prev, password: pwd }))}
     label='Password'
     secureTextEntry={true}
     validationError={!!errors.password}
    />
    {errors.password && <Text className='pl-2 text-sm text-red-400'>{errors.password}</Text>}
   </View>

   <CustomButton
    title='Sign-up'
    style=''
    textStyle=''
    isLoading={isSubmitting}
    onPress={submit}
    leftIcon={''}
   />

   <View className='flex flex-row items-center justify-center gap-2 mb-5'>
    <Text className='text-sm text-gray-400'>
     Already have an account?
    </Text>
    <Link href='/(auth)/sign-in' className='text-primary text-sm'>Sign-in</Link>
   </View>


  </View>
 )
}

export default SignUp;