import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
// import { useEffect, useState } from "react";
// import axios from "axios";

const AppRouting = () => {
  return (
    <Router>
      <main>
        <Routes>
          <Route path={"/"} element={<Home />} />
        </Routes>
      </main>
    </Router>
  );
};

export default AppRouting;
