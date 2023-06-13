import  { useContext } from "react";
import { SearchContext } from "../../AppRouting";
import Sidebar from "../../components/nav/sidebar";
import Search from "../../components/nav/search";
import { useNavigate, useParams } from "react-router-dom";

const Searchpage = ({ API_URL, API_KEY, URL_IMAGE }) => {
  const { searchResults, setSearchResults } = useContext(SearchContext);
  const { searchkey } = useParams();
  let listresults = searchResults.results;

  const navigate = useNavigate();

  listresults = listresults.filter((x) => x.poster_path !== null);
  let tvResults = listresults.filter((x) => x.media_type === "tv");
  let movieResults = listresults.filter((x) => x.media_type === "movie");

  // Función para truncar el texto
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  let TYPE = "";

  const handlePreviewClick = (previewID) => {
    navigate(`${TYPE}/${previewID}`);
  };

  return (
    <div className="home">
      <Sidebar />

      <div className="home_body">
        <Search API_KEY={API_KEY} API_URL={API_URL} />
        <div className="search_body">
          <h1>Results for `{searchkey}`...</h1>
          <h2
            style={{
              textAlign: "center",
              color: "#00bcd4",
              fontWeight: "900",
              marginTop: "3rem",
            }}
          >
            MOVIES
          </h2>
          <div>
            <div className="grid_search">
              {movieResults.map((preview) => (
                <div
                  key={preview.id}
                  className="grid_search_preview"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                   navigate(`/movie/${preview.id}`);
                  }}
                >
                  <img
                    src={URL_IMAGE + preview.poster_path}
                    className="img_preview_search"
                  />
                  <div className="grid_search_dates">
                    <h5 className="grid_title">
                      {truncateText(preview.title, 30)}
                    </h5>
                    <span style={{ color: "#9c9c9c", fontSize: "12px" }}>
                      {preview.release_date.substring(0, 4)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {tvResults.length > 0 ? (
            <div>
              <div>
                <h2
                  style={{
                    textAlign: "center",
                    color: "#00bcd4",
                    fontWeight: "900",
                    marginTop: "3rem",
                  }}
                >
                  SERIES
                </h2>
                <div className="grid_search">
                  {tvResults.map((preview) => (
                    <div
                      key={preview.id}
                      className="grid_search_preview"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate(`/tv/${preview.id}`);
                      }}
                    >
                      <img
                        src={URL_IMAGE + preview.poster_path}
                        className="img_preview_search"
                      />
                      <div className="grid_search_dates">
                        <h5 className="grid_title">
                          {truncateText(preview.name, 30)}
                        </h5>
                        <span style={{ color: "#9c9c9c", fontSize: "12px" }}>
                          {preview.first_air_date.substring(0, 4)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>{" "}
            </div>
          ) : (
            <div> </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Searchpage;
