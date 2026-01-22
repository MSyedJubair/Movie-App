import { useState, useEffect, useMemo } from 'react'
import Search from './Component/Search'
import MovieCard from './Component/MovieCard'
import Spinner from './Component/Spinner'
import { useDebounce } from 'react-use'
import { getTrendingMovies, UpdateSearchTerm } from './appwrite'
import { useCallback } from 'react'
import type { Movie, TrendingMovie } from './types'


const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY


interface TMDBResponse {
  results: Movie[]
}

function App() {
  const [SearchTerm, setSearchTerm] = useState<string>('')
  const [DebouncedSearch, setDebouncedSearch] = useState('')

  const [ErrorEstate, setError] = useState<boolean>(false)
  const [Loading, setLoading] = useState<boolean>(false)
  
  const [MovieList, setMovieList] = useState<Movie[]>([])
  const [TrendingMovies, setTrendingMovies] = useState<TrendingMovie[]>([])


  useDebounce(() => {setDebouncedSearch(SearchTerm)}, 500, [SearchTerm]
  )
  

  const OPTIONS = useMemo(() => (
    {
      method: 'GET', 
      headers: {
          accept: 'application/json', 
          Authorization: `Bearer ${API_KEY}`
      }
    }), [])

  const fetch_movies = useCallback(async (query:string=''): Promise<void> => {
    setLoading(true)
    try{
      const endpoint = !query ? `${BASE_URL}/discover/movie?sort_by=popularity.desc` : `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      const response = await fetch(endpoint, OPTIONS)

      if (!response.ok) {
        setError(true)
        throw new Error('Failed To fetch Movies')
      } 
      
      const movie_data:TMDBResponse = await response.json()
      setMovieList(movie_data.results)

      if (query && movie_data.results.length > 0) {
        await UpdateSearchTerm(query, movie_data.results[0])
      }
    } catch(error){
      console.log(error)
    } 
    setLoading(false)
  }, [OPTIONS])
  
  const LoadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies() as TrendingMovie[]

      setTrendingMovies(movies)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
      fetch_movies(DebouncedSearch)
    }, [DebouncedSearch, fetch_movies]
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
            setSearchTerm={setSearchTerm}
          />
        </header>

        {TrendingMovies.length > 0 && (
          <section className='trending'>
            <h2 className='mt-5'>Trending Movies</h2>
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
            <h2 className='mt-5'>Popular Movies</h2>
            
            {Loading ? (
              <Spinner/>
            ) : ErrorEstate ? (
              <p className='text-red-400'>Error Fetching The Movies</p>
            ) : (
              <ul>
                {MovieList
                .map((movie) => (
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
