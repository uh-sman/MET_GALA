import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

function RoutesLayout() {
    return (
      <>
        <Stack>
          <Stack.Screen
            name="profile"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
        <StatusBar backgroundColor="#161622" style="light" />
      </>
    );
  }
  
  export default RoutesLayout;