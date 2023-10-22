import React from 'react';
import ContentRowMovies from './ContentRowMovies';
import LastMovieInDb from './LastMovieInDb';
import GenresInDb from './GenresInDb';

const ContentRowTop = ({ movies, lastMovie, genres }) => {
  return (
    <div className="content-row-top">
      <ContentRowMovies movies={movies} />
      <LastMovieInDb movie={lastMovie} />
      <GenresInDb genres={genres} />
    </div>
  );
};

export default ContentRowTop;