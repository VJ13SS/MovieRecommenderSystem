import "./movie-info.css";

export default function MovieInfo({ displayLogin, movieDetails }) {
  return (
    <div className="info" style={{ display: displayLogin ? "none" : "flex" }}>
      <img src={movieDetails.Poster} alt="" />

      <div className="details">
        <div className="img">
          <img src={movieDetails.Poster} alt="" />
        </div>
        <div className="movie-info">
          <h3>{movieDetails.Title}</h3>
          <span className="actors">Actors : {movieDetails.Actors}</span>
          <span className="year">Year : {movieDetails.Year}</span>
          <span className="plot">Plot : {movieDetails.Plot}</span>
        </div>
      </div>
    </div>
  );
}
