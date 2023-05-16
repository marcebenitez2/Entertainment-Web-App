import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTv } from "@fortawesome/free-solid-svg-icons";
import { faFilm } from "@fortawesome/free-solid-svg-icons";

const Popular = ({ API_KEY, API_URL, TYPE, URL_IMAGE }) => {
  const [popularsMovies, setPopularsMovies] = useState([]);

  const fetchpopular = async () => {
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${TYPE}/popular`, {
      params: {
        api_key: API_KEY,
      },
    });

    setPopularsMovies(results);
    console.log(results);
  };

  useEffect(() => {
    fetchpopular();
  }, []);

  const popularpreview = popularsMovies.slice(0, 6);

  return (
    <div className="popular_container">
      <div className="popular_title">
        <h1>Popular</h1>
        <div className="subtitle_type">{`${TYPE.toUpperCase()}`}</div>
      </div>

      <div className="popular_grid">
        {popularpreview.map((preview, index) => (
          <div key={preview.id} className={`preview_${index}`}>
            <img
              src={`${URL_IMAGE + preview.backdrop_path}`}
              className="popular_preview"
            ></img>
            <div className="popular_info">
              <div className="popular_dates">
                <span style={{ color: "#9c9c9c" }}>
                  {preview.release_date.substring(0, 4)}
                </span>

                <span style={{ color: "#9c9c9c" }}>
                  {" "}
                  {TYPE === "movie" ? (
                    <span>
                      <FontAwesomeIcon icon={faFilm} style={{color:"#9c9c9c"}} />
                    </span>
                  ) : (
                    <span>
                      <FontAwesomeIcon icon={faTv} style={{color:"#9c9c9c"}}/>
                    </span>
                  )}
                  ·
                  {TYPE}
                </span>
              </div>
              <h5>{`${preview.title}`}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popular;
