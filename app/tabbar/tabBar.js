import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardScreen from "../screens/DashboardScreen";
import EventsScreen from "../screens/EventsScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const TabBar = () => {
    return (
        <Tab.Navigator
            screenOptions = {{
                headerShown: false,
            }}>
            <Tab.Screen name = "DashboardScreen" component = {DashboardScreen}/>
            <Tab.Screen name = "Events" component = {EventsScreen}/>
            <Tab.Screen name = "Profile" component = {ProfileScreen}/>
        </Tab.Navigator>
    )
}

export default TabBar;