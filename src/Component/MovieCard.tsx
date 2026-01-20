import '../index.css'

const MovieCard = ({movie: {title, poster_path, release_date, vote_average, original_language }}) => {
  return (
    <div className="movie-card">
      <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : './no-movie.png'} alt="Movie Picture" />
      <div className="mt-4">
        <h3>{title}</h3>
        <div className="content">
          <div className="rating">
            <img src="../star.svg" alt="Start" />
            <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
          </div>
          <span>►</span>
          <p className='lang'>{original_language}</p>
          <span>►</span>
          <p className='lang'>{release_date.split('-')[0]}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
