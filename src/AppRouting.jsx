import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Searchpage from "./pages/search/searchpage";
import Error404 from "./pages/404/Error404";
import { createContext, useState } from "react";
import MovieGenre from "./pages/FIlmByGenres/movieGenre";
import TvGenre from "./pages/genreList/tvGenre";
import FilmById from "./pages/film/FIlmPage";
import Searchbygenre from "./pages/genreList/searchbygenre";
import Favorite from "./pages/fav/FavoritePage";

export const SearchContext = createContext();
export const LikeFilms = createContext();

const AppRouting = () => {
  const [searchResults, setSearchResults] = useState([]);
  // const [clickPreview, setClickPreview] = useState([]);
  const [favorite, setFavorite] = useState([]);

  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "a5c29d96fe50ca375e2070a79cee4d16";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";

  return (
    <Router>
      <SearchContext.Provider value={{ searchResults, setSearchResults }}>
        <LikeFilms.Provider value={{favorite,setFavorite}}>
          <main>
            <Routes>
              <Route path={"/"} element={<Home />} />
              <Route
                path={"search/:searchkey"}
                element={
                  <Searchpage
                    API_URL={API_URL}
                    API_KEY={API_KEY}
                    URL_IMAGE={URL_IMAGE}
                  />
                }
              />
              <Route path={"movie"} element={<MovieGenre />} />
              <Route path="tv" element={<TvGenre />} />
              <Route path={"*"} element={<Error404 />} />
              <Route
                path="/:movie/:searchkey"
                element={
                  <FilmById
                    API_URL={API_URL}
                    API_KEY={API_KEY}
                    URL_IMAGE={URL_IMAGE}
                  />
                }
              />
              <Route
                path="/:tv/:searchkey"
                element={
                  <FilmById
                    API_URL={API_URL}
                    API_KEY={API_KEY}
                    URL_IMAGE={URL_IMAGE}
                  />
                }
              />
              <Route
                path="/:movie/genre/:idgenre"
                element={
                  <Searchbygenre
                    API_URL={API_URL}
                    API_KEY={API_KEY}
                    URL_IMAGE={URL_IMAGE}
                  />
                }
              />
              <Route
                path="/:tv/genre/:idgenre"
                element={
                  <Searchbygenre
                    API_URL={API_URL}
                    API_KEY={API_KEY}
                    URL_IMAGE={URL_IMAGE}
                  />
                }
              />

              <Route
                path="/favorites"
                element={<Favorite/>}
              />
            </Routes>
          </main>
        </LikeFilms.Provider>
      </SearchContext.Provider>
    </Router>
  );
};

export default AppRouting;
