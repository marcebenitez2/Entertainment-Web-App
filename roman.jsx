import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import { useEffect, useState } from "react";
import axios from "axios";

const AppRouting = () => {
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "a5c29d96fe50ca375e2070a79cee4d16";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";
  const TRENDING_URL = "https://api.themoviedb.org/3/trending";

  //variables de estado

  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [playing, setPlaying] = useState(false);
  const [trendings, setTrendings] = useState([]);
  const [trending, setTrending] = useState([]);

  //   Funcion para realizar peticion por get

  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
      },
    });

    console.log("data", results);
    // setSelectedMovie(results[0])

    setMovies(results);
    setMovie(results[0]);
  };

  const fetchTrending = async () => {
    const {
      data: { results },
    } = await axios.get(`${TRENDING_URL}/movie/week`, {
      params: {
        api_key: API_KEY,
      },
    });

    setTrendings(results);
    setTrending(results[0]);
  };

  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  useEffect(() => {
    fetchMovies();
    fetchTrending()
  }, []);

  return (
    <div>
      <h2 className="text-center mt-5 mb-5">Trailer Movies</h2>
      {/* Buscador */}
      <form className="container mb-4" onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="search"
          style={{ color: "black" }}
          onChange={(e) => setSearchKey(e.target.value)}
        ></input>
        <button className="btn btn-primary">Search</button>
      </form>

      {/* Mapeor de peliculas */}
      <div className="container mt-3">
        <div className="row">
          {movies.map((movie) => (
            <div key={movie.id} className="col-md-4 mb-3">
              <img
                src={`${URL_IMAGE + movie.poster_path}`}
                alt=""
                height={600}
                width="100%"
              />
              <h4 className="text-center">{movie.title}</h4>
            </div>
          ))}
        </div>
      </div>

      <h1>Marvo cancer</h1>
      <div className="container mt-3">
        <div className="row">
          {trendings.map((movie)=>(
            <div key={movie.id} className="col-md-4 mb-3">
            <img
                src={`${URL_IMAGE + movie.poster_path}`}
                alt=""
                height={600}
                width="100%"
              />
              <h4 className="text-center">{movie.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>


    // <Router>
    //   <main>
    //     <Routes>
    //       <Route path={"/"} element={<Home />} />
    //     </Routes>
    //   </main>
    // </Router>
  );
};

export default AppRouting;
