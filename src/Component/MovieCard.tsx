import { useState, type FC } from "react";
import "../index.css";

interface MovieProps {
  movie: {
    title: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
    original_language: string;
  };
}

const MovieCard: FC<MovieProps> = ({
  movie: { title, poster_path, release_date, vote_average, original_language },
}) => {
  const [Like, setLike] = useState<boolean>(false)

  return (
    <div className="movie-card">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "./no-movie.png"
        }
        alt="Movie Picture"
        className="hover:scale-105 hover:opacity-80 transition-all duration-200 "
      />
      <div className="mt-4">
        <h3>{title}</h3>
        <div className="flex flex-row justify-between items-center">
          <div className="content">
            <div className="rating">
              <img src="../star.svg" alt="Start" />
              <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
            </div>
            <span>►</span>
            <p className="lang">{original_language}</p>
            <span>►</span>
            <p className="lang">{release_date.split("-")[0]}</p>
          </div>
          <button onClick={() => {
            setLike(!Like)
          }
          } className="text-white mr-2">{!Like ? '🤍' : '💙'}</button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
