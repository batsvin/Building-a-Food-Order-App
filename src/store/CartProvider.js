import CartContext from "./cart-context"
import { useReducer } from "react"


const defaultCartState = {
    items: [],
    totalAmount: 0
}
const cartReducer = (state, action) => {
    if (action.type === 'ADD') {


        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        const existingCartitemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartitemIndex]

        let updatedItems;
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items]
            updatedItems[existingCartitemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    if (action.type === 'REMOVE') {

        const existingCartitemIndex = state.items.findIndex(item => item.id === action.id)
        const existingItex = state.items[existingCartitemIndex]
        const updatedTotalAmount = state.totalAmount - existingItex.price
        let updatedItems;
        if (existingItex.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);

        } else {
            const updatedItem = { ...existingItex, amount: existingItex.amount - 1 }
            updatedItems = [...state.items];
            updatedItems[existingCartitemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    return defaultCartState
}

const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHendler = item => {
        dispatchCartAction({ type: 'ADD', item: item });
    }

    const removeItemFromCartHendler = id => {
        dispatchCartAction({ type: 'REMOVE', id: id });
    }
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHendler,
        removeItem: removeItemFromCartHendler
    }

    return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
}

export default CartProvider;