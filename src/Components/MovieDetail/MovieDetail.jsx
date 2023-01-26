import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetail.css";
import axios from "axios";

const MovieDetail = () => {
  const [Movie, setMovie] = useState(null);
  const params = useParams();

  useEffect(() => {
    getMovie();
  }, [params]);

  const getMovie = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${params.id}?api_key=395e7cfa60ed93858869b664e028c4fd&language=en-US`
    );
    setMovie(res.data);
  };

  return (
    <div className="movie">
      {Movie && (
        <>
          <div className="movie-intro">
            <img
              className="movie-backdrop"
              src={`https://image.tmdb.org/t/p/original${
                Movie ? Movie.backdrop_path : ""
              }`}
            />
          </div>
          <div className="movie-detail">
            <div className="movie-detailLeft">
              <div className="movie-posterBox">
                <img
                  className="movie-poster"
                  src={`https://image.tmdb.org/t/p/original${
                    Movie ? Movie.poster_path : ""
                  }`}
                />
              </div>
            </div>
            <div className="movie-detailRight">
              <div className="movie-detailRightTop">
                <div className="movie-name">{Movie.title}</div>
                <div className="movie-tagline">
                  {Movie.tagline ? Movie.tagline : ""}
                </div>
                <div className="movie-rating">
                  {Movie ? Movie.vote_average : ""}{" "}
                  <i className="fas fa-star" />
                  <span className="movie-voteCount">
                    {"(" + Movie.vote_count + ") votes"}
                  </span>
                </div>
                <div className="movie-runtime">
                  {Movie.runtime ? Movie.runtime + " mins" : ""}
                </div>
                <div className="movie-releaseDate">
                  {Movie.release_date
                    ? "Release date: " + Movie.release_date
                    : ""}
                </div>
                <div className="movie-genres">
                  {Movie && Movie.genres
                    ? Movie.genres.map((genre, index) => (
                        <div key={index}>
                          <span className="movie-genre">{genre.name}</span>
                        </div>
                      ))
                    : ""}
                </div>
              </div>
              <div className="movie-detailRightBottom">
                <div className="overviewText">Overview</div>
                <div>{Movie ? Movie.overview : ""}</div>
              </div>
            </div>
          </div>
          <div className="movie-links">
            <div className="movie-heading">Useful Links</div>
            {Movie && Movie.homepage && (
              <a
                href={Movie.homepage}
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <p>
                  <span className="movie-homeButton movie-Button">
                    Homepage <i className="newTab fas fa-external-link-alt"></i>
                  </span>
                </p>
              </a>
            )}
            {Movie && Movie.imdb_id && (
              <a
                href={"https://www.imdb.com/title/" + Movie.imdb_id}
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <p>
                  <span className="movie-imdbButton movie-Button">
                    IMDb<i className="newTab fas fa-external-link-alt"></i>
                  </span>
                </p>
              </a>
            )}
          </div>
          {Movie.production_companies && (
            <div className="movie-heading"><h3>Production companies:</h3></div>
          )}

          <div className="movie-production">
            {Movie &&
              Movie.production_companies &&
              Movie.production_companies.map((company, index) => (
                <div key={index}>
                  {company.logo_path && (
                    <span className="productionCompanyImage">
                      <img
                        className="movie-productionComapany"
                        src={
                          "https://image.tmdb.org/t/p/original" +
                          company.logo_path
                        }
                      />
                      <span>{company.name}</span>
                    </span>
                  )}
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
