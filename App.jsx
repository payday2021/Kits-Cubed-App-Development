import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import SignInScreen from './app/screens/SignInScreen';
import SignUpScreen from './app/screens/SignUpScreen';
import DashboardScreen from './app/screens/DashboardScreen';
import store from './app/store';
import TabBar from './app/tabbar/tabBar';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SignIn"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Sign In" component={SignInScreen} />
          <Stack.Screen name="Sign Up" component={SignUpScreen} />
          <Stack.Screen name="Tabs" component={TabBar} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

    // <Provider store = {store}>
    //   <NavigationContainer>
    //     <TabBar /> {/* Render your tab navigator */}
    //   </NavigationContainer>
    // </Provider>

  );
}
