import { useEffect, useState } from "react";
import Sidebar from "../../components/nav/sidebar";
import Search from "../../components/nav/search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import axios from "axios";

const FilmById = ({ API_URL, API_KEY, URL_IMAGE }) => {
  const params = useParams();
  const [film, setFilm] = useState([]);
  const [credits, setCredits] = useState([]);
  let lenguaje;
  let genres = [];
  let release_date;
  let average;

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
    console.log("Film:", response);
    fetchCast(type, id);
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
    console.log("Credits:", cast);
  };

  function assignVariables(film) {
    if (film.spoken_languages && film.spoken_languages.length > 0) {
      lenguaje = film.spoken_languages[0].name;
    }
    genres = film.genres || [];
    release_date = film.release_date ? film.release_date.slice(0, 4) : "";
    average = film.vote_average || 0;
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

  useEffect(() => {
    captureParams(params);
  }, [params]);

  useEffect(() => {
    assignVariables(film);
  }, [film]);

  return (
    <div className="home">
      <Sidebar />
      <div className="home_body">
        <Search />
        <div className="film">
          <img src={`${URL_IMAGE + film.poster_path}`} alt="poster" />
          <div className="film_info">
            <div>
              {film.title ? <h1>{film.title}</h1> : <h1>{film.name}</h1>}
              <h5 style={{ color: "#9c9c9c", fontWeight: "700" }}>
                {film.tagline}
              </h5>
            </div>
            <div className="film_average">
              <h2>{film.vote_average}</h2>
              <div className="stars">{CalcStars(film.vote_average)}</div>
            </div>
            <div className="film_dates">
              <div className="film_date">
                <span className="date_title">Length</span>
                <span>{film.runtime} min.</span>
              </div>
              <div className="film_date">
                <span className="date_title">Language</span>
                <span>{lenguaje}</span>
              </div>
              <div className="film_date">
                <span className="date_title">Year</span>
                <span>{release_date}</span>
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
