import axios from "axios";
import { useState } from "react";

const Search = ({API_KEY, API_URL}) => {

  const [searchKey, setSearchKey] = useState("");
  const [movieSearch, setMovieSearch] = useState([]);

  const fetchMoviesByKey = async (searchKey) => {
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
      },
    });

    setMovieSearch(results)
    
  };


  
  const searchMovies = (e) => {
    e.preventDefault();
    fetchMoviesByKey(searchKey);
  };

  return (
    <form className="search" onSubmit={searchMovies}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        width={"2rem"}
        viewBox="0 0 512 512"
      >
        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
      </svg>
      <input
        type="text"
        placeholder="Search for movies or TV series"
        className="input_search"
        onChange={(e) => setSearchKey(e.target.value)}
      ></input>
      <button className="submit_search" type="submit">
        Search
      </button>
    </form>
  );
};

export default Search;
