import CustomButton from '@/components/customButton';
import CustomInput from '@/components/customInput';
import { images } from '@/constants';
import { Slot } from 'expo-router';
import React from 'react';
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

const Layout = () => {
 return (
  <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
   <ScrollView className='bg-white h-full' keyboardShouldPersistTaps='handled'>
    <View className='relative w-full' style={{ height: Dimensions.get('screen').height / 2.25 }}>
     <ImageBackground source={images.loginGraphic} className='size-full rounded-b-lg' />
     <Image source={images.logo} className='absolute self-center size-48 -bottom-16 z-10' />
    </View>
    <CustomInput />
    <CustomButton />
   </ScrollView>
   <Slot />
  </KeyboardAvoidingView>)
}

export default Layout;