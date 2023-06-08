import React from "react";
import Sidebar from "../../components/nav/sidebar";
import Search from "../../components/nav/search";

const Error404 = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="home_body">
        <Search/>
        <h1 style={{textAlign:'center',marginTop:'10rem'}}>404: Not Found</h1>
      </div>
    </div>
  );
};

export default Error404;
