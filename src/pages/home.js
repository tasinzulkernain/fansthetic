import React from 'react';
import Carousel from '../components/home/carousel'
import Banners from '../components/home/banners_grid'
import Trending from '../components/home/trending'

const Home = () => {
  return (
    <>
      <Carousel />
      <Banners />
      <Trending />
    </>
  )  
}

export default Home;