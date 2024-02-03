// src/components/Movies.js
import React, { useEffect, useState } from 'react';

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Replace 'YOUR_EPG_API_URL' with the actual EPG API endpoint
    const epgApiUrl = 'https://cla-epg.lgads.tv/epg/listings?';

    // Fetch data from the EPG API
    fetch(epgApiUrl)
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error('Error fetching movies:', error));
  }, []);

  return (
    <div>
      <h2>Movies</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
