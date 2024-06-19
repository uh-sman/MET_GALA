import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

function SearchLayout() {
    return (
      <>
        <Stack>
          <Stack.Screen
            name="search"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
        <StatusBar backgroundColor="#161622" style="light" />
      </>
    );
  }
  
  export default SearchLayout;