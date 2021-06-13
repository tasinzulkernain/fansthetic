import React from 'react';

// the style contains only the margin given as offset
// options contains all alert given options
// message is the alert message
// close is a function that closes the alert
const AlertTemplate = ({ style, options, message, close }) => (
    // <div style={style}>
    //   {options.type === 'info' && '!'}
    //   {options.type === 'success' && ':)'}
    //   {options.type === 'error' && ':('}
      
    //   <button onClick={close}>X</button>
    // </div>
    <div style={style} className={`alert alert-${options.type == "error" ? "danger" : options.type} alert-dismissible fade show`} role="alert">
        {message}
        <button onClick={close} type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">×</span>
        </button>
    </div>
)

export default AlertTemplate;