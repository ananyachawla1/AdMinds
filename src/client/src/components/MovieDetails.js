import React from 'react';

const MovieDetails = ({ movie }) => {
  if (!movie) {
    return null;
  }

  return (
    <div>
      <h2>{movie.programInfo.programTitle}</h2>
      <p>Genre: {movie.programInfo.genre}</p>
      <p>Release Date: {movie.programInfo.releaseDate}</p>
      {/* Add more details here based on your movie structure */}
      <button onClick={() => window.history.back()}>Go Back</button>
    </div>
  );
};

export default MovieDetails;
