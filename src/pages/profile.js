import { Formik, Field, Form, validateYupSchema } from 'formik';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Loading from '../components/Global/loading';
import { fetch_profile, password_change, update_profile } from '../state/slices/profile/profile_slice';

const mapStateToProps = state => {
    return {
        status: state.profile.status,
        statusText: state.profile.statusText,
        profile: state.profile.profile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initialize: () => dispatch( fetch_profile() ),
        update_profile: values => dispatch( update_profile(values) ),
        password_change: values => dispatch( password_change(values) )
    }
}

const Profile = props => {
    const { status, statusText, profile, initialize, update_profile, password_change } = props;
    const [ profile_s, update_profile_s ] = useState(profile);

    useEffect( () => {
        initialize();
    }, [] )


    return (
        status === "INITIALIZING" | status === "" ? 
            <Loading />
        :   <div className="container margin_60_35 mb-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    { status === "SUCCESS" || statusText.search("FAILED") != -1 ?
                        <div className={`alert alert-success alert-dismissible fade show`} role="alert">
                            {statusText}
                            {/* <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button> */}
                        </div>
                    : <></>}
                    <Formik
                        initialValues={{
                            first_name: profile.first_name,
                            last_name: profile.last_name,
                            username: profile.username
                        }}
                        enableReinitialize
                        onSubmit={ values => {
                            update_profile(values)
                        } }
                    >
                    <Form>
                    <div className="write_review">
                        <h1>Edit Profile </h1>
                        {/* /rating_submit */}
                        <div className="form-group">
                            <label>username</label>
                            <Field name="username" defaultValue={profile.username} disabled className="form-control" type="text" placeholder="username" />
                        </div>
                        <div className="form-group">
                            <label>First name</label>
                            <Field name="first_name" defaultValue={profile.first_name} className="form-control" type="text" placeholder="first name" />
                        </div>
                        <div className="form-group">
                            <label>Last name</label>
                            <Field name="last_name" defaultValue={profile.last_name} className="form-control" placeholder="last_name"/>
                        </div>
                        <button type="submit" className="btn_1"> Update Profile </button>
                    </div>
                    </Form>
                    </Formik>
                    <div className="mt-5">
                        <h4> Change password </h4>
                        <Formik
                            initialValues={{
                                old_password: "",
                                new_password1: "",
                                new_password2: ""
                            }}
                            onSubmit={ values => {
                                password_change( values );
                            } }
                        >
                        <Form>
                        <div className="write_review">
                            <div className="form-group">
                                <Field name="old_password" className="form-control" type="password" placeholder="Current password" />
                            </div>
                            <div className="form-group">
                                <Field name="new_password1" className="form-control" type="password" placeholder="New password" />
                            </div>
                            <div className="form-group">
                                <Field name="new_password2" className="form-control" type="password" placeholder="Confirm new password"/>
                            </div>
                            <button type="submit" className="btn_1"> Change password </button>
                        </div>
                        </Form>
                        </Formik>
                    </div>
                </div>
            </div>
            {/* /row */}
        </div>

    )
}

export default connect( mapStateToProps, mapDispatchToProps )( Profile );