import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { add_to_cart, remove_from_cart } from '../../state/slices/cart/cart_slice'
import { add_to_wishlist } from '../../state/slices/wishlist/wishlist_slice';


const mapDispatchToProps = dispatch => {
    return {
        add_to_cart: product_id => dispatch( add_to_cart({product_id: product_id, quantity: 1}) ),
        remove_from_cart: product_id => dispatch( remove_from_cart({id: product_id, quantity: 1}) ),
        add_to_wishlist: product_id => dispatch( add_to_wishlist({ product_id }) )
    }
}

const Product = props => {
    const { product, add_to_cart, add_to_wishlist } = props;
    console.log(props.fromOrders);
    return (
        <div class={`col-6 col-md-4 ${props.fromHome ? "col-xl-3" : ""}`}>
            <div class="grid_item">
                {!props.fromOrders ? 
                    product.is_trending ?
                        <span className={`ribbon off`}>Trending</span>
                    :   <span className={`ribbon hot`}>New</span>
                    :   <></>
                }
                <figure>
                    <Link to={`/product/?product_id=${[product.id]}`}>
                        <div className="d-flex flex-column justify-content-center">
                            <img class="img-fluid lazy center-block" src={product.thumbnail} data-src={product.thumbnail} alt=""/>
                        </div>
                    </Link>
                    {/* <div data-countdown="2019/05/15" class="countdown"></div> */}
                </figure>
                <Link to="product-detail-1.html">
                    <h3>{product.title}</h3>
                </Link>
                <div class="price_box">
                    <span class="new_price">{product.price}{'\u09F3'}  </span>
                    {parseInt(product.global_discount) > 0 && <span class="old_price">{product.old_price} {'\u09F3'}</span> }
                </div>
                <ul>
                    <li><a style={{cursor:'pointer'}}  onClick={ e => {e.preventDefault(); add_to_wishlist(product.id) } } class="tooltip-1" data-toggle="tooltip" data-placement="left" title="Add to Wishlist"><i class="ti-heart"></i><span>Add to Wishlist</span></a></li>
                    {/* <li><Link to="#0" class="tooltip-1" data-toggle="tooltip" data-placement="left" title="Add to compare"><i class="ti-control-shuffle"></i><span>Add to compare</span></Link></li> */}
                    <li><a style={{cursor:'pointer'}}  onClick={e => {e.preventDefault(); add_to_cart(product.id)}} class="tooltip-1" data-toggle="tooltip" data-placement="left" title="Add to cart"><i class="ti-shopping-cart"></i><span>Add to cart</span></a></li>
                </ul>
            </div>
        </div>
    )
}

export default connect(null, mapDispatchToProps)(Product);