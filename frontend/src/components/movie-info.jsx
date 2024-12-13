import "./movie-info.css";

export default function MovieInfo({ displaySpinner, movieDetails }) {
  const actors = movieDetails.actors || [];
  const displayActors = actors.map((actor, index) => {
    return <span key={index}>{actor}</span>;
  });
  console.log(movieDetails.actors);
  return (
    <div className="info" style={{ display: displaySpinner ? "none" : "flex" }}>
      <img src={movieDetails.image} alt="" />

      <div className="details">
        <div className="img">
          <img src={movieDetails.image} alt="" />
        </div>
        <div className="movie-info">
          <h3>{movieDetails.name}</h3>
          <span className="actors">{displayActors}</span>
          <span className="year">{movieDetails.year}</span>
          <span className="plot">{movieDetails.plot}</span>
        </div>
      </div>
    </div>
  );
}
