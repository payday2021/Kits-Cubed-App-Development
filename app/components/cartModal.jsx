import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, ScrollView, Button, Modal } from 'react-native'
import { orderAdded } from '../features/orders/ordersSlice'
import { emptyCart } from '../features/cart/cartSlice'
import { nanoid } from '@reduxjs/toolkit'

export const CartModal = ({visible, onClose}) => {
    const cart = useSelector(state => state.cart)

    const dispatch = useDispatch()

    const totalSum = cart.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0)
    console.log(totalSum)

    const onPlaceOrderPressed = () => {
        dispatch(
            orderAdded({
                id: nanoid(),
                cart: cart
            })
        )
       // const order = useSelector(state => state.orders)
       // console.log(order)
        //console.log("order placed")
    }

    const onEmptyCartPressed = () => {
        dispatch(
            emptyCart()
        )
    }

    return (
        <Modal visible = {visible}>
            <View>
                {cart.map((order) => {
                    return (
                    <View key = {order.id}>
                        <Text>{order.id}</Text>
                        <Text>{order.name}</Text>
                        <Text>price: {order.price}</Text>
                        <Text>quantity: {order.quantity}</Text>
                        <Text>amount: {order.price * order.quantity}</Text>

                    </View>
                    )
                })}
            </View>
            <Text>Total amount: {totalSum}</Text>
            <Button title = "Place Order" onPress = {onPlaceOrderPressed}/>
            <Button title = "Close Cart" onPress = {onClose}/>
            <Button title = "Empty Cart" onPress = {onEmptyCartPressed}/>
        </Modal>
    );
}