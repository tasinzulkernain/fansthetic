import React from 'react';
import loading from '../../img/loading.svg'

const Loading = props => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: '100vh', width: '100vw'}}>
            <img src={loading} alt="loading" height="50" width="50"/>
        </div>
    )
}

export default Loading;