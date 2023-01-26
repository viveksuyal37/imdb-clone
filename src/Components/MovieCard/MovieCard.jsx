import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./MovieCard.css";

function MovieCard(props) {
  const { movie, loading } = props;

  return loading ? (
    <div className="movie-card">
      <SkeletonTheme color="#444544" highlightColor="#444">
        <Skeleton height={300} duration={2} />
      </SkeletonTheme>
    </div>
  ) : (
    <Link to={`/movie/${movie.id}`}>
      <div className="movie-card">
        <div className="card-img">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          />
        </div>
        <div className="card-overlay">
          {movie.adult ? (
            <h6 className="card-adult">18+</h6>
          ) : (
            <h6 className="card-adult">13+</h6>
          )}
          <h3 className="card-title">{movie.title}</h3>
          <p className="card-lang">{movie.original_language}</p>
          <span className="card-rating">
            {movie.vote_average} <i className="fa fa-star"></i>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
