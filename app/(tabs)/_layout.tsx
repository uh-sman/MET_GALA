import { View, Text, Image, TouchableOpacity, Animated, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Tabs } from 'expo-router'
import { icons } from '../../constants'
import { SafeAreaView } from 'react-native-safe-area-context';

interface TabIconProps {
    icon: any;
    color: string;
    focused: boolean;
    name: string;
  }
const TabIcon = ({ icon, color, focused, name }: TabIconProps) => {
    return (
      <View className="items-center justify-center gap-2">
        <Image
          source={icon}
          resizeMode="contain"
          tintColor={color}
          className="w-6 h-6"
        />
        <Text
          style={{
            color: color,
          }}
          className={`${focused ? "font-semibold" : "font-regular"} text-xs`}
        >
          {name}
        </Text>
      </View>
    );
  };
  
const TabsRootLayout = () => {
  return (
    <>
    <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#000000",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 64,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
             <Tabs.Screen
          name="search"
          options={{
            title: "Discover",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
                <TabIcon
                icon={icons.compass}
                color={color}
                name="Discover"
                focused={focused}
              />
            ),
        }}
    />  
       
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plusTransparent}
                color={color}
                name="Create"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="liked"
          options={{
            title: "Liked",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.liked}
                color={color}
                name="Liked"
                focused={focused}
              />
            ),
          }}
        />
     
      
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.user3}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />   
      </Tabs>
    </>
  )
}

export default TabsRootLayout


// interface TabBarProps {
//   children: React.ReactNode
// }
// const TabBar = ({children}: TabBarProps) => {
//   return(
//   <Animated.ScrollView>
//     <Animated.View>

//     </Animated.View>
//   </Animated.ScrollView>
//   )
// }





// interface TabIconProps {
//   icon: any;
//   color: string;
//   focused: boolean;
//   name: string;
// }

// const TabIcon = ({ icon, color, focused, name }: TabIconProps) => {
//   return (
//     <View className="items-center justify-center gap-2">
//       <Image
//         source={icon}
//         resizeMode="contain"
//         tintColor={color}
//         className="w-6 h-6"
//       />
//       <Text
//         style={{ color }}
//         className={`${focused ? 'font-semibold' : 'font-regular'} text-xs`}
//       >
//         {name}
//       </Text>
//     </View>
//   );
// };

// const TabsRootLayout: React.FC = () => {
//   const scrollY = useRef(new Animated.Value(0)).current;
//   const [isTabBarVisible, setIsTabBarVisible] = useState(true);

//   const handleScroll = Animated.event(
//     [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//     { useNativeDriver: true }
//   );

//   useEffect(() => {
//     const listenerId = scrollY.addListener(({ value }) => {
//       const threshold = 64; // Adjust threshold for hiding/showing the tab bar
//       if (value > threshold && isTabBarVisible) {
//         setIsTabBarVisible(false);
//       } else if (value <= threshold && !isTabBarVisible) {
//         setIsTabBarVisible(true);
//       }
//     });

//     return () => {
//       scrollY.removeListener(listenerId);
//     };
//   }, [scrollY, isTabBarVisible]);

//   const translateY = scrollY.interpolate({
//     inputRange: [0, 100],
//     outputRange: [0, 64], // Move out of the screen when hidden
//     extrapolate: 'clamp',
//   });
//   return (
//     <SafeAreaView className="h-full w-full">
//       <Animated.ScrollView
//       contentContainerStyle={{ paddingBottom: 64 }} 
//       onScroll={handleScroll}
//       scrollEventThrottle={16}
//       >
//         <Animated.View 
//         style={[styles.container, { transform: [{ translateY }] }]}
//         >
//           <Tabs
//             screenOptions={{
//               tabBarShowLabel: false,
//               tabBarActiveTintColor: '#FFFFFF',
//               tabBarInactiveTintColor: '#CDCDE0',
//               tabBarStyle: {
//                 backgroundColor: '#000000',
//                 borderTopWidth: 1,
//                 borderTopColor: '#232533',
//                 height: 64,
//               },
//             }}
//           >
//             <Tabs.Screen
//               name="home"
//               options={{
//                 title: 'Home',
//                 headerShown: false,
//                 tabBarIcon: ({ color, focused }) => (
//                   <TabIcon icon={icons.home} color={color} name="Home" focused={focused} />
//                 ),
//               }}
//             />
//             <Tabs.Screen
//               name="search"
//               options={{
//                 title: 'Discover',
//                 headerShown: false,
//                 tabBarIcon: ({ color, focused }) => (
//                   <TabIcon icon={icons.compass} color={color} name="Discover" focused={focused} />
//                 ),
//               }}
//             />
//             <Tabs.Screen
//               name="create"
//               options={{
//                 title: 'Create',
//                 headerShown: false,
//                 tabBarIcon: ({ color, focused }) => (
//                   <TabIcon icon={icons.plusTransparent} color={color} name="Create" focused={focused} />
//                 ),
//               }}
//             />
//             <Tabs.Screen
//               name="liked"
//               options={{
//                 title: 'Liked',
//                 headerShown: false,
//                 tabBarIcon: ({ color, focused }) => (
//                   <TabIcon icon={icons.liked} color={color} name="Liked" focused={focused} />
//                 ),
//               }}
//             />
//             <Tabs.Screen
//               name="profile"
//               options={{
//                 title: 'Profile',
//                 headerShown: false,
//                 tabBarIcon: ({ color, focused }) => (
//                   <TabIcon icon={icons.user3} color={color} name="Profile" focused={focused} />
//                 ),
//               }}
//             />
//           </Tabs>
//         </Animated.View>
//       </Animated.ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: '#000000',
//   },
// });

// export default TabsRootLayout;