import React from 'react';

const MovieDetails = ({ movie, onGoBack }) => {
  if (!movie) {
    return null;
  }

  return (
    <div style={{paddingLeft:20}}>
      <h2>{movie.ott_recommendations.contents.title}</h2>
      {/* <p>Genre: {movie.programInfo.genre}</p>
      <p>Description: {movie.programInfo.longDescription}</p>
      <p>Show Type: {movie.programInfo.showType}</p>
      <p>Start Time: {movie.startTime}</p> */}
      {/* <p>Release Date: {movie.programInfo.releaseDate}</p> */}
      {/* Add more details here based on your movie structure */}
      <button type='btn-primary' onClick={onGoBack}>Go Back</button>
    </div>
  );
};

export default MovieDetails;
