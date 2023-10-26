import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, ScrollView, Button, Modal } from 'react-native'
import { nanoid } from '@reduxjs/toolkit'
import { kitAdded } from '../features/cart/cartSlice'

export const KitModal = ({visible, onClose, kit}) => {
    const [counter, setCounter] = useState(0)

    const dispatch = useDispatch()

    const onAddToCartPressed = () => {
        if(counter > 0) {
            dispatch(
                kitAdded({
                    id: nanoid(),
                    name: kit.name,
                    price: kit.price,
                    quantity: counter
                })
            )

            setCounter(0);
        }
    }

    const closeButtonPressed = () => {
        setCounter(0);
        onClose(0);
    }

    return (
        <Modal visible = {visible}>
            <View>
                <Text> hey </Text>
                <Text>{kit.desc}</Text>
                <Text>{kit.price}</Text>
                <Button title = "Increment" onPress = {() => setCounter(counter + 1)}/>
                <Text> {counter}</Text>
                <Button title = "Decrement" onPress = {() => counter > 0 && setCounter(counter-1)}/>
                {/* when pressing add to cart, redux store should update cart */}
                <Button title = "Add to Cart" onPress = {onAddToCartPressed}/>
                <Button title = "Close Desc" onPress = {closeButtonPressed}/>
            </View>
        </Modal>
    );
}