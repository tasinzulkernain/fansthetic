import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CartItem from '../components/cart/cart_item'
import { load_scripts } from '../state/slices/scripts/scripts_slice';
import { Link } from 'react-router-dom'
import { remove_from_cart, update_cart } from '../state/slices/cart/cart_slice';

import "../styles/cart.scss"

const mapStateToProps = state => {
    return {
        cart: state.cart,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        "load_scripts": () => dispatch( load_scripts("cart", "default") ),
        "clear_cart": () => dispatch( update_cart([]) )
    }
}

const Cart = props => {
    const { cart, load_scripts, clear_cart } = props;
    const { products, total_amount, status } = cart;

    // useEffect( () => {
    //     if(status == "UPDATED") { 
    //         load_scripts();
    //     }
    // }, [] )

    useEffect( () => {
        if(status == "UPDATED") { 
            load_scripts();
        }
    }, [status] )

    return (
        <main className="bg_gray">
            <div className="container margin_30">
                {/* <div className="page_header">
                    <div className="breadcrumbs">
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Category</a></li>
                            <li>Page active</li>
                        </ul>
                    </div>
                    <h1>Cart page</h1>
                </div> */}
                {/* /page_header */}
                <table className="table table-striped cart-list">
                    <thead>
                        <tr>
                            <th>
                                Product
                            </th>
                            <th>
                                Price
                            </th>
                            <th>
                                Quantity
                            </th>
                            <th>
                                Subtotal
                            </th>
                            <th>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { products.map( product => <CartItem product={product} /> ) }
                    </tbody>
                </table>
                {/* <div className="row add_top_30 flex-sm-row-reverse cart_actions">
                    <div className="col-sm-4 text-right">
                        <button type="button" className="btn_1 gray">Update Cart</button>
                    </div>
                    <div className="col-sm-8">
                        <div className="apply-coupon">
                            <div className="form-group form-inline">
                                <input type="text" name="coupon-code" defaultValue placeholder="Promo code" className="form-control" /><button type="button" className="btn_1 outline">Apply Coupon</button>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* /cart_actions */}
            </div>
            {/* /container */}
            <div className="box_cart">
                <div className="container">
                    <div className="row justify-content-end">
                        <div className="col-xl-4 col-lg-4 col-md-6">
                            <ul>
                                {/* <li>
                                    <span>Subtotal</span> $
                                </li>
                                <li>
                                    <span>Shipping</span> $7.00
                                </li> */}
                                <li>
                                    <span>Total</span> &#2547;{total_amount}
                                </li>
                            </ul>
                            <button className='btn_1 full-width cart' style={{backgroundColor: '#ba000d'}}
                                onClick={() => {
                                    products.forEach( product => clear_cart(product.product_id) )
                                }}
                            >Clear Cart</button>
                            <Link to="/checkout" className="btn_1 full-width cart">Proceed to Checkout</Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* /box_cart */}
        </main>

    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);