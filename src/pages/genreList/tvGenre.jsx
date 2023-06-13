import React from 'react';
import Sidebar from '../../components/nav/sidebar';
import Search from '../../components/nav/search';
import GenrePreview from '../../components/GenresGrid/genrePreview';

const TvGenre = () => {

    const API_URL = "https://api.themoviedb.org/3";
    const API_KEY = "a5c29d96fe50ca375e2070a79cee4d16";
    const CATEGORY = "tv"
    const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
    const URL_IMAGE = "https://image.tmdb.org/t/p/original";
  

    return (
        <div className='home'>
            <Sidebar actual_page={"tv_genres"}/>
            <div className='home_body'>
                <Search API_KEY={API_KEY} API_URL={API_URL} TYPE={"TV"}/>
                <div>
                    <GenrePreview CATEGORY={CATEGORY}/>
                </div>
            </div>
            
        </div>
    );
}

export default TvGenre;
