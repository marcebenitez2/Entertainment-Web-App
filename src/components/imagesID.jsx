import axios from "axios";
import React, { useEffect, useState } from "react";

const ImagesID = ({ API_KEY, API_URL, TYPE, URL_IMAGE }) => {
  const [images, setimages] = useState([]);

  const fetchImg = async () => {
    const {
      data: {backdrops},
    } = await axios.get(
      `https://api.themoviedb.org/3/movie/713704/images?api_key=a5c29d96fe50ca375e2070a79cee4d16`,
      {
        params: {
          api_key: API_KEY,
          language: "es-ES", // Cambia el valor del lenguaje a 'es-ES' para español
          include_image_language: "es,null",
        },
      }
    );

    // console.log(data);
    setimages(backdrops);
  };

  useEffect(() => {
    fetchImg(); // Agregar paréntesis para llamar a la función
  }, []);

  useEffect(() => {
    console.log(images); // Observa los cambios en el estado images
  }, [images]);

  return (
    <div>
      {images.map((img) => (
        <img
          key={img.id}
          src={`${URL_IMAGE + img.file_path}`}
          alt="asd"
          width={500}
        ></img>
      ))}
    </div>
  );
};

export default ImagesID;
