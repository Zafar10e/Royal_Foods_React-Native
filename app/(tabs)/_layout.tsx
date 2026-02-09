// import { TabBarIconProps } from '@/type';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { ComponentProps } from 'react';
import { View } from 'react-native';

type IoniconName = ComponentProps<typeof Ionicons>['name']

export interface TabBarIconProps {
 focused: boolean,
 color: string,
 size: number,
 name: IoniconName,
}

const TabBarIcon = ({ focused, color, size, name }: TabBarIconProps) => (
 <View
  style={{
   minWidth: (size + 140) / 2, minHeight: (size + 55) / 2, alignItems: 'center', justifyContent: 'center', marginTop: 20, borderWidth: 1.5, borderRadius: (size + 30) / 2, borderColor: focused ? '#fb923c' : 'transparent'
  }}
 >
  <Ionicons
   name={name}
   size={size}
   color={color}
  />
 </View>
)

const TabsLayout = () => {
 return (
  <Tabs
   screenOptions={{
    headerShown: false,
    tabBarShowLabel: false,
    tabBarActiveTintColor: '#FE8C00',

    tabBarStyle: {
     position: 'absolute',
     bottom: 15,
     marginHorizontal: 15,
     paddingHorizontal: 10,
     borderWidth: 1,
     borderTopWidth: 1,
     borderColor: 'lightgray',
     borderRadius: 50,
     height: 60,
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 10 },
     shadowOpacity: 0.25,
     shadowRadius: 4,
     elevation: 3,
    },
    // if, tabBarShowLabel:true, only then.
    // tabBarLabelStyle: {
    //  fontSize: 10,
    //  fontWeight: '600',
    // }
   }}
  >

   <Tabs.Screen
    name='index'
    options={{
     title: 'Home',
     tabBarIcon: ({ focused, color, size }) => (
      <TabBarIcon focused={focused} color={color} size={size} name={focused ? 'home' : 'home-outline'} />
     )
    }}

   />

   <Tabs.Screen
    name='cart'
    options={{
     title: 'Cart',
     tabBarIcon: ({ focused, color, size }) => <TabBarIcon focused={focused} color={color} size={size} name={focused ? 'bag' : 'bag-outline'} />
    }}
   />

   <Tabs.Screen
    name='search'
    options={{
     title: 'Search',
     tabBarIcon: ({ focused, color, size }) => <TabBarIcon focused={focused} color={color} size={size} name={focused ? 'search' : 'search-outline'} />
    }}
   />

   <Tabs.Screen
    name='profile'
    options={{
     title: 'Profile',
     tabBarIcon: ({ focused, color, size }) => <TabBarIcon focused={focused} color={color} size={size} name={focused ? 'person' : 'person-outline'} />
    }}
   />
  </Tabs>

 )
}

export default TabsLayout;