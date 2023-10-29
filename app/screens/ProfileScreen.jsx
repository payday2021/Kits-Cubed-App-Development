import React from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector } from 'react-redux';

const ProfileScreen = () => {
    const orders = useSelector(state => state.orders)
    
    const viewOrderHistoryPressed = () => {
        console.log(orders)
    }

    return (
        <View>
            <Text>Profile Screen</Text>
            <Button title = "View Order History" onPress = {viewOrderHistoryPressed}/>
            <View>
                {orders.map((order) => {
                    return(
                        <View key = {order.id}>
                            <Text>{order.id}</Text>
                            <View>
                                {order.cart.map((cart) => (
                                    <View key={cart.id}>
                                    <Text>{cart.name}</Text>
                                    <Text>{cart.price}</Text>
                                    <Text>{cart.quantity}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

export default ProfileScreen;