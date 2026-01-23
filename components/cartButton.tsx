import { images } from '@/constants';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const CartButton = () => {
 const totalItems = 10
 return (
  <TouchableOpacity className='flex items-center justify-center rounded-full size-11 bg-dark-100' onPress={() => { }}>
   <Image source={images.bag} className='size-5' resizeMode='contain' />
   {totalItems > 0 && (
    <View className='absolute -top-2 -right-1 bg-primary rounded-full flex items-center justify-center'>
     <Text className='font-quicksand-bold text-xs text-white'>{totalItems}</Text>
    </View>
   )}
  </TouchableOpacity>
 )
}

export default CartButton;