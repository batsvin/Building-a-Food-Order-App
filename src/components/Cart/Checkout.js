import { useRef } from 'react';
import { useState } from 'react/cjs/react.development';

import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === ''
const isNoteFiveChars = value => value.trim().length !== 5


const Checkout = (props) => {
    const [formInputsValidaty, setFormInputsValidaty] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    })

    const nameInputRef = useRef()
    const streetInputRef = useRef()
    const postalCodeInputRef = useRef()
    const cityInputRef = useRef()

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalCodeIsValid = !isNoteFiveChars(enteredPostalCode);
        const enteredCityIsValid = !isEmpty(enteredCity);

        setFormInputsValidaty({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            postalCode: enteredPostalCodeIsValid,
            city: enteredCityIsValid
        })

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalCodeIsValid && enteredCityIsValid
        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostalCode
        })
    };

    const nameControlClasses = `${classes.control} ${formInputsValidaty.name ? '' : classes.invalid}`;
    const streetControlClasses = `${classes.control} ${formInputsValidaty.street ? '' : classes.invalid}`;
    const postControlClasses = `${classes.control} ${formInputsValidaty.postalCode ? '' : classes.invalid}`;
    const cityControlClasses = `${classes.control} ${formInputsValidaty.city ? '' : classes.invalid}`;

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputsValidaty.name && <p >Please entered a value!</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formInputsValidaty.street && <p>Please entered a value!</p>}
            </div>
            <div className={postControlClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalCodeInputRef} />
                {!formInputsValidaty.postalCode && <p>Please entered a value!</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formInputsValidaty.city && <p>Please entered a value!</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;