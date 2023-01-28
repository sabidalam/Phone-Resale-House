import React from 'react';
import AdvertisedItems from './AdvertisedItems/AdvertisedItems';
import Banner from './Banner/Banner';
import CategoryHome from './Categories/CategoryHome';
import Contact from './Contact/Contact';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <CategoryHome></CategoryHome>
            <AdvertisedItems></AdvertisedItems>
            <Contact></Contact>

        </div>
    );
};

export default Home;