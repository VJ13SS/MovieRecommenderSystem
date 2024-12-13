import { useEffect, useState } from "react";
import "./App.css";

import Content from "./components/content";
import Footer from "./components/footer/footer";
import { Routes, Route, useNavigate } from "react-router-dom";
import Nav from "./components/nav/nav";
import MovieInfo from "./components/movie-info";

export default function App() {
  const [displaySpinner, setDisplaySpinner] = useState(true);
  const [login, setLogin] = useState(true);
  console.log(displaySpinner);

  //<Footer displaySpinner={displaySpinner} />
  const [movieDetails, setMovieDetails] = useState({});
  console.log(movieDetails);

  const handleClick = (details) => {
    setMovieDetails(details);
  };

  const handleAuthentications = (e) =>{
    e.preventDefault()
    setDisplaySpinner(false)
  }

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
        className="authentication"
        style={{ display: displaySpinner ? "flex" : "none" }}
      >
        <span className="header">N</span>
        {login && (
          <div className="login-form">
            <form action="" className="login">
              <input type="text" placeholder="Enter your email: " />
              <input type="text" placeholder="Enter the password: " />
              <button onClick={(e) => handleAuthentications(e)}>Login</button>
            </form>
            <a href="#" onClick={() => setLogin(false)}>
              new user? Sign in!
            </a>
          </div>
        )}
        {!login && (
          <div className="signin-form">
            <form action="" className="signin">
              <input type="text" placeholder="Enter your Name: " />
              <input type="email" placeholder="Enter your email: " />
              <input type="text" placeholder="Enter the password: " />
              <button onClick={(e) => handleAuthentications(e)}>Sign in</button>
            </form>
            <a href="#" onClick={() => setLogin(true)}>
              existing user? Login!
            </a>
          </div>
        )}
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
