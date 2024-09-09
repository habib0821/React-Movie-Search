import React from 'react'
import { useState } from 'react'
import axios from 'axios';

const App = () => {
  const [searchTerm, setsearchTerm] = useState('')
  const [movies, setmovies] = useState([])
  const [loading, setloading] = useState(false)

  const fetchMovies = async () => {
    if (!searchTerm) return;
    setloading(true)
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${searchTerm}&apikey=d30aa60d`)
      setmovies(response.data.Search || []);
    }
    catch (error) {
      console.error('Something went wrong', error)
    }
    setloading(false)
  };

  const MovieCard = ({ movie }) => {
    return (
      <div className='rounded-lg flex flex-col justify-center items-center text-slate-300'>
        <img className='rounded-lg' src={movie.Poster} alt="movie.Title" />
        <p className='text-lg font-bold'>{movie.Title}</p>
        <p className='text-lg font-semibold'>Year: {movie.Year}</p>
        <p className='text-lg font-semibold'>IMDB ID: {movie.imdbID}</p>
      </div>
    )

  }



  return (
    <div className='flex flex-col bg-black h-auto'>
      <div className='flex flex-col w-full justify-center items-center gap-5 absolute left-1/2 top-[9rem] -translate-x-1/2 -translate-y-1/2 bg-slate-800 pb-5'>
        <h1 className='text-white font-bold'>Movies Search App</h1>
        <input className='w-[18rem] h-[3rem] rounded-lg text-3xl p-4 capitalize' type="text" value={searchTerm} onChange={(e) => {
          setsearchTerm(e.target.value)
        }} />
        <button className='bg-red-600 text-white text-xl font-bold' onClick={fetchMovies}>Search</button>

        {loading && <p className='text-3xl font-bold text-slate-400'>Loading...</p>}
        {!loading && movies.length === 0 && <p className='text-3xl font-bold text-slate-400'>No movie found</p>}


        <div className='absolute bg-black h-auto top-[18rem] flex flex-wrap p-5 gap-3'>
          {
            movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))
          }
        </div>


      </div>
    </div>
  )
}

export default App



















// import React, { useState } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchMovies = async () => {
//     if (!searchTerm) return;
//     setLoading(true);
//     try {
//       const response = await axios.get(`https://www.omdbapi.com/?s=${searchTerm}&apikey=d30aa60d`);
//       setMovies(response.data.Search || []);
//     } catch (error) {
//       console.error("Something went wrong:", error);
//     }
//     setLoading(false);
//   };

//   const MovieCard = ({ movie }) => {
//     return (
//       <div>
//         <img src={movie.Poster} alt={movie.Title} />
//         <h3>{movie.Title}</h3>
//         <p>Year: {movie.Year}</p>
//         <p>IMDB ID: {movie.imdbID}</p>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <h1>Movie Search App</h1>
//       <input
//         type="text"
//         placeholder="Search for a movie..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <button onClick={fetchMovies}>Search</button>

//       {loading && <p>Loading...</p>}
//       {!loading && movies.length === 0 && <p>No movie found</p>}

//       <div>
//         {movies.map((movie) => (
//           <MovieCard key={movie.imdbID} movie={movie} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;
