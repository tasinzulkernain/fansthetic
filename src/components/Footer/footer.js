import React from 'react';
import facebook_icon from '../../img/facebook_icon.svg'
import cards_all from '../../img/cards_all.svg'
import insta_icon from '../../img/instagram_icon.svg'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapStateToProps = state => {
    return {
        categories: state.statics.categories.list
    }
}

const Footer = props => {
    const { categories } = props;

    return (
        <footer className="revealed">
            <div className="container">
                <div className="row">
                <div className="col-lg-3 col-md-6">
                    <h3 data-target="#collapse_1">Quick Links</h3>
                    <div className="collapse dont-collapse-sm links" id="collapse_1">
                    <ul>
                        {/* <li><a href="about.html">About us</a></li> */}
                        <li><Link to="/profile">My account</Link></li>
                        {/* <li><a href="contacts.html">Contacts</a></li> */}
                    </ul>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h3 data-target="#collapse_2">Categories</h3>
                    <div className="collapse dont-collapse-sm links" id="collapse_2">
                    <ul>
                        {categories.map( cat => <li><Link to={`/products?category=${cat.title}`}>{cat.title}</Link></li> )}
                    </ul>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h3 data-target="#collapse_3">Contacts</h3>
                    <div className="collapse dont-collapse-sm contacts" id="collapse_3">
                    <ul>
                        <li><a href="https://goo.gl/maps/9QLqg4cGTBteTt4R6"><i className="ti-home" /> Holy Criscent School, Block B, <br />Road 4, Rampura Banasree</a></li>
                        <li><i className="ti-headphone-alt" />01714456327 </li>
                        <li><i className="ti-email" /><a style={{cursor:'pointer'}} >fansthetic@gmail.com</a></li>
                    </ul>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h3 data-target="#collapse_4">About Us</h3>
                    <div className="collapse dont-collapse-sm" id="collapse_4">
                    Fansthetic is a leading fandom brand of fandom merchandise, with the goal of reshaping the fandom world of Bangladesh. We have merch from Anime, TV shows, Movies, Harry Potter, Games, Cartoon, Van Gogh, Music, any fandom you might think of!
                    {/* <div id="newsletter">
                        <div className="form-group">
                        <input type="email" name="email_newsletter" id="email_newsletter" className="form-control" placeholder="Your email" />
                        <button type="submit" id="submit-newsletter"><i className="ti-angle-double-right" /></button>
                        </div>
                    </div> */}
                    <div className="follow_us">
                        <h5>Follow Us</h5>
                        <ul>
                        <li><a style={{cursor:'pointer'}} ><img src={facebook_icon} data-src={facebook_icon} alt className="lazy" /></a></li>
                        <li><a style={{cursor:'pointer'}} ><img src={insta_icon} data-src={insta_icon} alt className="lazy" /></a></li>
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
                    {/* <li>
                        <div className="styled-select lang-selector">
                        <select>
                            <option value="English" selected>English</option>
                            <option value="French">French</option>
                            <option value="Spanish">Spanish</option>
                            <option value="Russian">Russian</option>
                        </select>
                        </div>
                    </li> */}
                    {/* <li>
                        <div className="styled-select currency-selector">
                        <select>
                            <option value="US Dollars" selected>US Dollars</option>
                            <option value="Euro">Euro</option>
                        </select>
                        </div>
                    </li> */}
                    {/* <li><img src={cards_all} alt width={198} height={30} className="lazy" /></li> */}
                    </ul>
                </div>
                <div className="col-lg-6">
                    {/* <ul className="additional_links">
                    <li><a style={{cursor:'pointer'}} >Terms and conditions</a></li>
                    <li><a style={{cursor:'pointer'}} >Privacy</a></li>
                    <li><span>© 2020 Allaia</span></li>
                    </ul> */}
                </div>
                </div>
            </div>
        </footer>

    )
}

export default connect( mapStateToProps, null )( Footer );