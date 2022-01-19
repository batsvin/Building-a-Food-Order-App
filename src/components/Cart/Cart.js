import Modal from '../UI/Modal';
import classes from './Cart.module.css'
import CartContext from '../../store/cart-context';
import { useContext } from 'react';
import CartItem from './CartItem';
import Checkout from './Checkout';
import { useState } from 'react/cjs/react.development';

const Cart = props => {
    const [isCheckin, setIsChecking] = useState(false)
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };
    const cartItemAddHendler = item => { cartCtx.addItem({ ...item, amount: 1 }) }

    const orderHandler = () => {
        setIsChecking(true)
    }

    const submitOrderHandler = (userData) => {
        fetch('https://react-http-training-84f9a-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItesm: cartCtx.items
            })
        })
    }

    const cartItem = <ul className={classes['card-item']}>{cartCtx.items.map((item) =>
    (<CartItem
        key={item.id}
        name={item.name}
        amount={item.amount}
        price={item.price}
        onRemove={cartItemRemoveHandler.bind(null, item.id)}
        onAdd={cartItemAddHendler.bind(null, item)}
    />))}</ul>;
    const hasItems = cartCtx.items.length > 0;

    const modalAction = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>


    return <Modal onHideCart={props.onHideCart}>
        {cartItem}
        <div className={classes.total}><span>Total Amount</span><span>{totalAmount}</span></div>
        {isCheckin && <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart} />}
        {!isCheckin && modalAction}

    </Modal>
}

export default Cart