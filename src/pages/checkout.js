import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { clear_order_status, load_scripts, place_order } from '../state/slices/pages/checkout/checkout_slice'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import "../styles/checkout.scss"
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { show_alert } from '../state/slices/commands/commands_slice';

const mapStateToProps = state => {
    return {
        cart: state.cart,
        loaded_scripts: state.pages.checkout.loaded_scripts,
        status: state.pages.checkout.status
    }
}

const mapDispatchToProps = dispatch => {
    return {
        load_scripts: () => dispatch(load_scripts("checkout", "default")),
        place_order: values => dispatch( place_order(values) ),
        show_alert: text => dispatch( show_alert( {text} ) ),
        clear_order_status: () => dispatch( clear_order_status() )
    }
}

const Checkout = props => {
    const { loaded_scripts, load_scripts, cart, place_order, status, show_alert, clear_order_status } = props;
    const history = useHistory();

    useEffect( () => {
        load_scripts("default");
    }, [] )

    useEffect( () => {
        if(status == "SUCCESS") {
            history.push('/order/confirm')
        }else if(status == "FAILURE") {
            show_alert( "Couldn't place order :(" )
            clear_order_status();
        }
    }, [status] )

    useEffect( () => {
        Promise.all(loaded_scripts.map( async script_src => {
            console.log(document.querySelector(`script[src="&#2547;{script_src}"]`), script_src);
            if(!document.querySelector(`script[src="&#2547;{script_src}"]`)) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const script_elem = document.createElement('script');
                script_elem.src = script_src;
                // script_elem.async = true;
                document.body.appendChild(script_elem);
                console.log("loaded script ", script_src);
            }  
        } ))
    }, [loaded_scripts])


    const schema = yup.object().shape({
        shipping_address: yup.object().shape({
            street: yup.string().required('required field'),
            city: yup.string().required('required field'),
            division: yup.string().required('required field'),
            mobile_no: yup.string().required('required field'),
        })
    });

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
                    <h1>Sign In or Create an Account</h1>
                </div> */}
                {/* /page_header */}
                <Formik
                    initialValues={{
                        "shipping_address": {
                          "name": "",
                          "mobile_no": "",
                          "street": "",
                          "city": "",
                          "zipcode": "",
                          "division": ""
                        },
                        "billing_address": {
                          "name": "",
                          "mobile_no": "",
                          "street": "",
                          "city": "",
                          "zipcode": "",
                          "division": ""
                        },
                        "name": "",
                        "contact_no": "",
                        "payment_method": "cash_on_delivery",

                        // "delivery_charge": 0,
                        // "special_note": "string",
                        // "discount": 0,
                        // "special_discount": 0,
                        // "paid_amount": 0,
                        // "remaining_amount": 0,
                    }}
                    // validate={ (values,errors) => {
                    //     if(!values.city) {
                    //         errors.city = "Required"
                    //     }
                    //     return errors;
                    // }}
                    validationSchema={schema}
                    onSubmit={(values, { setSubmitting }) => {
                        // setTimeout(() => {
                        //     alert(JSON.stringify(values, null, 2));
                        //     setSubmitting(false);
                        // }, 400);
                        console.log("came");
                        console.log(values);
                        place_order(values);
                        setSubmitting(false);
                    }}
                >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    }) => (
                <Form>
                <div className="row">
                    {/* {JSON.stringify(errors)} */}
                    <div className="col-lg-4 col-md-6">
                        <div className="step first">
                            <h3>1. User Info and Billing address</h3>
                            <ul className="nav nav-tabs" id="tab_checkout" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#tab_1" role="tab" aria-controls="tab_1" aria-selected="true">Register</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#tab_2" role="tab" aria-controls="tab_2" aria-selected="false">Login</a>
                                </li>
                            </ul>
                            <div className="tab-content checkout">
                                <div className="tab-pane fade show active" id="tab_1" role="tabpanel" aria-labelledby="tab_1">
                                    <div className="form-group">
                                        <Field type="text" className="form-control" placeholder="Name" name="name"/>
                                    </div>
                                    <div className="form-group">
                                        <Field type="text" className="form-control" placeholder="Contact number" name="contact_no"/>
                                    </div>
                                    <hr />
                                    <label for="shipping_address" class="form-label mb-2 ml-1">Shipping address</label>
                                    <div className="form-group">
                                        <Field type="text" className="form-control" placeholder="Name" name="shipping_address.name" />
                                    </div>
                                    <div className="form-group">
                                        <Field type="text" className="form-control" placeholder="Mobile number" name="shipping_address.mobile_no" />
                                        <ErrorMessage name="shipping_address.mobile_no" />
                                    </div>
                                    <div className="form-group">
                                        <Field type="text" className="form-control" placeholder="Address"  name="shipping_address.street"/>
                                        <ErrorMessage name="shipping_address.street" />
                                    </div>
                                    <div className="row no-gutters">
                                        <div className="col-6 form-group pr-1">
                                            <Field type="text" className="form-control" placeholder="City"  name="shipping_address.city"/>
                                            <ErrorMessage name="shipping_address.city" />
                                        </div>
                                        <div className="col-6 form-group pl-1">
                                            <Field type="text" className="form-control" placeholder="Division"  name="shipping_address.division"/>
                                            <ErrorMessage name="shipping_address.division" />
                                        </div>
                                    </div>
                                    {/* /row */}
                                    <hr />
                                    {/* <div className="form-group">
                                        <label className="container_check" id="other_addr">Billing address same as shipping address
                                            <input type="checkbox" defaultChecked="true" name="billing_same"/>
                                            <span className="checkmark" />
                                        </label>
                                    </div>
                                    <div id="other_addr_c" className="pt-2">
                                        <div className="form-group">
                                            <Field type="text" className="form-control" placeholder="Name" name="billing_address.name"/>
                                        </div>
                                        <div className="form-group">
                                            <Field type="text" className="form-control" placeholder="Mobile number" name="billing_address.mobile_no" />
                                            <ErrorMessage name="billin_address.mobile_no." />
                                        </div>
                                        <div className="form-group">
                                            <Field type="text" className="form-control" placeholder="Address" name="billing_address.street" />
                                            <ErrorMessage name="billin_address.street" />
                                        </div>
                                        <div className="row no-gutters">
                                            <div className="col-6 form-group pr-1">
                                                <Field type="text" className="form-control" placeholder="City"  name="billing_address.city"/>
                                                <ErrorMessage name="billin_address.city" />
                                            </div>
                                            <div className="col-6 form-group pl-1">
                                                <Field type="text" className="form-control" placeholder="Division"  name="billing_address.zipcode"/>
                                                <ErrorMessage name="shipping_address.division" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <Field type="text" className="form-control" placeholder="Division" name="billing_address.division" />
                                        </div>
                                    </div>
                                    <hr /> */}
                                </div>
                                {/* /tab_1 */}
                                {/* <div className="tab-pane fade" id="tab_2" role="tabpanel" aria-labelledby="tab_2">
                                    <a style={{cursor:'pointer'}}  className="social_bt facebook">Login con Facebook</a>
                                    <a style={{cursor:'pointer'}}  className="social_bt google">Login con Google</a>
                                    <div className="form-group">
                                        <Field type="email" className="form-control" placeholder="Email" />
                                    </div>
                                    <div className="form-group">
                                        <Field type="password" className="form-control" placeholder="Password" name="password_in" id="password_in" />
                                    </div>
                                    <div className="clearfix add_bottom_15">
                                        <div className="checkboxes float-left">
                                            <label className="container_check">Remember me
                                            <Field type="checkbox" />
                                                <span className="checkmark" />
                                            </label>
                                        </div>
                                        <div className="float-right"><a id="forgot" style={{cursor:'pointer'}} >Lost Password?</a></div>
                                    </div>
                                    <div id="forgot_pw">
                                        <div className="form-group">
                                            <Field type="email" className="form-control" name="email_forgot" id="email_forgot" placeholder="Type your email" />
                                        </div>
                                        <p>A new password will be sent shortly.</p>
                                        <div className="text-center"><Field type="submit" defaultValue="Reset Password" className="btn_1" /></div>
                                    </div>
                                    <hr />
                                    <Field type="submit" className="btn_1 full-width" defaultValue="Login" />
                                </div> */}
                                {/* /tab_2 */}
                            </div>
                        </div>
                        {/* /step */}
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="step middle payments">
                            <h3>2. Payment and Shipping</h3>
                            <ul>
                                <li>
                                    <label className="container_radio">Cash on delivery<a style={{cursor:'pointer'}}  className="info" data-toggle="modal" data-target="#payments_method" />
                                        <Field type="radio" name="payment_method" value="cash_on_delivery" defaultChecked />
                                        <span className="checkmark" />
                                    </label>
                                </li>
                            </ul>
                        </div>
                        {/* /step */}
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="step last">
                            <h3>3. Order Summary</h3>
                            <div className="box_general summary">
                                <ul>
                                    {cart.products.map( product => (
                                        <li className="clearfix"><em>{product.product__title}</em>  <span>&#2547;{product.product__price}</span></li>
                                    ) )}
                                </ul>
                                <ul>
                                    <li className="clearfix"><em><strong>Subtotal</strong></em>  <span>&#2547;{cart.total_amount}</span></li>
                                    <li className="clearfix"><em><strong>Shipping</strong></em> <span>&#2547;0</span></li>
                                </ul>
                                <ul className="input-group">
                                    <Field className="form-control mr-4 rounded flex-grow" type="text" name="prmo_code" />  
                                    <span><button type="button" className="form-control btn_1 px-3 " >Apply promo </button></span>
                                </ul>
                                <div className="total clearfix">TOTAL <span>&#2547;{cart.total_amount}</span></div>
                                {/* <div className="form-group">
                                    <label className="container_check">Register to the Newsletter.
                                        <input type="checkbox" defaultChecked />
                                        <span className="checkmark" />
                                    </label>
                                </div> */}
                                <button type="submit" className="btn_1 full-width">
                                    Place an order
                                </button>
                            </div>
                            {/* /box_general */}
                        </div>
                        {/* /step */}
                    </div>
                </div>
                </Form>
                    )}
                </Formik>

                {/* /row */}
            </div>
            {/* /container */}
        </main>

    )


}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout) ;