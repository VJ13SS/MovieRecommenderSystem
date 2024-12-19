import { useEffect, useState } from "react";
import "./App.css";

import Content from "./components/content";
import Footer from "./components/footer/footer";
import { Routes, Route, useNavigate } from "react-router-dom";
import Nav from "./components/nav/nav";
import MovieInfo from "./components/movie-info";
import Authentications from "./components/authentications/authentications";

export default function App() {
  const [displayLogin, setDisplayLogin] = useState(true); //to display the login screen

  const [login, setLogin] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState({
    name: "",
    password: "",
  });

  const [userMovies, setUserMovies] = useState([]);

  const baseUrl = "http://127.0.0.1:5000";

  const [movieDetails, setMovieDetails] = useState({});

  //function used to update the user preference of movies(add movies chosen by the user to the database) and to get the recommendations based on them

  const updateUser = async (movie) => {
    try {
      userLoggedIn["movie"] = movie.Title;
      console.log("selected movie: ", userLoggedIn);
      const res = await fetch(baseUrl + "/update-user-movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLoggedIn),
      });
      const data = await res.json();
      setUserMovies(data);
      if (!res.ok) {
        console.log(data.error);
      }
      console.log("Recommended Movies", userMovies);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleClick = (details) => {
    setMovieDetails(details);
    updateUser(details);
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
      style={{ justifyContent: displayLogin ? "center" : "" }}
    >
      <Authentications
        login={login}
        setLogin={setLogin}
        setDisplayLogin={setDisplayLogin}
        displayLogin={displayLogin}
        baseUrl={baseUrl}
        setUserLoggedIn={setUserLoggedIn}
        setUserMovies={setUserMovies}
      />
      <Nav displayLogin={displayLogin} />

      <Routes>
        <Route
          path="/"
          element={
            <Content
              displayLogin={displayLogin}
              onCardClick={handleClick}
              baseUrl={baseUrl}
              userMovies={userMovies}
              setMovieDetails={setMovieDetails}
            />
          }
        />
        <Route
          path="/movie-info"
          element={
            <MovieInfo
              displayLogin={displayLogin}
              movieDetails={movieDetails}
            />
          }
        />
      </Routes>
      <Footer displayLogin={displayLogin} />
    </div>
  );
}
