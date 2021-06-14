import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { load_scripts } from '../state/slices/pages/checkout/checkout_slice'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import "../styles/checkout.scss"


const mapStateToProps = state => {
    return {
        cart: state.cart,
        loaded_scripts: state.pages.checkout.loaded_scripts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        load_scripts: () => dispatch(load_scripts("checkout", "default")),
    }
}

const Checkout = props => {
    const { loaded_scripts, load_scripts, cart } = props;

    useEffect( () => {
        load_scripts("default");
    }, [] )

    useEffect( () => {
        Promise.all(loaded_scripts.map( async script_src => {
            console.log(document.querySelector(`script[src="${script_src}"]`), script_src);
            if(!document.querySelector(`script[src="${script_src}"]`)) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const script_elem = document.createElement('script');
                script_elem.src = script_src;
                // script_elem.async = true;
                document.body.appendChild(script_elem);
                console.log("loaded script ", script_src);
            }  
        } ))
    }, [loaded_scripts])

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
                        // "delivery_charge": 0,
                        // "special_note": "string",
                        // "discount": 0,
                        // "special_discount": 0,
                        // "paid_amount": 0,
                        // "remaining_amount": 0,
                    }}
                    // validate={values => {
                    //     const errors = {};
                    //     if (!values.email) {
                    //         errors.email = 'Required';
                    //     } else if (
                    //         !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    //     ) {
                    //         errors.email = 'Invalid email address';
                    //     }
                    //     console.log("errors", errors);
                    //     return errors;
                    // }}
                    onSubmit={(values, { setSubmitting }) => {
                        // setTimeout(() => {
                        //     alert(JSON.stringify(values, null, 2));
                        //     setSubmitting(false);
                        // }, 400);
                        console.log("came");
                        console.log(values);
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
                                    </div>
                                    <div className="form-group">
                                        <Field type="text" className="form-control" placeholder="Street number"  name="shipping_address.street"/>
                                    </div>
                                    <div className="row no-gutters">
                                        <div className="col-6 form-group pr-1">
                                            <Field type="text" className="form-control" placeholder="City"  name="shipping_address.city"/>
                                        </div>
                                        <div className="col-6 form-group pl-1">
                                            <Field type="text" className="form-control" placeholder="Zip code"  name="shipping_address.zipcode"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <Field type="text" className="form-control" placeholder="Division" name="shipping_address.division"/>
                                    </div>
                                    {/* /row */}
                                    <hr />
                                    <div className="form-group">
                                        <label className="container_check" id="other_addr">Billing address same as shipping address
                                            <input type="checkbox" defaultChecked="true" name="billing_same"/>
                                            <span className="checkmark" />
                                        </label>
                                    </div>
                                    <div id="other_addr_c" className="pt-2">
                                        {/* /row */}
                                        <div className="form-group">
                                            <Field type="text" className="form-control" placeholder="Name" name="billing_address.name"/>
                                        </div>
                                        <div className="form-group">
                                            <Field type="text" className="form-control" placeholder="Mobile number" name="billing_address.mobile_no" />
                                        </div>
                                        <div className="form-group">
                                            <Field type="text" className="form-control" placeholder="Street" name="billing_address.street" />
                                        </div>
                                        <div className="row no-gutters">
                                            <div className="col-6 form-group pr-1">
                                                <Field type="text" className="form-control" placeholder="City"  name="billing_address.city"/>
                                            </div>
                                            <div className="col-6 form-group pl-1">
                                                <Field type="text" className="form-control" placeholder="Zip code"  name="billing_address.zipcode"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <Field type="text" className="form-control" placeholder="Division" name="billing_address.division" />
                                        </div>
                                        {/* /row */}
                                    </div>
                                    {/* /other_addr_c */}
                                    <hr />
                                </div>
                                {/* /tab_1 */}
                                {/* <div className="tab-pane fade" id="tab_2" role="tabpanel" aria-labelledby="tab_2">
                                    <a href="#0" className="social_bt facebook">Login con Facebook</a>
                                    <a href="#0" className="social_bt google">Login con Google</a>
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
                                        <div className="float-right"><a id="forgot" href="#0">Lost Password?</a></div>
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
                                    <label className="container_radio">Credit Card<a href="#0" className="info" data-toggle="modal" data-target="#payments_method" />
                                        <input type="radio" name="payment" defaultChecked />
                                        <span className="checkmark" />
                                    </label>
                                </li>
                                <li>
                                    <label className="container_radio">Paypal<a href="#0" className="info" data-toggle="modal" data-target="#payments_method" />
                                        <input type="radio" name="payment" />
                                        <span className="checkmark" />
                                    </label>
                                </li>
                                <li>
                                    <label className="container_radio">Cash on delivery<a href="#0" className="info" data-toggle="modal" data-target="#payments_method" />
                                        <input type="radio" name="payment" />
                                        <span className="checkmark" />
                                    </label>
                                </li>
                                <li>
                                    <label className="container_radio">Bank Transfer<a href="#0" className="info" data-toggle="modal" data-target="#payments_method" />
                                        <input type="radio" name="payment" />
                                        <span className="checkmark" />
                                    </label>
                                </li>
                            </ul>
                            {/* <div className="payment_info d-none d-sm-block"><figure><img src="img/cards_all.svg" alt /></figure>	<p>Sensibus reformidans interpretaris sit ne, nec errem nostrum et, te nec meliore philosophia. At vix quidam periculis. Solet tritani ad pri, no iisque definitiones sea.</p></div> */}
                            <h6 className="pb-2">Shipping Method</h6>
                            <ul>
                                <li>
                                    <label className="container_radio">Standard shipping<a href="#0" className="info" data-toggle="modal" data-target="#payments_method" />
                                        <input type="radio" name="shipping" defaultChecked />
                                        <span className="checkmark" />
                                    </label>
                                </li>
                                <li>
                                    <label className="container_radio">Express shipping<a href="#0" className="info" data-toggle="modal" data-target="#payments_method" />
                                        <input type="radio" name="shipping" />
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
                                        <li className="clearfix"><em>{product.product__title}</em>  <span>${product.product__price}</span></li>
                                    ) )}
                                </ul>
                                <ul>
                                    <li className="clearfix"><em><strong>Subtotal</strong></em>  <span>${cart.total_amount}</span></li>
                                    <li className="clearfix"><em><strong>Shipping</strong></em> <span>$0</span></li>
                                </ul>
                                <div className="total clearfix">TOTAL <span>${cart.total_amount}</span></div>
                                {/* <div className="form-group">
                                    <label className="container_check">Register to the Newsletter.
                                        <input type="checkbox" defaultChecked />
                                        <span className="checkmark" />
                                    </label>
                                </div> */}
                                <button type="submit" className="btn_1 full-width">
                                    Checkout and pay
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