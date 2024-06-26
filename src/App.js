import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import'./App.css'
import SearchIcon from './search.svg'

// OMDb api key 64ee2ca

const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}`

const movie1 = {
    "Title": "Labyrinth",
    "Year": "1986",
    "imdbID": "tt0091369",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjM2MDE4OTQwOV5BMl5BanBnXkFtZTgwNjgxMTg2NzE@._V1_SX300.jpg"
}


const App = () => {

    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json()

        console.log(data.Search)
        setMovies(data.Search)
    }
    useEffect(() => {
        searchMovies(searchTerm)
    }, [])

    return(
        <div className = "app">
            <h1>MovieLand</h1>
            <div className="search">
                <input 
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            searchMovies(searchTerm)
                        }
                    }}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick = {() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0 ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }
        </div>
    )
}

export default App