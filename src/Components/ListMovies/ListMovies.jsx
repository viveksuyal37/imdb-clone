import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

import "./ListMovies.css";

const ListMovies = () => {
  const [loading, setloading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalpages] = useState();
  const [page, setPage] = useState(1);

  const params = useParams();
  const now_playing = "now_playing";
  let MoviesCategory;

  if (params.category === "upcoming") {
    MoviesCategory = "Upcoming Movies";
  } else if (params.category === "popular") {
    MoviesCategory = "Popular Movies";
  } else if (params.category === "top_rated") {
    MoviesCategory = "Top Rated Movies";
  } else {
    MoviesCategory = "Now Playing";
  }

  useEffect(() => {
    getMoviesByCategory();
  }, [params]);

  const getMoviesByCategory = async () => {
    const resp = await axios.get(`
    https://api.themoviedb.org/3/movie/${
      params.category ? params.category : now_playing
    }?api_key=395e7cfa60ed93858869b664e028c4fd&language=en-US&page=${page}`);

    setTotalpages(resp.data.total_pages);
    setMovies(resp.data.results);

    setTimeout(() => {
      setloading(false);
    }, 1500);
  };

  const fetchMoreData = async () => {
    setloading(true);
    setPage(page + 1);
    const resp = await axios.get(`
    https://api.themoviedb.org/3/movie/${
      params.category ? params.category : now_playing
    }?api_key=395e7cfa60ed93858869b664e028c4fd&language=en-US&page=${page}`);
    setPage(page + 1);
    setMovies(movies.concat(resp.data.results));
    setTimeout(() => {
      setloading(false);
    }, 1000);
  };

  return (
    <section>
      <h2 className="title">{MoviesCategory}</h2>
      <div className="ListMovies">
        <InfiniteScroll
          dataLength={movies.length} //This is important field to render the next data
          next={fetchMoreData}
          hasMore={page < totalPages + 1}
        >
          {movies &&
            movies.map((movie, index) => {
              return <MovieCard key={index} movie={movie} loading={loading} />;
            })}
        </InfiniteScroll>
      </div>
    </section>
  );
};

export default ListMovies;
