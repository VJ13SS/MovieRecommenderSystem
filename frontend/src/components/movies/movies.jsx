import { useNavigate } from "react-router-dom";
import "./movies.css";
import recommendationsData from './recommendations'
import topData from './topRatedData'

export default function Movies({onCardClick}) {
  const navigate = useNavigate();
  const getMovie = () =>{
    navigate('/movie-info')
  }

  const handleClick = (movie) =>{
    onCardClick(movie)
    getMovie()
  }
  const topRated = topData.map((movie,index) => {
    return(
      <div className="movie" key = {index} onClick={()=>handleClick(movie)}>
            <img src={movie.image} alt="" />
          </div>
    )
  })

  const recommendations = topData.map((movie,index) => {
    return(
      <div className="movie" key = {index} onClick={()=>handleClick(movie)}>
            <img src={movie.image} alt="" />
          </div>
    )
  })
  
  return (
    <div
      className="movie-content"
      id = 'movie-content'
    >
      <div className="movie-row">
        <span className="header">Trending Now</span>
        <div className="movies">
          {topRated}
        </div>
      </div>
      <div className="movie-row">
        <span className="header">Your Recommendations</span>
        <div className="movies">
          {recommendations}
        </div>
      </div>
    </div>
  );
}
