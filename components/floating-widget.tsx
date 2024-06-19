import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { icons } from '../constants'

const FloatingWidget = () => {
  return (
    <View className='bg-black h-14 w-5/6 rounded-3xl absolute flex flex-row justify-evenly bottom-[20px] items-center'>
        <TouchableOpacity className=' flex flex-row items-center'>
            <Text className='text-white/75 pr-4 text-xl font-bold'>Filter</Text>
            <Image source={icons.filterWhite} className='w-6 h-6' resizeMode='contain'/>
        </TouchableOpacity>
        <Text className='bg-gray-300 h-6 w-[1px]'></Text>
        <TouchableOpacity className=' flex flex-row items-center'>
            <Text className='text-white/75 pr-4 text-xl font-bold'>Popularity</Text>
            <Image source={icons.arrow} className='w-4 h-4' resizeMode='contain'/>
        </TouchableOpacity>
    </View>
  )
}
export default FloatingWidget