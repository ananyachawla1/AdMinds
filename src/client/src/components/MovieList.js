import React, { useState } from 'react';

const MovieList = (props) => {
  const FavouriteComponent = props.favouriteComponent;
  // const [uniqueTitles, setUniqueTitles] = useState(new Set());

  const handleFavouritesClick = (movie) => {
    props.handleFavouritesClick(movie);
  };

  const handleMovieClick = (movie) => {
    props.handleMovieClick(movie);
  };
  
  return (
    <div className='d-flex flex-wrap justify-content-start' style={{ display: 'flex', flexDirection: 'row' }}>
      {props.movies.map((movie, index) => (
        // Only render the movie if its title is not in the set of unique titles
        // !uniqueTitles.has(movie.programInfo.programTitle) && (
          <div className='image-container m-3' key={index} style={{ flex: '0 0 15%', width: '100px', padding:20 }} onClick={() => handleMovieClick(movie)}>
            {(movie.programInfo && movie.programInfo.images && movie.programInfo.images.length > 0) && (
              <img
                src={movie.programInfo.images[0].url}
                alt='movie'
                height='200'
                width='150'
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            )}
            {(!movie.programInfo || !movie.programInfo.images || movie.programInfo.images.length === 0) && (
              <img
                src="https://imgs.search.brave.com/bTQyZH99S8mTAIff7nLrbZktAnBvaH3n0o6M0s0kEr4/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZmFuZGFuZ28u/Y29tL2ltYWdlcy9m/YW5kYW5nb2Jsb2cv/TW9vbmZhbGxfUGF5/b2ZmX1ZlcnRpY2Fs/X0tleUFydF8yMDFf/RklOMDhfU0xGX2Jy/aWdodF9GSU5fc20u/anBn" // Placeholder image URL
                alt='placeholder'
                height='200'
                width='150'
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            )}
            <div
              onClick={() => handleFavouritesClick(movie)}
              className='overlay d-flex align-items-center justify-content-center'
            >
              {FavouriteComponent && <FavouriteComponent />}
            </div>
            <div style={{marginTop:20}}>{movie.programInfo && movie.programInfo.programTitle}</div>
          </div>
        // )
      ))}
    </div>
  );
};

export default MovieList;
