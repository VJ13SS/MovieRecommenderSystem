import "./content.css";
import Footer from "./footer/footer";
import Grid from "./grid/grid";
import MovieInfo from "./movie-info";
import Movies from "./movies/movies";
import Nav from "./nav/nav";

export default function Content({ displaySpinner , onCardClick ,baseUrl,userMovies}) {
  
  return (
    <div
      className="app-content"
      style={{ display: displaySpinner ? "none" : "flex" }}
    >
      <Grid />
      <Movies onCardClick={onCardClick} baseUrl = {baseUrl} userMovies={userMovies}/>
    </div>
  );
}
