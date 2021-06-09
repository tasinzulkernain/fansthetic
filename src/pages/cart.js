import React from 'react';
import { connect } from 'react-redux';
import CartItem from '../components/cart/cart_item'

const mapStateToProps = state => {
    return {
        cart: state.cart,
    }
}


const Cart = props => {
    const { cart } = props;
    const { products, count, total_amount, status } = cart;

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
                                    <span>Total</span> ${total_amount}
                                </li>
                            </ul>
                            <a href="cart-2.html" className="btn_1 full-width cart">Proceed to Checkout</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* /box_cart */}
        </main>

    )
}

export default connect(mapStateToProps, null)(Cart);