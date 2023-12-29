import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import SignInScreen from './app/screens/SignInScreen';
import SignUpScreen from './app/screens/SignUpScreen';
import DashboardScreen from './app/screens/DashboardScreen';
import KitsMenuScreen from './app/screens/KitsMenuScreen';
import CartMenuScreen from './app/screens/CartMenuScreen';
import EventsMenuScreen from './app/screens/EventsMenuScreen';
import store from './app/store';

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
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Kits Menu" component={KitsMenuScreen} />
          <Stack.Screen name="Cart Menu" component={CartMenuScreen} />
          <Stack.Screen name="Events Menu" component={EventsMenuScreen} />
          <Stack.Screen name="Sign Up" component={SignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
