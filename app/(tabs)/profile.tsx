
import { View, Text, ScrollView, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, images } from '../../constants'
import { useGlobalContext } from '../../context/GlobalProvider'
import { logout } from '../../lib/auth'
import { router } from 'expo-router'

const Profile = () => {
 const { user, logout } = useGlobalContext()
//  console.log("user?",user?.aud)
const slicedName = () => {
  const name = user?.email
  const nameArray = name?.split("@gmail.com")
  return nameArray
}

const handleLogout = () => {
  try {
   logout()
  } catch (error) {
    console.log(error)
    Alert.alert("Failed to logout")
  }finally{
    router.replace('/sign-in')
  }
}
  return (
    <SafeAreaView className='h-full w-full'>
      <ScrollView contentContainerStyle={{
        height: "100%"
      }}>
        <View>
          <View>
            <ImageBackground source={images.cover} className='w-full h-[200px]' resizeMode='cover'>
              <View className='relative justify-end items-end pr-4 mt-6'>
                <TouchableOpacity onPress={handleLogout}>
                <Image source={icons.logout} resizeMode="contain" className='h-6 w-6'/>
                </TouchableOpacity>
              </View>
              <View className='relative flex-1 justify-center items-center'>
                <View className='absolute top-[12.3vh] leading-[100px]'>
                  <Image source={images.profileImage} className='h-24 w-24 rounded-3xl' resizeMode='contain'/>
                  <Text className='text-black font-bold text-xl px-1'>{slicedName()}</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile