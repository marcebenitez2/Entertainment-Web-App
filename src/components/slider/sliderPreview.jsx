import axios from "axios";
import { useEffect, useState } from "react";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useNavigate } from "react-router-dom";
import "@splidejs/splide/dist/css/splide.min.css";
import "../../../node_modules/@splidejs/splide/dist/js/splide.min.js";



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
  
      {sliderPreview.length > 0 && ( // Verificar si sliderPreview tiene elementos
        <Splide
          options={{
            type: "loop",
            perPage: 5,
            width: '100%',
            autoplay: true,
            breakpoints: {
              1626: {
                perPage: 4,
              },
              1364: {
                perPage: 3,
              },
              830: {
                perPage: 2,
                gap: 0,
              },
              540: {
                perPage: 1,
              }
            },
          }}
          className="slider_slide"
        >
          {sliderPreview.map((movie) => (
            <SplideSlide key={movie.id}>
              <div
                style={{ marginBottom: "2rem", cursor: "pointer" , display:'flex',justifyContent:'center'}}
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
      )}
    </div>
  );
  
};

export default SliderPreview;
