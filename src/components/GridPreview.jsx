import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTv } from "@fortawesome/free-solid-svg-icons";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
// import { PreviewContext } from "../AppRouting";

const GridPreview = ({ API_KEY, API_URL, TYPE, CATEGORY, URL_IMAGE }) => {
  const [gridPreview, setGridPreview] = useState([]);
  const navigate = useNavigate();
  const fetchgrid = async () => {
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${TYPE}/${CATEGORY}`, {
      params: {
        api_key: API_KEY,
      },
    });
    setGridPreview(results);
    // console.log(results)
  };

  useEffect(() => {
    fetchgrid();
  }, []);

  const showGrid = gridPreview.slice(0, 6);

  CATEGORY.charAt(0).toUpperCase() + CATEGORY.slice(1);

  const handlePreviewClick = (previewID) => {
    navigate(`${TYPE}/${previewID}`);
  };

  return (
    <div>
      <div className="grid_container">
        <div className="grid_title">
          {CATEGORY === "now_playing" ? (
            <h1>
              {CATEGORY.replace(/_/g, " ").replace(/\b\w/g, (c) =>
                c.toUpperCase()
              )}
            </h1>
          ) : (
            <h1>{CATEGORY.charAt(0).toUpperCase() + CATEGORY.slice(1)}</h1>
          )}
          {TYPE === "tv" ? (
            <div className="subtitle_type_tv">TV SERIES</div>
          ) : (
            <div className="subtitle_type_movie">MOVIE</div>
          )}
        </div>

        <div className="preview_grid">
          {TYPE === "movie"
            ? showGrid.map((preview, index) => (
                <div
                  key={preview.id}
                  className={`preview_${index}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => handlePreviewClick(preview.id)}
                >
                  <img
                    src={`${URL_IMAGE + preview.backdrop_path}`}
                    className="img_preview"
                  ></img>
                  <div className="grid_info">
                    <div className="grid_dates">
                      <span style={{ color: "#9c9c9c" }}>
                        {preview.release_date.substring(0, 4)}
                      </span>

                      <span style={{ color: "#9c9c9c" }}>
                        {" "}
                        {TYPE === "movie" ? (
                          <span>
                            <FontAwesomeIcon
                              icon={faFilm}
                              style={{ color: "#9c9c9c" }}
                            />
                          </span>
                        ) : (
                          <span>
                            <FontAwesomeIcon
                              icon={faTv}
                              style={{ color: "#9c9c9c" }}
                            />
                          </span>
                        )}
                        ·{TYPE}
                      </span>
                    </div>
                    <h6 className="grid_title">{`${preview.title}`}</h6>
                  </div>
                </div>
              ))
            : showGrid.map((preview, index) => (
                <div
                  key={preview.id}
                  className={`preview_${index}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => handlePreviewClick(preview.id)}
                >
                  {preview.backdrop_path ? (
                    <img
                      src={`${URL_IMAGE + preview.backdrop_path}`}
                      className="img_preview"
                    ></img>
                  ) : (
                    <img
                      src={`${URL_IMAGE + preview.poster_path}`}
                      className="img_preview"
                    ></img>
                  )}

                  <div className="grid_info">
                    <div className="grid_dates">
                      <span style={{ color: "#9c9c9c" }}>
                        {preview.first_air_date.substring(0, 4)}
                      </span>

                      <span style={{ color: "#9c9c9c" }}>
                        {" "}
                        {TYPE === "movie" ? (
                          <span>
                            <FontAwesomeIcon
                              icon={faFilm}
                              style={{ color: "#9c9c9c" }}
                            />
                          </span>
                        ) : (
                          <span>
                            <FontAwesomeIcon
                              icon={faTv}
                              style={{ color: "#9c9c9c" }}
                            />
                          </span>
                        )}
                        ·{TYPE}
                      </span>
                    </div>
                    <h6>{`${preview.name}`}</h6>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default GridPreview;
