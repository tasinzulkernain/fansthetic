import React from 'react';
import facebook_icon from '../../img/facebook_icon.svg'
import cards_all from '../../img/cards_all.svg'
import insta_icon from '../../img/instagram_icon.svg'

const Footer = props => {
    return (
        <footer className="revealed">
            <div className="container">
                <div className="row">
                <div className="col-lg-3 col-md-6">
                    <h3 data-target="#collapse_1">Quick Links</h3>
                    <div className="collapse dont-collapse-sm links" id="collapse_1">
                    <ul>
                        <li><a href="about.html">About us</a></li>
                        <li><a href="help.html">Faq</a></li>
                        <li><a href="help.html">Help</a></li>
                        <li><a href="account.html">My account</a></li>
                        <li><a href="blog.html">Blog</a></li>
                        <li><a href="contacts.html">Contacts</a></li>
                    </ul>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h3 data-target="#collapse_2">Categories</h3>
                    <div className="collapse dont-collapse-sm links" id="collapse_2">
                    <ul>
                        <li><a href="listing-grid-1-full.html">Clothes</a></li>
                        <li><a href="listing-grid-2-full.html">Electronics</a></li>
                        <li><a href="listing-grid-1-full.html">Furniture</a></li>
                        <li><a href="listing-grid-3.html">Glasses</a></li>
                        <li><a href="listing-grid-1-full.html">Shoes</a></li>
                        <li><a href="listing-grid-1-full.html">Watches</a></li>
                    </ul>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h3 data-target="#collapse_3">Contacts</h3>
                    <div className="collapse dont-collapse-sm contacts" id="collapse_3">
                    <ul>
                        <li><i className="ti-home" />97845 Baker st. 567<br />Los Angeles - US</li>
                        <li><i className="ti-headphone-alt" />+94 423-23-221</li>
                        <li><i className="ti-email" /><a href="#0">info@allaia.com</a></li>
                    </ul>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h3 data-target="#collapse_4">Keep in touch</h3>
                    <div className="collapse dont-collapse-sm" id="collapse_4">
                    <div id="newsletter">
                        <div className="form-group">
                        <input type="email" name="email_newsletter" id="email_newsletter" className="form-control" placeholder="Your email" />
                        <button type="submit" id="submit-newsletter"><i className="ti-angle-double-right" /></button>
                        </div>
                    </div>
                    <div className="follow_us">
                        <h5>Follow Us</h5>
                        <ul>
                        <li><a href="#0"><img src={facebook_icon} data-src={facebook_icon} alt className="lazy" /></a></li>
                        <li><a href="#0"><img src={insta_icon} data-src={insta_icon} alt className="lazy" /></a></li>
                        </ul>
                    </div>
                    </div>
                </div>
                </div>
                {/* /row*/}
                <hr />
                <div className="row add_bottom_25">
                <div className="col-lg-6">
                    <ul className="footer-selector clearfix">
                    <li>
                        <div className="styled-select lang-selector">
                        <select>
                            <option value="English" selected>English</option>
                            <option value="French">French</option>
                            <option value="Spanish">Spanish</option>
                            <option value="Russian">Russian</option>
                        </select>
                        </div>
                    </li>
                    <li>
                        <div className="styled-select currency-selector">
                        <select>
                            <option value="US Dollars" selected>US Dollars</option>
                            <option value="Euro">Euro</option>
                        </select>
                        </div>
                    </li>
                    <li><img src={cards_all} alt width={198} height={30} className="lazy" /></li>
                    </ul>
                </div>
                <div className="col-lg-6">
                    <ul className="additional_links">
                    <li><a href="#0">Terms and conditions</a></li>
                    <li><a href="#0">Privacy</a></li>
                    <li><span>© 2020 Allaia</span></li>
                    </ul>
                </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer;