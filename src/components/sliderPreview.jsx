import axios from "axios";
import { useEffect, useState } from "react";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useNavigate } from "react-router-dom";

const SliderPreview = ({ API_KEY, API_URL, CATEGORY, TYPE, URL_IMAGE }) => {
  const [sliderPreview, setSliderPreview] = useState([]);


  const navigate = useNavigate();

  const fetchSlider = async () => {
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${CATEGORY}/${TYPE}/week`, {
      params: {
        api_key: API_KEY,
      },
    });

    setSliderPreview(results);
  };

  useEffect(() => {
    fetchSlider();
  }, []);

  const handlePreviewClick = (previewID) => {
    navigate(`${TYPE}/${previewID}`);
  };

  return (
    <div className="slider_container">
      <div className="slider_title">
        <h1>Trending</h1>
        {TYPE === "tv" ? (
          <div className="subtitle_type_tv">TV SERIES</div>
        ) : (
          <div className="subtitle_type_movie">MOVIE</div>
        )}
      </div>

      <Splide
        options={{
          type: "loop",
          perPage: 5,
          breakpoints: {
            1626: {
              perPage: 4,
            },
            1364: {
              perPage: 3,
            },
            860: {
              perPage: 3,
              gap: 2,
            },
            541: {
              perPage: 2,
            },
          },
        }}
        className="slider_slide"
      >
        {sliderPreview.map((movie) => (
          <SplideSlide key={movie.id}>
            <div
              style={{ marginBottom: "2rem", cursor: "pointer" }}
              onClick={() => {
                handlePreviewClick(movie.id);
              }}
            >
              <img
                src={`${URL_IMAGE + movie.poster_path}`}
                alt=""
                className="slider_img"
              ></img>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default SliderPreview;
