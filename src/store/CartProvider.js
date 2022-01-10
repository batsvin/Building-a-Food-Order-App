import CartContext from "./cart-context"

const CartProvider = props => {

    const addItemToCartHendler = item => {

    }

    const removeItemFromCartHendler = id => {

    }
    const cartContext = {
        item: [],
        totalAmount: 0,
        addItem: addItemToCartHendler,
        removeItem: removeItemFromCartHendler
    }

    return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
}

export default CartProvider;