import Modal from '../UI/Modal';
import classes from './Cart.module.css'
import CartContext from '../../store/cart-context';
import { useContext } from 'react';
import CartItem from './CartItem';

const Cart = props => {
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };
    const cartItemAddHendler = item => { cartCtx.addItem({ ...item, amount: 1 }) }
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



    return <Modal onHideCart={props.onHideCart}>
        {cartItem}
        <div className={classes.total}><span>Total Amount</span><span>{totalAmount}</span></div>
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
            {hasItems && <button className={classes.button}>Order</button>}
        </div>
    </Modal>
}

export default Cart