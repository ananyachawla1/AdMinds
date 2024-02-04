import React, { useState, useEffect } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";
import MovieDetails from "./components/MovieDetails";

const App = () => {
  const [RecommendedMovies, setRecommendedMovies] = useState([]);
  const [ActionMovies, setActionMovies] = useState([]);
  const [ThrillerMovies, setThrillerMovies] = useState([]);
  const [ComedyMovies, setComedyMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const getMovieRequest = async (genre) => {
    const url = `https://cla-epg.lgads.tv/epg/listings?genre=${genre}&showType=movie`;
// console.log(url);
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer QZYzxZ1sc",
      },
    });

    const responseJson = await response.json();
    return responseJson.result || [];
  };
  const getMovieRequestepg=async()=>{
    const urlepg = `http://localhost:3001/epg/recommendation?deviceId=02135de2ef0a1a96f0f237dcb0c2af8c&date=2024-01-01`;
    const responseepg = await fetch(urlepg, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer QZYzxZ1sc",
      },
    });

    const responseepgJson = await responseepg.json();
    return responseepgJson.result || [];
  }

  useEffect(() => {
    getMovieRequestepg().then((movies) =>
      setRecommendedMovies(movies)
    );
    getMovieRequest("Action").then((movies) => setActionMovies(movies));
    getMovieRequest("Thriller").then((movies) => setThrillerMovies(movies));
    getMovieRequest("Comedy").then((movies) => setComedyMovies(movies));
  }, []);
console.log(RecommendedMovies);
console.log(ActionMovies);
  useEffect(() => {
    const movieFavourites =
      JSON.parse(localStorage.getItem("react-movie-app-favourites")) || [];
    setFavourites(movieFavourites);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const filterMoviesByQuery = (movies) => {
    return movies.filter((movie) =>
      movie.programInfo.programTitle
        .toLowerCase()
        .startsWith(searchValue.toLowerCase())
    );
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleGoBack = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="AdMinds" />
        <SearchBox value={searchValue} onChange={setSearchValue} />
      </div>
      <div className="row">
        {selectedMovie && (
          <MovieDetails movie={selectedMovie} onGoBack={handleGoBack} />
        )}
        <h2 style={{paddingLeft:20}}>Recommended Movies</h2>
        <MovieList
          movies={filterMoviesByQuery(RecommendedMovies)}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
          handleMovieClick={handleMovieClick}
        />
        <br/>
        <br/>
        <h2 style={{paddingLeft:20}}>Action Movies</h2>
        <MovieList
          movies={filterMoviesByQuery(ActionMovies)}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
          handleMovieClick={handleMovieClick}
        />
        <br />
        <h2 style={{paddingLeft:20}}>Thriller Movies</h2>
        <MovieList
          movies={filterMoviesByQuery(ThrillerMovies)}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
          handleMovieClick={handleMovieClick}
        />
        <br />
        <h2 style={{paddingLeft:20}}>Comedy Movies</h2>
        <MovieList
          movies={filterMoviesByQuery(ComedyMovies)}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
          handleMovieClick={handleMovieClick}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favourites" />
      </div>
      <div className="row">
        <MovieList
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites}
          handleMovieClick={handleMovieClick}
        />
      </div>
      {/* <MovieDetails movie={selectedMovie} /> */}
    </div>
  );
};

export default App;
