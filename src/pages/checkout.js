import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { clear_order_status, load_scripts, place_order } from '../state/slices/pages/checkout/checkout_slice'
import { Formik, Form, Field, ErrorMessage, useField, useFormikContext } from 'formik';
import "../styles/checkout.scss"
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { show_alert } from '../state/slices/commands/commands_slice';
import { initialize_cart } from '../state/slices/cart/cart_slice';

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
        clear_order_status: () => dispatch( clear_order_status() ),
        initialize_cart: () => dispatch( initialize_cart() )
    }
}


const CustomField = (props) => {
    const {
      values: { delivery_zone, cart_total, delivery_charge },
      touched,
      setFieldValue,
    } = useFormikContext();
    const [field, meta] = useField(props);
  
    console.log(props.values);

    React.useEffect(() => {
        if( props.name === "delivery_charge" ) {
            setFieldValue(props.name, delivery_zone === "Inside Dhaka" ? 60 : 150 );
        }
        if( props.name === "total" ) {
            console.log( cart_total, delivery_charge );
            setFieldValue(props.name, parseInt(cart_total) + parseInt(delivery_charge) );
        }
        if( props.name === "cart_total" ) {
            setFieldValue(props.name, parseInt(props.cart.total_amount))
        }
    }, [delivery_zone, cart_total, delivery_charge, props.cart]);


    return (
      <>
        <span {...props} {...field} >{field.value}</span>
        {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
      </>
    );
  };

const Checkout = props => {
    const { loaded_scripts, load_scripts, cart, place_order, status, show_alert, clear_order_status } = props;
    const history = useHistory();

    useEffect( () => {
        load_scripts("default");
    }, [] )

    useEffect( () => {
        if(status == "SUCCESS") {
            history.push('/order/confirm')
            props.initialize_cart();
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

    const x = useFormikContext();

    console.log(x);
    
    return (
        <main className="bg_gray">
            <div className="container margin_30">
                
                <Formik
                    initialValues={{
                        "shipping_address": {
                          "street": "3/7 johnson road",
                        },
                        "name": "Al-Mubin Nabil",
                        "contact_no": "01848333385",
                        "payment_method": "cash_on_delivery",
                        "delivery_zone": "Inside Dhaka",
                        "delivery_charge": 60,
                        "cart_total": cart.total_amount,
                        "total": cart.total_amount + 100,
                    }}
                    // validationSchema={schema}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log("came");
                        values = {
                            ...values,
                            // order_items: cart.products.map( p => ({
                            //     product_id: p.product_id,
                            //     title: p.product__title,
                            //     quantity: p.quantity,
                            //     price: p.product__price,
                            // }) )
                        }
                        delete values.cart_total;
                        delete values.total;
                        delete values.payment_method;
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
                    <div className="col-lg-4 col-md-6">
                        <div className="step first">
                            <h3>1. User Info and Billing address</h3>
                            <div className="tab-content checkout">
                                <div className="tab-pane fade show active" id="tab_1" role="tabpanel" aria-labelledby="tab_1">
                                    <div className="form-group">
                                        <Field type="text" className="form-control" placeholder="Name" name="name"/>
                                    </div>
                                    <div className="form-group">
                                        <Field type="text" className="form-control" placeholder="Contact number" name="contact_no"/>
                                    </div>
                                    <hr />
                                    
                                    <div className="form-group">
                                        <Field type="text" className="form-control" placeholder="Shipping Address" name="shipping_address.street"/>
                                    </div>
                                    
                                    <div className="form-group">
                                        <Field as="select" className="form-control" placeholder="Delivery Zone" name="delivery_zone">
                                            <option value="Inside Dhaka">Inside Dhaka</option>
                                            <option value="Outside Dhaka">Outside Dhaka</option>
                                        </Field>
                                    </div>
                                </div>
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
                                    <li className="clearfix">
                                        <em><strong>Subtotal</strong></em>  
                                        <CustomField name="cart_total" cart={cart} /> 
                                    </li>
                                    <li className="clearfix">
                                        <em><strong>Shipping</strong></em> 
                                        <CustomField name="delivery_charge" cart={cart} />
                                    </li>
                                </ul>
                                <div className="total clearfix">TOTAL <CustomField cart={cart} name="total" /> </div>
                                <button type="submit" className="btn_1 full-width">
                                    Place an order
                                </button>
                            </div>
                        </div>
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