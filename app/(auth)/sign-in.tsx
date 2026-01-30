import CustomButton from '@/components/customButton';
import CustomInput from '@/components/customInput';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';

const SignIn = () => {
 const [isSubmitting, setIsSubmitting] = useState(false)
 const [form, setForm] = useState({ email: '', password: '' })
 const [errors, setErrors] = useState<{ email?: string, password?: string }>({})

 const validateEmail = (email: string): boolean => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
 }

 const getPasswordErrors = (password: string): string[] => {
  const errors: string[] = []
  if (password.length < 6) errors.push("at least 6 characters");
  if (!/[A-Z]/.test(password)) errors.push("an uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("a lowercase letter");
  if (!/\d/.test(password)) errors.push("a number");
  // if (!/[@$!%*?&]/.test(password)) errors.push("a special character,");
  return errors
 }


 const submit = async () => {

  let newErrors: { email?: string, password?: string } = {}

  if (!validateEmail(form.email)) {
   newErrors.email = 'Please enter a valid email address'
  }

  const pwdErrs = getPasswordErrors(form.password)
  if (pwdErrs.length > 0) {
   newErrors.password = `Password must have, ${pwdErrs.join(', ')}, to be valid.`
  }

  setErrors(newErrors)

  if (Object.keys(newErrors).length > 0) return;

  setIsSubmitting(true)

  try {
   // call Appwrite Sign-in function

   Alert.alert('Success', 'Sign-in Successful!')
   router.replace('/')

  } catch (error: any) {
   Alert.alert('Error', error.message)
  } finally {
   setIsSubmitting(false)
  }
 }


 return (
  <View className='mx-1 gap-5 p-5'>

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
    {errors.password && <Text className='pl-2 text-xs text-red-400'>{errors.password}</Text>}
   </View>

   <CustomButton
    title='Sign-in'
    style=''
    textStyle=''
    isLoading={isSubmitting}
    onPress={submit}
    leftIcon={''}
   />

   <View className='flex flex-row items-center justify-center gap-2 mb-5'>
    <Text className='text-sm text-gray-400'>
     Don't have an account?
    </Text>
    <Link href='/(auth)/sign-up' className='text-primary text-sm'>
     Sign-up
    </Link>
   </View>

  </View>
 )
}

export default SignIn;