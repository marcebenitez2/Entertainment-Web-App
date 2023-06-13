import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../AppRouting";

const Search = ({ API_KEY, API_URL, TYPE }) => {
  const { setSearchResults } = useContext(SearchContext);
  const [searchKey, setSearchKey] = useState("");
  const navigate = useNavigate();
  let typeSearch = TYPE;

  const fetchMoviesByKey = async (searchKey) => {
    const { data: response } = await axios.get(`${API_URL}/search/multi`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
      },
    });
    setSearchResults(response);

  };

  const searchMovies = async (e) => {
    e.preventDefault();
    await fetchMoviesByKey(searchKey); // Espera a que la consulta a la API termine

    setTimeout(() => {
      navigate(`/search/${searchKey}`); // Navega a la otra página después de un retraso
    }, 1000); // Establece un retraso de 1 segundo (puedes ajustar el valor según tus necesidades)
  };

  return (
    <div className="search_container">
      <form className="search" onSubmit={searchMovies}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          width={"2rem"}
          viewBox="0 0 512 512"
        >
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
        </svg>

        {typeSearch ? (
          typeSearch === "movie" ? (
            <input
              type="text"
              placeholder="Search Movies"
              className="input_search"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            ></input>
          ) : (
            <input
              type="text"
              placeholder="Search TV"
              className="input_search"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            ></input>
          )
        ) : (
          <input
            type="text"
            placeholder="Search for movies or TV series"
            className="input_search"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          ></input>
        )}
        <button className="custom-btn btn-5" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
