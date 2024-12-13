import { useEffect, useState } from "react";
import "./App.css";

import Content from "./components/content";
import Footer from "./components/footer/footer";
import { Routes, Route, useNavigate } from "react-router-dom";
import Nav from "./components/nav/nav";
import MovieInfo from "./components/movie-info";

export default function App() {
  const [displaySpinner, setDisplaySpinner] = useState(false);

  console.log(displaySpinner);

  //<Footer displaySpinner={displaySpinner} />
  const [movieDetails, setMovieDetails] = useState({});
  console.log(movieDetails);

  const handleClick = (details) => {
    setMovieDetails(details);
  };

  const navigate = useNavigate();

  useEffect(() => {
    //To hand the page reload
    //To return to the home page during a page reload

    const entries = performance.getEntriesByType("navigation");
    //performance.getEntriesByType() is a part of the performance api which provides information about performance related events durinfg the life cycle of a webpage
    //performance.getEntriesByType("navigation") returns an array of navigation performance entries.For detecting refreshes 'navigate is used
    
    if (entries.length > 0 && entries[0].type === "reload") {
      navigate("/");
    }
    
  }, []);
  return (
    <div
      className="app"
      style={{ justifyContent: displaySpinner ? "center" : "" }}
    >
      <div
        className="spinner-component"
        style={{ display: displaySpinner ? "none" : "none" }}
      >
        Loading
        <div className="spinner"></div>
        <button onClick={() => setDisplaySpinner((prev) => !prev)}>
          Enter
        </button>
      </div>
      <Nav displaySpinner={displaySpinner} />

      <Routes>
        <Route
          path="/"
          element={
            <Content
              displaySpinner={displaySpinner}
              onCardClick={handleClick}
            />
          }
        />
        <Route
          path="/movie-info"
          element={
            <MovieInfo
              displaySpinner={displaySpinner}
              movieDetails={movieDetails}
            />
          }
        />
      </Routes>
      <Footer displaySpinner={displaySpinner} />
    </div>
  );
}
