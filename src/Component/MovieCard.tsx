import { useState, type FC } from "react";
import "../index.css";

interface MovieProps {
  movie: {
    title: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
    original_language: string;
    overview: string;
  };
}

const MovieCard: FC<MovieProps> = ({
  movie: {
    title,
    poster_path,
    release_date,
    vote_average,
    original_language,
    overview,
  },
}) => {
  const [Like, setLike] = useState<boolean>(false);
  const [IsActive, setIsActive] = useState(false);

  return (
    <>
      <div
        className="movie-card"
        onClick={() => {
          setIsActive(true);
        }}
      >
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
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLike(!Like);
              }}
              className="text-white mr-2"
            >
              {!Like ? "🤍" : "💙"}
            </button>
          </div>
        </div>
      </div>

      {IsActive && (<div className="fixed flex items-center justify-center inset-0 bg-black/85 z-40" onClick={() => { setIsActive(false) }}>

        <div className="    
            w-[95%]
            sm:w-[90%]
            md:w-[80%]
            lg:max-w-4xl
            bg-gray-900
            max-h-[90vh]
            overflow-y-auto
            rounded-lg
            z-50" onClick={(e) => e.stopPropagation()}>
          <div className="relative">
            <button
              onClick={() => setIsActive(false)}
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
            >
              ✕
            </button>
            <img src={
                poster_path
                    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                    : "./no-movie.png"
                } 
                className="w-full max-h-[50vh] object-cover rounded-t-lg"
                alt="" 
            />

            {/* Movie details */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white        mb-2">
                {title}
              </h2>

              <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <img src="../star.svg" alt="Rating" className="w-4 h-4" />
                  <span>{vote_average.toFixed(1)}/10</span>
                </div>
                <div>📅 {release_date}</div>
                <div>🌐 {original_language.toUpperCase()}</div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Overview
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {overview || "No overview available"}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLike(!Like);
                }}
                className="w-full py-2 rounded-lg font-semibold transition-all duration-200 hover:scale-105 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {!Like ? "♡ Add to Favorites" : "♥ Remove from Favorites"}
              </button> 
            </div>
          </div>
        </div>

      </div>)}
    </>
  );
};

export default MovieCard;
