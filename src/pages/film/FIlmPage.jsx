import { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/nav/sidebar";
import Search from "../../components/nav/search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LikeFilms } from "../../AppRouting";

const FilmById = ({ API_URL, API_KEY, URL_IMAGE }) => {
  const { favorite, setFavorite } = useContext(LikeFilms);
  const params = useParams();
  const [film, setFilm] = useState([]);
  const [credits, setCredits] = useState([]);
  const [lenguaje, setLenguaje] = useState("");
  const [genres, setGenres] = useState([]);
  const [release_date, setReleaseDate] = useState("");
  const [average, setAverage] = useState(0);

  function captureParams(params) {
    let type;
    let id;
    if (params.movie === "movie") {
      type = "movie";
    } else {
      type = "tv";
    }
    id = params.searchkey;
    fetchFilm(API_URL, type, API_KEY, id);
  }

  const fetchFilm = async (API_URL, type, API_KEY, id) => {
    const { data: response } = await axios.get(`${API_URL}/${type}/${id}`, {
      params: {
        api_key: API_KEY,
      },
    });
    setFilm(response);
    fetchCast(type, id);
    console.log(response);
  };

  const fetchCast = async (type, id) => {
    const {
      data: { cast },
    } = await axios.get(`${API_URL}/${type}/${id}/credits`, {
      params: {
        api_key: API_KEY,
      },
    });

    setCredits(cast);
  };

  function assignVariables(film) {
    if (film.spoken_languages && film.spoken_languages.length > 0) {
      setLenguaje(film.spoken_languages[0].name);
    }
    setGenres(film.genres || []);
    setReleaseDate(film.release_date ? film.release_date.slice(0, 4) : "");
    setAverage(film.vote_average || 0);
  }

  function CalcStars(average) {
    average = Math.round(average * 2) / 2;
    const stars = [];
    const maxStars = 5;
    const fullStars = Math.floor((average / 10) * (maxStars + 1));
    const hasHalfStar = average % 1 !== 0;
    for (let i = 0; i < maxStars; i++) {
      if (i < fullStars) {
        stars.push(<FontAwesomeIcon icon={faStar} key={i} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FontAwesomeIcon icon={faStarHalfAlt} key={i} />);
      } else {
        stars.push(<FontAwesomeIcon icon={faStar} key={i} opacity={0.3} />);
      }
    }
    return stars;
  }

  const [heartToggle, setHeartToggle] = useState(false);

  const Like = () => {
    setHeartToggle(!heartToggle);

    const filmId = film.id;
    const isFilmFavorite = favorite.some(
      (favoriteFilm) => favoriteFilm.id === filmId
    );

    if (isFilmFavorite) {
      const updatedFavorite = favorite.filter(
        (favoriteFilm) => favoriteFilm.id !== filmId
      );
      setFavorite(updatedFavorite);
    } else {
      setFavorite([...favorite, film]);
    }
  };

  useEffect(() => {
    captureParams(params);
  }, [params]);

  useEffect(() => {
    assignVariables(film);
  }, [film]);

  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(favorite));
  }, [favorite]);

  return (
    <div className="home">
      <Sidebar />
      <div className="home_body">
        <Search API_KEY={API_KEY} API_URL={API_URL} />
        <div className="film">
          <img src={`${URL_IMAGE + film.poster_path}`} alt="poster" />
          <div className="film_info">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                {film.title ? <h1>{film.title}</h1> : <h1>{film.name}</h1>}
                <h5 style={{ color: "#9c9c9c", fontWeight: "700" }}>
                  {film.tagline}
                </h5>
              </div>
              {
                <FontAwesomeIcon
                  icon={faHeart}
                  className={
                    favorite.some((e) => e.id === film.id)
                      ? "heart_toggle_on"
                      : "heart_toggle_off"
                  }
                  onClick={Like}
                />
              }
            </div>
            <div className="film_average">
              <h2>{film.vote_average}</h2>
              <div className="stars">{CalcStars(film.vote_average)}</div>
            </div>
            <div className="film_dates">
              <div className="film_date">
                <span className="date_title">Length</span>
                <span>
                  {film.runtime
                    ? film.runtime
                    : film.seasons && film.seasons.length}{" "}
                  <span>
                    {film.runtime
                      ? "mins"
                      : film.seasons && film.seasons.length && "seasons"}
                  </span>
                </span>
              </div>
              <div className="film_date">
                <span className="date_title">Language</span>
                <span>{lenguaje}</span>
              </div>
              <div className="film_date">
                <span className="date_title">Date</span>
                <span>
                  {film.release_date ? film.release_date : film.first_air_date}
                </span>
              </div>
            </div>
            <div className="film_text">
              <h5>Genres:</h5>
              <div className="film_genre">
                {genres.map((x) => (
                  <span key={x.id} className="subtitle_type_tv">
                    {x.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="film_text">
              <h5>Synopsis:</h5>
              <span>{film.overview}</span>
            </div>
            <div className="film_cast">
              <h5>Cast:</h5>
              <ul style={{ padding: "0" }}>
                {credits.map((x) => (
                  <li key={x.id} className="film_person">
                    {x.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmById;
