import axios from "axios";
import React, { useEffect, useState } from "react";

const NowPlaying = ({ API_KEY, API_URL, TYPE, URL_IMAGE }) => {
  const [nowPlayings, setNowPlayings] = useState([]);

  const fetchNowPlayings = async () => {
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${TYPE}/now_playing`, {
      params: {
        api_key: API_KEY,
      },
    });

    setNowPlayings(results);
  };


  useEffect(()=>{
    fetchNowPlayings()
  },[])

//   console.log(nowPlayings)

  return <div></div>;
};

export default NowPlaying;
