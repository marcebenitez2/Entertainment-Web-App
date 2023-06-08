import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GenrePreview = ({ CATEGORY }) => {
  const [gridGenre, setGridGenre] = useState([]);

  const fetchgrid = async () => {
    const {
      data: { genres },
    } = await axios.get(`https://api.themoviedb.org/3/genre/${CATEGORY}/list`, {
      params: {
        api_key: "a5c29d96fe50ca375e2070a79cee4d16",
      },
    });

    setGridGenre(genres);
    console.log(gridGenre);
  };

  const navigate = useNavigate()
  
  useEffect(() => {
    fetchgrid();
  }, []);

  return CATEGORY === "movie" ? (
    <div>
      <div className="grid_genre_movie">
        {gridGenre.map((preview, index) => (
          <div
            key={preview.id}
            className={`genre_${index}_movie genre_all_movie`}
            onClick={()=>navigate(`/movie/genre/${preview.id}`)}
          >
            <h4>{preview.name}</h4>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>
    <div className="grid_genre_tv">
      {gridGenre.map((preview, index) => (
        <div
          key={preview.id}
          className={`genre_${index}_tv genre_all_tv`}
          onClick={()=>navigate(`/tv/genre/${preview.id}`)}
        >
          <h4>{preview.name}</h4>
        </div>
      ))}
    </div>
  </div>
  );
};

export default GenrePreview;
