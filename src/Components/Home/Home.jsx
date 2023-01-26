import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import ListMovies from "../ListMovies/ListMovies";
import "./Home.css";

const Home = () => {
  const [moviesNowPlaying, setMoviesNowPlaying] = useState([]);

  useEffect(() => {
    getNowplaying();
  }, []);

  const getNowplaying = async () => {
    const resp = await axios.get(`
    https://api.themoviedb.org/3/movie/now_playing?api_key=395e7cfa60ed93858869b664e028c4fd&language=en&page=1`);

    const fixResult = resp.data.results;
    fixResult.splice(0, 10);
    setMoviesNowPlaying(fixResult);

  };

  return (
    <section className="carousel">
      <Carousel
      infiniteLoop={true}
      showThumbs={false}
      transitionTime={2}
      showStatus={false}
      autoPlay={true}
      stopOnHover={false}
      >
        {moviesNowPlaying &&
          moviesNowPlaying.map((movie, index) => {
            return (
              <Link key={index} to={`/movie/${movie.id}`}>
                <div className="carousel-item">
                  <div className="carousel-item-img">
                    <img
                      src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    />
                  </div>
                  <div className="carousel-item-overlay">
                    <h1>{movie.title}</h1>
                    <div className="ratings-and-reldate">
                      <h5> {`${movie.release_date}`}</h5>
                      <p>
                        Rating: {`${movie.vote_average}`} <i className="fa fa-star"></i> {`(${movie.vote_count})`}
                      </p>
                    </div>

                    <div className="description">
                  <p>{movie.overview}</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
      </Carousel>
      <ListMovies/>
    </section>
  );
};

export default Home;
