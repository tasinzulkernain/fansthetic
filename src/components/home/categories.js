import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../img/logo.svg';

import api from '../../api'

const Banners = props => {

    const { categories } = props;

    return (
        <ul id="banners_grid" className="clearfix">
            {typeof categories === "object" && categories.slice(0,6).map( cat => 
                <li>
                    <Link to={`/products?category=${cat.title}`} className="img_container">
                    <img src={cat.thumbnail} data-src={cat.thumbnail} alt={cat.alt} />
                    <div className="short_info opacity-mask" data-opacity-mask="rgba(0, 0, 0, 0.5)">
                        <h3>{cat.title}</h3>
                        <div><span className="btn_1">Shop Now</span></div>
                    </div>
                    </Link>
                </li>
            )}
        </ul>    
    )
}

export default Banners;