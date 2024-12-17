import { useState } from 'react';
import './grid.css'
import { useNavigate } from 'react-router-dom';

export default function Grid({setMovieDetails}) {
  const navigate = useNavigate();
  const [userInput,setUserInput] = useState('')
  const getMovie = () => {
    navigate("/movie-info");
  };

  const handleClick = (movie) => {
    console.log("Movie Selected: ", movie);
    setMovieDetails(movie);
    getMovie();
  };

  const searchMovie = async (movie) => {
    const response = await fetch (`https://www.omdbapi.com/?apikey=ad4bf0da&t=${movie}`)
    const data = await response.json()

    if(!response.ok|| data == 'Movie not found!'){
      return ;
    }
    handleClick(data)
  }
  return (
    <div className="grid">
      <div className="content">
        <h1>
          Unlimited <span>Movies</span> Unlimited <span>Fun</span>
        </h1>
        <p>
          Ready to enter into the diverse world of movies..?Engage your selves
          into the dynamic movie exprience
        </p>
      </div>
      <div className="input">
        <input type='text' placeholder='Search for a movie...' onChange={(e) => setUserInput(e.target.value)} value={userInput}/>
        <button onClick={() => searchMovie(userInput)}>Search</button>
      </div>
      
    </div>
  );
}
