import React from 'react';
import '../styles/error_track.scss'
import img_404 from '../img/404.svg'

const NotFound = props => {
    return (
        <main className="bg_gray">
            <div id="error_page">
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-xl-7 col-lg-9">
                            <img src={img_404} alt className="img-fluid" width={400} height={212} />
                            <p>The page you're looking is not found!</p>
                            {/* <form>
                                <div className="search_bar">
                                    <input type="text" className="form-control" placeholder="What are you looking for?" />
                                    <input type="submit" defaultValue="Search" />
                                </div>
                            </form> */}
                        </div>
                    </div>
                    {/* /row */}
                </div>
                {/* /container */}
            </div>
            {/* /error_page */}
        </main>

    )
}

export default NotFound