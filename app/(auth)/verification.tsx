import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../components/custom-button'
import { router } from 'expo-router'

const VerificationScreen = () => {
  return (
    <SafeAreaView className='h-full'>
      <ScrollView contentContainerStyle={{
        height: "100%"
      }}>
        <View className='h-full px-2 py-4'>
            <View>
                <Text className='text-3xl text-center font-dARegular leading-[50px]'>
                    Account Verification
                </Text>
            </View>
            <View className='h-full flex-1 justify-center items-center'>
            <Text
                className="text-6xl mb-2 font-dARegular leading-[100px] text-black/50 tracking-widest "
              >
                MET GALA
              </Text>
                <Text className='text-xl border border-dashed border-black/10 px-4 opacity-50 rounded-2xl mb-16 py-8 '>
                    Please check your email to verify your account
                </Text>
                <CustomButton
                title="Back to Login"
                textStyles="text-white"
                containerStyles="bg-black mb-4 rounded-full w-full"
                handlePress={() => router.push("/sign-in")}
              />
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default VerificationScreen