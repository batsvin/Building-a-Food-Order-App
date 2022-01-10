import { Fragment } from 'react';
import classes from './Modal.module.css'
import reactDom from 'react-dom';

const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onHideCart}></div>
};

const ModalOverlay = props => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
};

const portalElement = document.getElementById('overlays')

const Modal = props => {
    return <Fragment>
        {reactDom.createPortal(<Backdrop onHideCart={props.onHideCart} />, portalElement)}
        {reactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>
}

export default Modal;