import React, {useState, useEffect} from 'react';
import api from '../../api'

const Carousel = props => {
    const [banners, update_banners] = useState([1,2,3]);
	useEffect(() => {
		api({url: '/banners/'})
		.then(d => {
			console.log(d.data.response.banners)
			update_banners(d.data.response.banners)
		}).catch(err => {
			console.log(err);
		})
	}, []);
    return (
        <div id="carousel-home">
            <div className="owl-carousel owl-theme">
                {banners.map(banner => 
                    <div className="owl-slide cover" style={{backgroundImage: `url(${banner.thumbnail})`}} alt={banner.alt}>
                    <div className="opacity-mask d-flex align-items-center" data-opacity-mask="rgba(0, 0, 0, 0.5)">
                        <div className="container">
                        <div className="row justify-content-center justify-content-md-end">
                            <div className="col-lg-6 static">
                            <div className="slide-text text-right white">
                                <h2 className="owl-slide-animated owl-slide-title">Attack Air<br />Max 720 Sage Low</h2>
                                <p className="owl-slide-animated owl-slide-subtitle">
                                Limited items available at this price
                                </p>
                                <div className="owl-slide-animated owl-slide-cta"><a className="btn_1" href="listing-grid-1-full.html" role="button">Shop Now</a></div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                )}
            </div>    
            <div id="icon_drag_mobile" />
        </div>

    )
}

export default Carousel;