import React, { useEffect, useState } from 'react';
import Logo from '../../img/logo.svg';
import axios from 'axios';
import {axiosConfig} from '../../config'

const Banners = props => {
	const [categories, update_categories] = useState([1,2,3]);
    
    useEffect(() => {
		window.axios = axios;
		window.axiosConfig = axiosConfig;
		axios({url: '/products/category/', ...axiosConfig})
		.then(d => {
			console.log(d.data.response.categories)
			update_categories(d.data.response.categories)
		}).catch(err => {
			console.log(err);
		})
	}, []);
    return (
        <ul id="banners_grid" className="clearfix">
            {categories.slice(0,3).map( cat => 
                <li>
                    <a href="#0" className="img_container">
                    <img src={cat.thumbnail} data-src={cat.thumbnail} alt={cat.alt} />
                    <div className="short_info opacity-mask" data-opacity-mask="rgba(0, 0, 0, 0.5)">
                        <h3>{cat.title}</h3>
                        <div><span className="btn_1">Shop Now</span></div>
                    </div>
                    </a>
                </li>
            )}
        </ul>    
    )
}

export default Banners;