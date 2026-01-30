import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
// import { CustomInputProps } from '@/type';

interface CustomInputProps {
 placeholder?: string
 value: string
 onChangeText?: (text: string) => void
 label: string
 secureTextEntry?: boolean
 keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad'
 validationError: boolean
}


const CustomInput = ({ placeholder, value, onChangeText, label, secureTextEntry = false, keyboardType = 'default', validationError }: CustomInputProps) => {
 const [isFocused, setIsFocused] = useState(false)

 return (
  <View className='flex'>
   <Text className='font-quicksand-medium text-xs text-gray-400'>{label}</Text>
   <TextInput
    autoCapitalize='none'
    autoCorrect={false}
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
    keyboardType={keyboardType}
    onFocus={() => setIsFocused(true)}
    onBlur={() => setIsFocused(false)}
    placeholder={placeholder}
    placeholderTextColor='#888'
    className={`border rounded-xl pl-3 font-quicksand-semibold text-gray-600 ${validationError ? 'border-red-300' : isFocused ? 'border-primary' : 'border-gray-300'}`} />
  </View>
 )
}

export default CustomInput;