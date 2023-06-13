import "../../styles/style.css";
import Sidebar from "../../components/nav/sidebar";
import Search from "../../components/nav/search";
import GridPreview from "../../components/gridPreview/GridPreview";
import SliderPreview from "../../components/slider/sliderPreview";

const Home = () => {
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "a5c29d96fe50ca375e2070a79cee4d16";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";

  return (
    <>
      <span className="span">
        Developed by {}
        <a
          href="https://www.linkedin.com/in/benitez-marcelo"
          style={{ textDecoration: "none", fontWeight: "800" , fontStyle:'italic'}}
        >
          Marce Benitez (ɔ◔‿◔)ɔ ♥
        </a>
      </span>
      <div className="home">
        <Sidebar actual_page={"home_page"} />

        <div className="home_body">
          <Search API_KEY={API_KEY} API_URL={API_URL} />

          <SliderPreview
            API_KEY={API_KEY}
            API_URL={API_URL}
            CATEGORY={"trending"}
            TYPE={"movie"}
            URL_IMAGE={URL_IMAGE}
          />

          <GridPreview
            API_KEY={API_KEY}
            API_URL={API_URL}
            TYPE={"movie"}
            CATEGORY={"popular"}
            URL_IMAGE={URL_IMAGE}
          />

          <GridPreview
            API_KEY={API_KEY}
            API_URL={API_URL}
            TYPE={"movie"}
            CATEGORY={"now_playing"}
            URL_IMAGE={URL_IMAGE}
          />

          <GridPreview
            API_KEY={API_KEY}
            API_URL={API_URL}
            TYPE={"movie"}
            CATEGORY={"upcoming"}
            URL_IMAGE={URL_IMAGE}
          />

          <GridPreview
            API_KEY={API_KEY}
            API_URL={API_URL}
            TYPE={"movie"}
            CATEGORY={"top_rated"}
            URL_IMAGE={URL_IMAGE}
          />

          <SliderPreview
            API_KEY={API_KEY}
            API_URL={API_URL}
            CATEGORY={"trending"}
            TYPE={"tv"}
            URL_IMAGE={URL_IMAGE}
          />

          <GridPreview
            API_KEY={API_KEY}
            API_URL={API_URL}
            TYPE={"tv"}
            CATEGORY={"popular"}
            URL_IMAGE={URL_IMAGE}
          />

          <GridPreview
            API_KEY={API_KEY}
            API_URL={API_URL}
            TYPE={"tv"}
            CATEGORY={"airing_today"}
            URL_IMAGE={URL_IMAGE}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
