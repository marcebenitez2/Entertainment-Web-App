import React, { useContext, useEffect } from "react";
import Sidebar from "../../components/nav/sidebar";
import Search from "../../components/nav/search";
import { LikeFilms } from "../../AppRouting";
import { useNavigate } from "react-router-dom";

const Favorite = () => {
  const navigate = useNavigate();
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "a5c29d96fe50ca375e2070a79cee4d16";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";

  // Obtener el valor del localStorage
  const storedFavorite = localStorage.getItem("favorite");
  const initialFavorite = storedFavorite ? JSON.parse(storedFavorite) : [];

  const { favorite, setFavorite } = useContext(LikeFilms);

  useEffect(() => {
    setFavorite(initialFavorite);
  }, []);

  useEffect(() => {
    // Guardar el estado favorite en el localStorage cuando cambie
    localStorage.setItem("favorite", JSON.stringify(favorite));
  }, [favorite]);

  return (
    <div className="home">
      <Sidebar actual_page={"favorite"}/>
      <div className="home_body">
        <Search API_KEY={API_KEY} API_URL={API_URL} />
        <h1>Favorites:</h1>
        <div className="grid_search">
          {favorite.map((x) => (
            <div
              key={x.id}
              className="grid_search_preview"
              onClick={() => {
                x.title ? navigate(`/movie/${x.id}`) : navigate(`/tv/${x.id}`);
              }}
              style={{ cursor: "pointer" }}
            >
              <img
                src={URL_IMAGE + x.poster_path}
                className="img_preview_search"
              />
              <div className="grid_search_dates">
                <h5 className="grid_title">{x.title ? x.title : x.name}</h5>
                <span style={{ color: "rgb(156, 156, 156)", fontSize: "12px" }}>
                  {x.release_date
                    ? x.release_date.slice(0, 4)
                    : x.first_air_date.slice(0, 4)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorite;
