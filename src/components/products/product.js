import React from 'react';

const Product = props => {
    const { product } = props;
    return (
        <div class="col-6 col-md-4">
            <div class="grid_item">
                {product.is_trending ?
                    <span className={`ribbon off`}>Trending</span>
                :   <span className={`ribbon hot`}>New</span>
                }
                <figure>
                    <a href="product-detail-1.html">
                        <div className="d-flex flex-column justify-content-center">
                            <img class="img-fluid lazy center-block" src={product.thumbnail} data-src={product.thumbnail} alt=""/>
                        </div>
                    </a>
                    {/* <div data-countdown="2019/05/15" class="countdown"></div> */}
                </figure>
                <a href="product-detail-1.html">
                    <h3>{product.title}</h3>
                </a>
                <div class="price_box">
                    <span class="new_price">{product.price} {'\u09F3'}</span>
                    {/* <span class="old_price">$60.00</span> */}
                </div>
                <ul>
                    <li><a href="#0" class="tooltip-1" data-toggle="tooltip" data-placement="left" title="Add to favorites"><i class="ti-heart"></i><span>Add to favorites</span></a></li>
                    <li><a href="#0" class="tooltip-1" data-toggle="tooltip" data-placement="left" title="Add to compare"><i class="ti-control-shuffle"></i><span>Add to compare</span></a></li>
                    <li><a href="#0" class="tooltip-1" data-toggle="tooltip" data-placement="left" title="Add to cart"><i class="ti-shopping-cart"></i><span>Add to cart</span></a></li>
                </ul>
            </div>
        </div>
    )
}

export default Product;