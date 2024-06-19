import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useState, useEffect } from "react";
interface UserContextValue {
  user: any;
  setUser: (user: any) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: any) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: any) => void;
  images: any;
  setImages: (images: any) => void;
  video: any;
  setVideo: (video: any) => void;
  logout: () => void;
}

interface User {
  username: string;
  email: string;
  password: string;
  avatar: string;
}

interface UserProviderProps {
  children: React.ReactNode;
}
const GlobalContext = createContext<UserContextValue>({
  user: null,
  setUser: () => {},
  images: null,
  setImages: () => {},
  video: null,
  setVideo: () => {},
  isLoading: false,
  isLoggedIn: false,
  setIsLoading: () => {},
  setIsLoggedIn: () => {},
  logout: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

 const GlobalProvider = ({ children }: UserProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [images, setImages] = useState<any>();
  const [video, setVideo] = useState<any>();

  useEffect(() => {
    const loadUserData = async () => {
        const storedUser = await AsyncStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsLoggedIn(true);
          }
    }
    loadUserData();
  })

  const saveUser = async (user: User | null) => {
    if (user) {
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } else {
      await AsyncStorage.removeItem('user');
    }
    setUser(user);
    setIsLoggedIn(!!user);
  };


  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
  };


  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser: saveUser,
        isLoading,
        setIsLoading,
        isLoggedIn,
        setIsLoggedIn,
        logout,
        images,
        video,
        setImages,
        setVideo
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider