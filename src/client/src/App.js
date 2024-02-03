import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
  const [ActionMovies, setActionMovies] = useState([]);
  const [ThrillerMovies, setThrillerMovies] = useState([]);
  const [ComedyMovies, setComedyMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async (genre) => {
    const url = `https://cla-epg.lgads.tv/epg/listings?genre=${genre}&showType=movie`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer QZYzxZ1sc'
      }
    });

    const responseJson = await response.json();
    return responseJson.result || [];
  };

  useEffect(() => {
    getMovieRequest("Action").then((movies) => setActionMovies(movies));
    getMovieRequest("Thriller").then((movies) => setThrillerMovies(movies));
    getMovieRequest("Comedy").then((movies) => setComedyMovies(movies));
  }, []);

  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem('react-movie-app-favourites')) || [];
    setFavourites(movieFavourites);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
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
      movie.programInfo.programTitle.toLowerCase().startsWith(searchValue.toLowerCase())
    );
  };

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies' />
        <SearchBox value={searchValue} onChange={setSearchValue} />
      </div>
      <div className='row'>
        <h2>Action Movies</h2>
        <MovieList
          movies={filterMoviesByQuery(ActionMovies)}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
        />
        <br />
        <h2>Thriller Movies</h2>
        <MovieList
          movies={filterMoviesByQuery(ThrillerMovies)}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
        />
        <br />
        <h2>Comedy Movies</h2>
        <MovieList
          movies={filterMoviesByQuery(ComedyMovies)}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favourites' />
      </div>
      <div className='row'>
        <MovieList
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
};

export default App;
