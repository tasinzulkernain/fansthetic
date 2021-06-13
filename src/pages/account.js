import React, { useEffect } from 'react';
import '../styles/account.scss';

import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';

import { login, signup, reset_password_initiate, reset_password_confirm } from '../state/slices/auth/auth_slice'
import { load_scripts } from '../state/slices/scripts/scripts_slice';

const mapDispatchToProps = dispatch => {
    return {
        reset_password_initiate: (email) => dispatch( reset_password_initiate({email}) ),
        reset_password_confirm: (values) => dispatch( reset_password_confirm(values) ), 
        login: (username, password) => dispatch( login({username, password}) ),
        signup: values => dispatch( signup(values) ),
        load_scripts: () => dispatch( load_scripts("account", "default") )
    }
}

const mapStateToProps = state => {
    return {
        status: state.auth.status,
        statusText: state.auth.statusText
    }
}

const Account = props => {
    const { login, signup, status, statusText, load_scripts, reset_password_confirm, reset_password_initiate } = props;
    const alert = useAlert();

    useEffect( () => {
        load_scripts();
    }, [] )
    

    // useEffect( () => {
    //     // console.log(status);
    //     // if(status !== "PROCESSING") {
    //     //     alert.remove(statusText)
    //     //     alert.show(statusText);
    //     // }
    // }, [status] )
    
    return (
        <main className="bg_gray">
            <div className="container margin_30">
                <div className="page_header">
                    {/* <div className="breadcrumbs">
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Category</a></li>
                            <li>Page active</li>
                        </ul>
                    </div> */}
                    <h1>Sign In or Create an Account</h1>
                </div>
                {/* /page_header */}
                { status !== "PROCESSING" && status !== "" && statusText.search("FAILED") == -1 ?
                    <div className={`alert alert-success alert-dismissible fade show`} role="alert">
                        {statusText}
                        {/* <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button> */}
                    </div>
                : <></>}
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-6 col-md-8">
                        <div className="box_account ">
                            <h3 className="client">Already Client</h3>
                            
                            <div className="form_container">
                                {/* <div className="row no-gutters">
                                    <div className="col-lg-6 pr-lg-1">
                                        <a href="#0" className="social_bt facebook">Login with Facebook</a>
                                    </div>
                                    <div className="col-lg-6 pl-lg-1">
                                        <a href="#0" className="social_bt google">Login with Google</a>
                                    </div>
                                </div> */}
                                {/* <div className="divider"><span>Or</span></div> */}

                                <Formik
                                    initialValues= {{
                                        username: "",
                                        password: "",
                                    }}
                                    onSubmit= {values => {
                                        console.log(values);
                                        login( values.username, values.password );
                                    }}
                                >
                                <Form>
                                <div className="form-group">
                                    <Field type="text" className="form-control" name="username" id="username" placeholder="username*" />
                                </div>
                                <div className="form-group">
                                    <Field type="password" className="form-control" name="password" id="password_in" defaultValue placeholder="Password*" />
                                </div>
                                <div className="clearfix add_bottom_15">
                                    {/* <div className="checkboxes float-left">
                                        <label className="container_check">Remember me
                                            <input type="checkbox" />
                                            <span className="checkmark" />
                                        </label>
                                    </div> */}
							        <div class="float-right"><a id="forgot" href="javascript:void(0);">Lost Password?</a></div>
                                    {/* <div className="float-right"><a id="forgot" href="#" >Lost Password?</a></div> */}
                                </div>
                                <div className="text-center"><button type="submit" className="btn_1 full-width" type="submit"> Log in </button></div>
                                </Form>
                                </Formik>
                                
                                <div id="forgot_pw">
                                    <Formik
                                        initialValues={{

                                        }}
                                        onSubmit={ values => {
                                            reset_password_initiate(values.email);
                                            console.log(values);
                                        }}
                                    >
                                    <Form>
                                        <div className="form-group">
                                            <Field type="email" className="form-control" name="email" id="email_forgot" placeholder="Type your email" />
                                        </div>
                                        <p>You will receive a UID and a token at your email shortly. please enter those below</p>
                                        <div className="text-center"><button type="submit" className="btn_1" > Reset Password </button></div>
                                    </Form>
                                    </Formik>
                                    <hr/>
                                    <br/>
                                    <Formik
                                        initialValues={{
                                            new_password: "",
                                            new_password2: "",
                                            uid: "",
                                            token: "",
                                        }}
                                        onSubmit={ values => {
                                            console.log(values);
                                            reset_password_confirm(values);
                                        }}
                                    >
                                    <Form>
                                        <div className="form-group">
                                            <Field type="password" className="form-control" name="new_password1" placeholder="New password" />
                                        </div>
                                        <div className="form-group">
                                            <Field type="password" className="form-control" name="new_password2" placeholder="Confirm your new password" />
                                        </div>
                                        <div className="form-group">
                                            <Field type="text" className="form-control" name="uid" placeholder="UID" />
                                        </div>
                                        <div className="form-group">
                                            <Field type="text" className="form-control" name="token" placeholder="Token" />
                                        </div>
                                        <div className="text-center"><button type="submit" className="btn_1" > Submit </button></div>
                                    </Form>
                                    </Formik>
                                </div>
                            </div>
                            {/* /form_container */}
                        </div>
                        {/* /box_account */}
                        {/* <div className="row">
                            <div className="col-md-6 d-none d-lg-block">
                                <ul className="list_ok">
                                    <li>Find Locations</li>
                                    <li>Quality Location check</li>
                                    <li>Data Protection</li>
                                </ul>
                            </div>
                            <div className="col-md-6 d-none d-lg-block">
                                <ul className="list_ok">
                                    <li>Secure Payments</li>
                                    <li>H24 Support</li>
                                </ul>
                            </div>
                        </div> */}
                        {/* /row */}
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-8">
                        <div className="box_account">
                            <h3 className="new_client">New Client</h3> <small className="float-right pt-2">* Required Fields</small>
                            <Formik
                                initialValues={{
                                    username: "",
                                    email: "",
                                    password1: "",
                                    password2: "",
                                }}
                                onSubmit={ values => {
                                    console.log(values);
                                    signup(values);
                                } }
                            >
                            <Form>
                            <div className="form_container">
                                <div className="form-group">
                                    <Field type="text" className="form-control" name="username" placeholder="Username*" />
                                </div>
                                <div className="form-group">
                                    <Field type="email" className="form-control" name="email" placeholder="Email*" />
                                </div>
                                <div className="form-group">
                                    <Field type="password" className="form-control" name="password1" defaultValue placeholder="Password*" />
                                </div>
                                <div className="form-group">
                                    <Field type="password" className="form-control" name="password2" defaultValue placeholder="Confirm Password*" />
                                </div>
                                <hr />
                                <div class="text-center"><button type="submit" class="btn_1 full-width"> Register </button></div>
                            </div>
                            </Form>
                            </Formik>
                        </div>
                        {/* /box_account */}
                    </div>
                </div>
                {/* /row */}
            </div>
            {/* /container */}
        </main>

    )
}

export default connect( mapStateToProps, mapDispatchToProps )( Account );