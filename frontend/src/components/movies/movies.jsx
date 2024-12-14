import { useNavigate } from "react-router-dom";
import "./movies.css";
import recommendationsData from './recommendations'
import topData from './topRatedData'
import { useEffect, useState } from "react";

export default function Movies({onCardClick , baseUrl}) {
  const navigate = useNavigate();
  const [popular,setPopular] = useState([])
  
  useEffect(()=>{
    const getTopRated = async () =>{
      try{
        const respone = await fetch(baseUrl + '/popular-movies')
        const data = await respone.json()
        console.log(data)

        if(!respone.ok){
          throw new Error('Failed to fetch the topRated movies')
        }
        setPopular(data)
      }
      catch(error){
        console.log(error)
      };
    }
    getTopRated()
  },[])

  const getRecommendations = async () => {

  }
  const getMovie = () =>{
    navigate('/movie-info')
  }

  const handleClick = (movie) =>{
    onCardClick(movie)
    getMovie()
  }
  
  const topRated = popular.map((movie,index) => {
    return(
      <div className="movie" key = {index} onClick={()=>handleClick(movie)}>
            <img src={movie.image} alt="" />
          </div>
    )
  })

  const recommendations = recommendationsData.map((movie,index) => {
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
