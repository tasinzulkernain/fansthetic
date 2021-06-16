import React, { useEffect, useState } from 'react';
import '../styles/error_track.scss'
import '../styles/product_page.scss'
import trucklogo from "../img/track_order.svg"
import { Link, useHistory, withRouter } from 'react-router-dom';
import Product from '../components/Global/Product';

import { fetch_product, fetch_product_failure } from '../state/slices/pages/product/product_slice';

import qs from 'query-string'
import { useLocation } from 'react-router';
import { connect } from 'react-redux';
import { add_to_cart } from '../state/slices/cart/cart_slice';

import Loading from '../components/Global/loading';
import { fetch_order, fetch_orders } from '../state/slices/pages/orders/orders_slice';
import { Formik } from 'formik';
import { load_scripts } from '../state/slices/scripts/scripts_slice';

const mapStateToProps = state => {
    return {
        status: state.pages.orders.status,
        orders: state.pages.orders.orders,
        statusText: state.pages.orders.statusText,
        order: state.pages.orders.order,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetch_orders: () => dispatch( fetch_orders() ),
        fetch_order: id => dispatch( fetch_order( {id} ) ),
        load_scripts: () => dispatch( load_scripts( "orders", "default") )
    }
}

const Orders = props => {

    const { order, status, orders, fetch_order, fetch_orders, statusText } = props;

    const location = useLocation()
    const history = useHistory();
    const qparams = qs.parse(location.search)

    useEffect( () => {
        fetch_orders();
        if(qparams.order_id) {
            fetch_order( qparams.order_id );
        }
    }, [] )

    useEffect( () => {
        if(qparams.order_id) {
            fetch_order( qparams.order_id );
        }
        // load_scripts()
    }, [location] )

    const handle_fetch_order_by_id = () => {
        history.push("/orders?order_id="+document.querySelector('#invoice_id').value);
        fetch_order(parseInt( document.querySelector('#invoice_id').value));
    }

    return (
        <main>
            {status === "LOADING" ?
                <Loading />
                : <>
                    <div>
                        <div id="track_order">
                            <div className="container">
                                <div className="row justify-content-center text-center">
                                    <div className="col-xl-7 col-lg-9">
                                        <img src={ trucklogo } alt className="img-fluid add_bottom_15" width={200} height={177} />
                                        <p>Quick Tracking Order</p>
                                        <div className="search_bar">
                                            <input id="invoice_id" type="text" className="form-control" placeholder="Invoice ID" />
                                            <input onClick={handle_fetch_order_by_id} type="submit" defaultValue="Search" />
                                        </div>
                                        { statusText !== "" ?
                                            <h5 className="">{ statusText }</h5>
                                        :   <></>
                                        }
            
                                    </div>
                                </div>
                                {/* /row */}
                            </div>
                            {/* /container */}
                        </div>
                        {/* /track_order */}
                        
                        
                        { order && order.name ? 
                            <div className="bg_white">
                                <div class="tabs_product bg_white version_2">
                                    <div class="container">
                                        <ul class="nav nav-tabs" role="tablist">
                                            <li class="nav-item">
                                                <a id="tab-A" href="#pane-A" class="nav-link active" data-toggle="tab" role="tab">order review</a>
                                            </li>
                                            <li class="nav-item">
                                                <a id="tab-B" href="#pane-B" class="nav-link" data-toggle="tab" role="tab">delivery</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="tab_content_wrapper">
                                    <div class="container">
                                        <div class="tab-content" role="tablist">
                                <div id="pane-A" class="card tab-pane fade active show" role="tabpanel" aria-labelledby="tab-A">
                                    <div class="card-header" role="tab" id="heading-A">
                                        <h5 class="mb-0">
                                            <a class="collapsed" data-toggle="collapse" href="#collapse-A" aria-expanded="false" aria-controls="collapse-A">
                                                Description
                                            </a>
                                        </h5>
                                    </div>
                                    <div className="container margin_60_35">
                                    <div className="row justify-content-between">
                                        <div className="col-lg-6">
                                            <div className="prod_info version_2 ">
                                                <div className="container col-4">
                                                    <div className="row pt-3 align-items-center" >
                                                        <div className="col-3"><strong style={{fontSize: '1.1rem'}} >Track ID: </strong></div>
                                                        <div className="col"><input type="text" class="form-control" disabled placeholder="Track ID" defaultValue={order.track_id} /></div>
                                                    </div>
                                                    <div className="row pt-3  align-items-center" >
                                                        <div className="col-3"><strong style={{fontSize: '1.1rem'}} >Name: </strong></div>
                                                        <div className="col"><input type="text" class="form-control"  disabled placeholder="Name" defaultValue={order.name} /></div>
                                                    </div>
                                                    <div className="row pt-3 align-items-center" >
                                                        <div className="col-3"><strong style={{fontSize: '1.1rem'}} >Customer: </strong></div>
                                                        <div className="col"><input type="text" class="form-control" disabled  placeholder="Customer name" defaultValue={order.customer} /></div>
                                                    </div>
                                                    <div className="row pt-3 align-items-center" >
                                                        <div className="col-3"><strong style={{fontSize: '1.1rem'}} >Contact no.: </strong></div>
                                                        <div className="col"><input type="text" class="form-control" disabled  placeholder="Contact no." defaultValue={order.contact_no} /></div>
                                                    </div>
                                                    <div className="row pt-3 align-items-center" >
                                                        <div className="col-3"><strong style={{fontSize: '1.1rem'}} >Note: </strong></div>
                                                        <div className="col"><textarea type="text" class="form-control" disabled placeholder="note" defaultValue={order.special_note} /></div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-5">
                                            <div className="version_2">
                                                <div className="container col-4">
                                                    <div className="row pt-3 align-items-center" >
                                                        <div className="col-4"><strong style={{fontSize: '1.1rem'}} >Status: </strong></div>
                                                        <div className="col"><input type="text" class="form-control" disabled defaultValue={order.status.split('_').join(' ')} /></div>
                                                    </div>
                                                    <div className="row pt-3 align-items-center" >
                                                        <div className="col-4"><strong style={{fontSize: '1.1rem'}} >Delivery charge: </strong></div>
                                                        <div className="col"><input type="text" class="form-control" disabled defaultValue={order.delivery_charge} /></div>
                                                    </div>
                                                    <div className="row pt-3 align-items-center" >
                                                        <div className="col-4"><strong style={{fontSize: '1.1rem'}} >Paid amount: </strong></div>
                                                        <div className="col"><input type="text" class="form-control" disabled defaultValue={order.paid_amount} /></div>
                                                    </div>
                                                    <div className="row pt-3 align-items-center" >
                                                        <div className="col-4"><strong style={{fontSize: '1.1rem'}} >Remaining: </strong></div>
                                                        <div className="col"><input type="text" class="form-control" disabled defaultValue={order.remaining_amount} /></div>
                                                    </div>
                                                    <div className="row pt-3 mt-3">
                                                        <div className="col-lg-7 col-md-6">
                                                            <div className="price_main">
                                                                <span className="new_price">${order.grand_total}</span>
                                                                {order.special_discount || order.discount ?
                                                                <>
                                                                    <span className="percentage">-{100 - (order.grand_total+order.special_discount+order.discount)/order.grand_total * 100}</span> 
                                                                    <span className="old_price">${order.grand_total+order.special_discount+order.discount}</span>
                                                                </>
                                                                :   <></>}
                                                                </div>
                                                        </div>
                                                        {/* <div className="col-lg-5 col-md-6">
                                                            <div className="btn_add_to_cart"><a href="#0" className="btn_1">Update Order</a></div>
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /row */}
                                </div>
                                </div>
	                            
                                <div id="pane-B" className="card tab-pane fade" role="tabpanel" aria-labelledby="tab-B">
                                    <div className="card-header" role="tab" id="heading-B">
                                        <h5 className="mb-0">
                                            <a className="collapsed" data-toggle="collapse" href="#collapse-B" aria-expanded="false" aria-controls="collapse-B">
                                                Delivery
                                            </a>
                                        </h5>
                                    </div>
                                    <div id="collapse-B" className="collapse" role="tabpanel" aria-labelledby="heading-B">
                                        <div className="card-body">
                                            <div className="row justify-content-between">
                                                <div className="col-lg-6">
                                                    <div className="container col-4">
                                                    <h2><strong>Shipping address</strong></h2>
                                                    <div className="row pt-3 align-items-center" >
                                                        <div className="col-3"><strong style={{fontSize: '1.1rem'}} >Name: </strong></div>
                                                        <div className="col"><input type="text" class="form-control" disabled placeholder="name" defaultValue={order.name} /></div>
                                                    </div>
                                                    <div className="row pt-3  align-items-center" >
                                                        <div className="col-3"><strong style={{fontSize: '1.1rem'}} >Mobile no.: </strong></div>
                                                        <div className="col"><input type="text" class="form-control" disabled  placeholder="mobile no." defaultValue={order.mobile_no} /></div>
                                                    </div>
                                                    <div className="row pt-3 align-items-center" >
                                                        <div className="col-3"><strong style={{fontSize: '1.1rem'}} >Street: </strong></div>
                                                        <div className="col"><input type="text" class="form-control"  disabled placeholder="Street" defaultValue={order.street} /></div>
                                                    </div>
                                                    <div className="row pt-3 align-items-center" >
                                                        <div className="col-3"><strong style={{fontSize: '1.1rem'}} >Zip code: </strong></div>
                                                        <div className="col"><input type="text" class="form-control"  disabled placeholder="zip code" defaultValue={order.zipcode} /></div>
                                                    </div>
                                                    <div className="row pt-3 align-items-center" >
                                                        <div className="col-3"><strong style={{fontSize: '1.1rem'}} >city: </strong></div>
                                                        <div className="col"><input type="text" class="form-control" disabled  placeholder="city" defaultValue={order.city} /></div>
                                                    </div>
                                                    <div className="row pt-3 align-items-center" >
                                                        <div className="col-3"><strong style={{fontSize: '1.1rem'}} >Division: </strong></div>
                                                        <div className="col"><input type="text" class="form-control" disabled  placeholder="division" defaultValue={order.division} /></div>
                                                    </div>

                                                    </div>
                                                </div>
                                                <div className="col-lg-5">
                                                    <div className="container col-4">
                                                    <h2><strong>Billing address</strong></h2>
                                                    <div className="row pt-3 align-items-center" >
                                                        <div className="col-3"><strong style={{fontSize: '1.1rem'}} >Name: </strong></div>
                                                        <div className="col"><input type="text" class="form-control" disabled  placeholder="Track ID" defaultValue={order.name} /></div>
                                                    </div>
                                                    <div className="row pt-3  align-items-center" >
                                                        <div className="col-3"><strong style={{fontSize: '1.1rem'}} >Mobile no.: </strong></div>
                                                        <div className="col"><input type="text" class="form-control" disabled  placeholder="mobile no." defaultValue={order.mobile_no} /></div>
                                                    </div>
                                                    <div className="row pt-3 align-items-center" >
                                                        <div className="col-3"><strong style={{fontSize: '1.1rem'}} >Street: </strong></div>
                                                        <div className="col"><input type="text" class="form-control" disabled  placeholder="Street" defaultValue={order.street} /></div>
                                                    </div>
                                                    <div className="row pt-3 align-items-center" >
                                                        <div className="col-3"><strong style={{fontSize: '1.1rem'}} >Zip code: </strong></div>
                                                        <div className="col"><input type="text" class="form-control" disabled  placeholder="zip code" defaultValue={order.zipcode} /></div>
                                                    </div>
                                                    <div className="row pt-3 align-items-center" >
                                                        <div className="col-3"><strong style={{fontSize: '1.1rem'}} >city: </strong></div>
                                                        <div className="col"><input type="text" class="form-control" disabled  placeholder="city" defaultValue={order.city} /></div>
                                                    </div>
                                                    <div className="row pt-3 align-items-center" >
                                                        <div className="col-3"><strong style={{fontSize: '1.1rem'}} >Division: </strong></div>
                                                        <div className="col"><input type="text" class="form-control" disabled  placeholder="division" defaultValue={order.division} /></div>
                                                    </div>

                                                    </div>
                                                    {/* /table-responsive */}
                                                </div>
                                            </div>

                                            {/* <div className="mt-5  row justify-content-center">
                                                <div className="col-lg-5 col-md-6">
                                                    <div className="btn_add_to_cart"><a href="#0" className="btn_1">Update Order</a></div>
                                                </div>
                                            </div> */}
                                        </div>

                                        {/* /card-body */}
                                    </div>
                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        : <></>}
                        <div className="bg_white">
                            <div className="container margin_60_35">
                                <div className="main_title">
                                    <h2>Your orders</h2>
                                    <span>orders</span>
                                    <p></p>
                                </div>
                                {/* <div className="products_carousel"> */}
                                    <div className="row small-gutters">
                                        {orders.map( order =>
                                            <Product fromOrders product={{id: order.track_id, thumbnail: trucklogo, title: order.name, price: order.grand_total}} fromHome/>
                                        )}
                                    </div>
                                    {/* {orders.map( order => (
                                        <div class="item">
                                            <div class="grid_item">
                                                <figure>
                                                    <Link to={`/orders?order_id=${order.track_id}`}>
                                                        <img class="img-fluid lazy" src={trucklogo} data-src={trucklogo} alt="" />
                                                    </Link>
                                                </figure>
                                                <a href="product-detail-1.html">
                                                    <h2>{order.name}</h2>
                                                </a>
                                                <div class="price_box">
                                                    <span class="new_price">${order.grand_total}</span>
                                                </div>
                                            </div>
                                            {/* <!-- /grid_item --> */}
                                    {/* /item */}
                                    {/* /item */}
                                {/* /products_carousel */}
                            </div>
                            {/* /container */}
                        </div>
                    </div>

                    {/*/feat*/}
                </>
            }
        </main>

    )
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)( Orders ) );
