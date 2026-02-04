import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
// import {CustomButtonProps} from '@/type'

interface CustomButtonProps {
 onPress?: () => void
 title?: string
 style?: string
 textStyle?: string
 leftIcon?: React.ReactNode
 isLoading?: boolean
}

const CustomButton = ({
 onPress,
 title = 'Submit',
 style,
 textStyle,
 leftIcon,
 isLoading = false
}: CustomButtonProps) => {
 return (
  <TouchableOpacity
   onPress={onPress}
   disabled={isLoading}
   className={`flex flex-row py-2 bg-primary rounded-full mx-1 items-center justify-center mt-7 ${style ?? ''} ${isLoading ? 'opacity-50' : ''}`}
  >
   {leftIcon}
   <View className='flex flex-row justify-center'>
    {isLoading ? (
     <ActivityIndicator size='small' color='white' />
    ) : (
     <Text className={`text-white-100 px-2 font-quicksand-bold ${textStyle}`}>
      {title}
     </Text>
    )}
   </View>
  </TouchableOpacity>
 )
}

export default CustomButton;