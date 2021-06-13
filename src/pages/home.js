import React, { useEffect, useState } from 'react';
import Carousel from '../components/home/carousel'
import Categories from '../components/home/categories'
import Trending from '../components/home/trending'

import { fetch_banners, fetch_trending_products } from '../state/slices/pages/home/home_slice';
import { connect, useSelector } from 'react-redux';
import { load_scripts } from '../state/slices/scripts/scripts_slice';
import Loading from '../components/Global/loading';
import { set_categories } from '../state/slices/statics/statics_slice';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
    return {
        categories: state.statics.categories.list,
        trending_products: state.pages.home.trending_products,
        loaded: state.pages.home.loaded,
        banners: state.pages.home.banners
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetch_trending_products: () => dispatch( fetch_trending_products() ),
        fetch_banners: () => dispatch( fetch_banners() ),
        load_scripts: comp => dispatch( load_scripts("home", comp) ),
        set_categories: () => dispatch( set_categories() )
    }
}


const Home = props => {
    const { loaded, banners, categories, set_categories, trending_products, fetch_trending_products, fetch_banners, load_scripts } = props;
    const [ loading, update_loading ] = useState(true);

    useEffect( () => {
        fetch_trending_products();
        fetch_banners();
        if(!categories.length) {
            set_categories();
        }
        load_scripts('default');
    }, [])
    
    useEffect( () => {
        if(loaded.includes('banners')) {
        }
        if(loaded.length >= 3) {
            load_scripts('carousel');
            update_loading(false);
        } else {
            update_loading(true);
        }

    }, [loaded] )

    return (
        loading ? 
            <Loading />
        :   <>  
                <Carousel banners={banners} />
                <Categories categories={categories} />
                <Trending products={trending_products} />
            </>
        
  )  
}

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( Home ) );