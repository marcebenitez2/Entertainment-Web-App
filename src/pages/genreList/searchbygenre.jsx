import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/nav/sidebar";
import Search from "../../components/nav/search";

const Searchbygenre = ({ API_URL, API_KEY, URL_IMAGE }) => {
  const params = useParams();
  const navigate = useNavigate();
  let idgenre;
  let type;
  const [search, setSearch] = useState([]);

  function captureParams(params) {
    idgenre = params.idgenre;
    if (params.movie === "movie") {
      type = "movie";
    } else {
      type = "tv";
    }

  }

  const fetchFilmByGenre = async () => {
    const {
      data: { results },
    } = await axios.get(`${API_URL}/discover/${type}`, {
      params: {
        api_key: API_KEY,
        with_genres: idgenre,
      },
    });
    setSearch(results);
  };

  useEffect(() => {
    captureParams(params);
    fetchFilmByGenre();
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="home_body">
        <Search />
        <div className="genrefilm_grid">
          {search.map((x) => (
            <div
              key={x.id}
              className="genrefilm_preview"
              onClick={() => {
                x.name ? navigate(`/tv/${x.id}`) : navigate(`/movie/${x.id}`);
              }}
              style={{cursor:'pointer'}}
            >
              <img src={URL_IMAGE + x.poster_path}></img>
              {x.title ? <h5>{x.title}</h5> : <h5>{x.name}</h5>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Searchbygenre;
