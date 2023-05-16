import "../../styles/style.css";
import Sidebar from "../../components/sidebar";
import Search from "../../components/search";
import { useEffect, useState } from "react";
import Trending from "../../components/trending";
import Popular from "../../components/popular";
import NowPlaying from "../../components/nowPlaying";
import ImagesID from "../../components/imagesID";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [playing, setPlaying] = useState(false);

  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "a5c29d96fe50ca375e2070a79cee4d16";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";

  return (
    <div className="home">
      <Sidebar />
      <div className="home_body">
        <Search API_KEY={API_KEY} URL_IMAGE={URL_IMAGE} />
        <Trending
          API_KEY={API_KEY}
          API_URL={API_URL}
          TYPE={"movie"}
          URL_IMAGE={URL_IMAGE}
        />
        <Popular
          API_KEY={API_KEY}
          API_URL={API_URL}
          TYPE={"movie"}
          URL_IMAGE={URL_IMAGE}
        />
        <NowPlaying
          API_KEY={API_KEY}
          API_URL={API_URL}
          TYPE={"movie"}
          URL_IMAGE={URL_IMAGE}
        />
        {/* <ImagesID
          API_KEY={API_KEY}
          API_URL={API_URL}
          TYPE={"movie"}
          URL_IMAGE={URL_IMAGE}
        /> */}
      </div>
    </div>
  );
};

export default Home;
