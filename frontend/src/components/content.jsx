import "./content.css";
import Grid from "./grid/grid";
import Movies from "./movies/movies";

export default function Content({
  displayLogin,
  onCardClick,
  baseUrl,
  userMovies,
  setMovieDetails,
}) {
  return (
    <div
      className="app-content"
      style={{ display: displayLogin ? "none" : "flex" }}
    >
      <Grid setMovieDetails={setMovieDetails} userMovies={userMovies} />
      <Movies
        onCardClick={onCardClick}
        baseUrl={baseUrl}
        userMovies={userMovies}
      />
    </div>
  );
}
