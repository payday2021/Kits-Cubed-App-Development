import { createSlice } from '@reduxjs/toolkit'

// const initialState = [
//     {id: '1', name: 'kit4', price: 9, quantity: 4}
// ]

const initialState = []

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        kitAdded(state, action) {
            const { id, name, price, quantity } = action.payload
            const existingKit = state.find(kit => kit.name === name)

            if(existingKit) {
                existingKit.quantity += quantity
            } else {
                state.push(action.payload)
            }
        },
        emptyCart(state, action) {
            return [];
        }
    }
})

export const { kitAdded, emptyCart } = cartSlice.actions

export default cartSlice.reducer

