import Sidebar from "../../components/nav/sidebar";
import Search from "../../components/nav/search";
import GenrePreview from "../../components/GenresGrid/genrePreview";

const MovieGenre = () => {

    const CATEGORY = "movie"
    const API_URL = "https://api.themoviedb.org/3";
    const API_KEY = "a5c29d96fe50ca375e2070a79cee4d16";

  return (
    <div className="home">
      <Sidebar actual_page={"movie_genre"}/>
      <div className="home_body">
        <Search API_KEY={API_KEY} API_URL={API_URL} TYPE={"movie"}/>
        <div>
          <GenrePreview CATEGORY={CATEGORY} />
        </div>
      </div>
    </div>
  );
};

export default MovieGenre;
