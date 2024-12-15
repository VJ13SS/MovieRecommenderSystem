import { useEffect, useState } from "react";
import "./App.css";

import Content from "./components/content";
import Footer from "./components/footer/footer";
import { Routes, Route, useNavigate } from "react-router-dom";
import Nav from "./components/nav/nav";
import MovieInfo from "./components/movie-info";
import Authentications from "./components/authentications/authentications";

export default function App() {
  const [displaySpinner, setDisplaySpinner] = useState(true);
  const [login, setLogin] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState({
    name: "",
    password: "",
  });
  const [userMovies,setUserMovies] = useState([])
  console.log(userMovies.length);
  const baseUrl = "http://127.0.0.1:5000";

  //<Footer displaySpinner={displaySpinner} />
  const [movieDetails, setMovieDetails] = useState({});
  console.log(movieDetails);

  const updateUser = async (movie) => {
    try {
      userLoggedIn['movie'] = movie
      console.log('selected movie: ',userLoggedIn)
      const res = await fetch(baseUrl + "/update-user-movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLoggedIn),
      });
      const data = await res.json();
      setUserMovies(data)
      if (!res.ok) {
        console.log(data.error);
      }
      console.log('userMovies',data)
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleClick = (details) => {
    setMovieDetails(details);
    updateUser(details)
  };

  const handleAuthentications = (e) => {
    e.preventDefault();
    setDisplaySpinner(false);
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
      <Authentications
        login={login}
        setLogin={setLogin}
        setDisplaySpinner={setDisplaySpinner}
        displaySpinner={displaySpinner}
        baseUrl={baseUrl}
        setUserLoggedIn={setUserLoggedIn}
        setUserMovies={setUserMovies}
      />
      <Nav displaySpinner={displaySpinner} />

      <Routes>
        <Route
          path="/"
          element={
            <Content
              displaySpinner={displaySpinner}
              onCardClick={handleClick}
              baseUrl={baseUrl}
              userMovies={userMovies}
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
