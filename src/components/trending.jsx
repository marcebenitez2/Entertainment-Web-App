import axios from "axios";
import React, { useEffect, useState } from "react";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";

const Trending = ({ API_KEY, API_URL,TYPE, URL_IMAGE }) => {
  const [trendings, setTrendings] = useState([]);
  // const [trending, setTrending] = useState([]);

  const fetchTrending = async () => {
    const {
      data: { results },
    } = await axios.get(`${API_URL}/trending/${TYPE}/week`, {
      params: {
        api_key: API_KEY,
      },
    });

    setTrendings(results);
    // setTrending(results[0]);
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <div className="trending_container">
      <div className="trending_title">
        <h1>Trending</h1>
        <div className="subtitle_type">{`${TYPE.toUpperCase()}`}</div>
      </div>

      <Splide
        options={{
          type: "loop",
          perPage: 5,
          // focus: "center",
        }}
        className="trending_slider"
      >
        {trendings.map((movie) => (
          <SplideSlide key={movie.id}>
            <div style={{marginBottom:"2rem"}}>
              <img src={`${URL_IMAGE + movie.poster_path}`} alt="" className="trending_img"></img>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default Trending;
