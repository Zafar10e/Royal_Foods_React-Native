import CartButton from "@/components/cartButton";
import { images, offers } from "@/constants";
import useAuthStore from "@/store/auth.store";
import { Fragment } from "react";
import { FlatList, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
 const { user } = useAuthStore()

 return (
  <SafeAreaView className="flex-1">

   <FlatList
    data={offers}
    contentContainerClassName="px-4 pb-30"
    renderItem={({ item, index }) => {
     const isEven = index % 2 === 0

     return (
      <View>
       <Pressable className={`flex items-center overflow-hidden rounded-xl h-48 gap-5 my-3 shadow-lg ${isEven ? 'flex-row-reverse pl-10' : 'flex-row'}`} style={{ backgroundColor: item.color }}
        android_ripple={{ color: '#ffff22' }}
       >
        {({ pressed }) => (
         <Fragment>
          <View className="h-full w-1/2">
           <Image source={item.image} className='size-full' resizeMode={'contain'} />
          </View>
          <View className="offer-card__info">
           <Text className="h1-bold text-white">
            {item.title}
           </Text>
           <Image
            source={images.arrowRight}
            className="size-10"
            resizeMode="contain"
           />
          </View>
         </Fragment>
        )}
       </Pressable>
      </View>
     )
    }}
    ListHeaderComponent={
     <View className="flex flex-row w-full justify-between my-5 px-2">
      <View className="items-start">
       <Text className="font-quicksand-bold text-sm text-primary">Deliver To</Text>
       <TouchableOpacity className="flex flex-row items-center gap-2">
        <Text className="font-quicksand-bold text-base text-dark-100">Lahore</Text>
        <Image source={images.arrowDown} className="size-3" resizeMode="contain" />
       </TouchableOpacity>
      </View>

      <CartButton />
     </View>
    }
    ListFooterComponent={
     <View>
      <Text>Footer Content</Text>
     </View>
    }
   />
  </SafeAreaView >
 );
}


export default Index;