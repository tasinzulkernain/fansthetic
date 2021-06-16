import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { clear_order_status } from '../state/slices/pages/checkout/checkout_slice'

const mapStateToProps = state => {
    return {
        status: state.pages.checkout.status
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clear_order_status: () => dispatch(clear_order_status())
    }
}

const OrderConfirm = props => {
    const { status, clear_order_status } = props;
    const history = useHistory();

    const validate = () => {
        if(status !== "SUCCESS") {
            history.push('/orders');
        }
    }

    useEffect( () => {
        validate();
        setTimeout( () => {
            clear_order_status();
        }, 5000);
    }, [] )

    useEffect( validate, [status] )    

    return (
        <main className="bg_gray">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div id="confirm">
                            <div className="icon icon--order-success svg add_bottom_15">
                                <svg xmlns="http://www.w3.org/2000/svg" width={72} height={72}>
                                    <g fill="none" stroke="#8EC343" strokeWidth={2}>
                                        <circle cx={36} cy={36} r={35} style={{ strokeDasharray: '240px, 240px', strokeDashoffset: 480 }} />
                                        <path d="M17.417,37.778l9.93,9.909l25.444-25.393" style={{ strokeDasharray: '50px, 50px', strokeDashoffset: 0 }} />
                                    </g>
                                </svg>
                            </div>
                            <h2>Order completed!</h2>
                            <p>You will be redirected to the orders page in 5 seconds</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    )
}

export default connect(mapStateToProps, mapDispatchToProps)( OrderConfirm )