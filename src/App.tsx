import { useState, useEffect } from 'react'
import Search from './Component/Search'
import MovieCard from './Component/MovieCard'
import Spinner from './Component/Spinner'
import { useDebounce } from 'react-use'
import { getTrendingMovies, UpdateSearchTerm } from './appwrite'

const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

function App() {
  const [SearchTerm, setSearchTerm] = useState('')
  const [ErrorEstate, setError] = useState(false)
  const [Loading, setLoading] = useState(false)
  const [MovieList, setMovieList] = useState([])
  const [DebouncedSearch, setDebouncedSearch] = useState('')
  const [TrendingMovies, setTrendingMovies] = useState([])
  useDebounce(() => {setDebouncedSearch(SearchTerm)}, 500, [SearchTerm]
  )
  

  const OPTIONS = {
    method: 'GET', 
    headers: {
      accept: 'application/json', 
      Authorization: `Bearer ${API_KEY}`
    }
    
  };

  const fetch_movies = async (query='') => {
    setLoading(true)
    try{
      const endpoint = !query ? `${BASE_URL}/discover/movie?sort_by=popularity.desc` : `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      const response = await fetch(endpoint, OPTIONS)

      if (!response.ok) {
        setError(true)
        throw new Error('Failed To fetch Movies')
      } 
      
      const movie_data = await response.json()
      setMovieList(movie_data.results)

      if (query && movie_data.results.length > 0) {
        await UpdateSearchTerm(query, movie_data.results[0])
      }
    } catch(error){
      console.log(error)
    } 
    setLoading(false)
  }
  
  const LoadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies()

      setTrendingMovies(movies)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
      fetch_movies(DebouncedSearch)
    }, [DebouncedSearch]
  )

  useEffect(() => {
    LoadTrendingMovies() 
    }, []
  )
  

  return (
    <main>
      <div className='pattern'></div>
      <div className='wrapper'>

        <header>
          <img src="./hero.png" alt="" />
          <h1>Find <span className='text-gradient'>Movies</span> You'll love without the hassle</h1>
          <Search
            SearchTerm={SearchTerm}
            setSearchTerm={setSearchTerm}
          />
        </header>

        {TrendingMovies.length > 0 && (
          <section className='trending'>
            <h2 className='mt-[20px]'>Trending Movies</h2>
            <ul>
              {TrendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1 }</p>
                  <img src={movie.posterurl} alt="movie-poster" />
                </li>
              )
              )}
            </ul>
          </section>
        )}

        <section className='all-movies'>
            <h2 className='mt-[20px]'>All Movies</h2>
            
            {Loading ? (
              <Spinner/>
            ) : ErrorEstate ? (
              <p className='text-red-400'>Error Fetching The Movies</p>
            ) : (
              <ul>
                {MovieList.map((movie) => (
                  <li key={movie.id}>
                    <MovieCard movie={movie}/>
                  </li>         
                ))}
              </ul>
            )}
        </section>

      </div>
    </main>
  )
}

export default App
