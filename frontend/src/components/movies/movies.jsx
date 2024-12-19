import { useNavigate } from "react-router-dom";
import "./movies.css";
import recommendationsData from "./recommendations";
import topData from "./topRatedData";
import { useEffect, useState } from "react";

export default function Movies({ onCardClick, baseUrl, userMovies }) {
  const navigate = useNavigate(); //use navigate hook

  const [popular, setPopular] = useState([]); //to set the popular movies based on user rating

  const displayPopularMovies = popular.length > 0 ? true : false;
  const displayRecommendations = userMovies.length > 0 ? true : false;

  useEffect(() => {
    const getTopRated = async () => {
      try {
        const respone = await fetch(baseUrl + "/popular-movies");
        const data = await respone.json();
        console.log(data);

        if (!respone.ok) {
          throw new Error("Failed to fetch the topRated movies");
        }
        setPopular(data);
      } catch (error) {
        console.log(error);
      }
    };
    getTopRated();
  }, []);

  const getMovie = () => {
    navigate("/movie-info");
  };

  const handleClick = (movie) => {
    console.log("Movie Selected: ", movie);
    onCardClick(movie);
    getMovie();
  };

  const topRated = popular.map((movie, index) => {
    return (
      <div className="movie" key={index} onClick={() => handleClick(movie)}>
        <img src={movie.Poster} alt="" />
      </div>
    );
  });

  const recommendations = userMovies.map((movie, index) => {
    return (
      <div className="movie" key={index} onClick={() => handleClick(movie)}>
        <img src={movie.Poster} alt="" />
      </div>
    );
  });

  return (
    <div className="movie-content" id="movie-content">
      {/* This will be displayed while the top rated movies are being fetched from the backend*/}
      {!displayPopularMovies && (
        <div className="recommendations-info">
          <span>Fetching the top rated movies...!</span>
          <div className="spinner-component">
            <div className="spinner"></div>
            <span>Loading</span>
          </div>
        </div>
      )}

      {/* Popular Movies will be displayed after being fetched from the backend*/}
      {displayPopularMovies && (
        <div className="movie-row">
          <span className="header">Trending Now</span>
          <div className="movies">{topRated}</div>
        </div>
      )}

      {/* This will be displayed when there are no recommendations or while the recommendations are being fetched from the backend*/}
      {!displayRecommendations && (
        <div className="recommendations-info">
          <span>*We are fetching your Recommendations...!</span>
          <span>
            **If you are a new user! select with any of the top rated movies to
            get your recommendations...!
          </span>
          <div className="spinner-component">
            <div className="spinner"></div>
            <span>Loading</span>
          </div>
        </div>
      )}

      {/* This will be displayed when the recommended movies are being fetched from the backend*/}
      {displayRecommendations && (
        <div className="movie-row">
          <span className="header">Your Recommendations</span>
          <div className="movies">{recommendations}</div>
        </div>
      )}
    </div>
  );
}
