import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { remove_from_cart, update_cartitem_quantity } from '../../state/slices/cart/cart_slice';

const mapDispatchToProps = dispatch => {
    return {
        update_cartitem_quantity: (product_id, quantity) => dispatch( update_cartitem_quantity({ product_id, quantity }) ),
        remove_from_cart: product_id => dispatch( remove_from_cart({ product_id }) )
    }
}

const CartItem = props => {
    const { product, update_cartitem_quantity, remove_from_cart } = props;
    const quantityRef = useRef();

    useEffect( () => {
        // window.dispatch = dispatch;
        // update_cartitem_quantity(26, 5);
        console.log(quantityRef.current);
        quantityRef.current.addEventListener( 'change', e => update_cartitem_quantity( product.product_id, e.target.value ) )
        window.ucq = update_cartitem_quantity;
    }, [quantityRef.current] )

    return (
        <tr>
            <td>
                <div className="thumb_cart">
                    <img src={product.product__thumbnail} data-src={product.product__thumbnail} className="lazy" alt="Image" />
                </div>
                <span className="item_cart">{product.product__title}</span>
            </td>
            <td>
                <strong>&#2547;{product.product__price}</strong>
            </td>
            <td>
                <div className="numbers-row">
                    <input ref={quantityRef} type="text" defaultValue={product.quantity} className="qty2" />
                    <div className="inc button_inc">+</div>
                    <div className="dec button_inc">-</div>
                </div>
            </td>
            <td>
                <strong>&#2547;{product.product__price * product.quantity}</strong>
            </td>
            <td className="options">
                <button onClick={ () => remove_from_cart(product.product_id) }><i className="ti-trash" /></button>
            </td>
        </tr>
    )
}

export default connect(null, mapDispatchToProps)(CartItem);