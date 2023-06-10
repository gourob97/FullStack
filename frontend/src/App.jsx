import axios from "axios"
import { useEffect, useState } from "react"

const deleteButtonStyle = {
  padding: '5px 10px',
  background: '#ff0000',
  color: 'white',
  border: 'none',
  borderRadius: '30px',
  cursor: 'pointer',
  fontSize: '12px',
  margin: '20px'
}
const addButtonStyle = {
  padding: '5px 10px',
  background: '#1c5c21',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '12px',
  margin: '20px'
}
const itemStyle = {
  padding: '10px',
  fontSize: '20px',
}

const inputStyle = {
  
}

function App() {
  const [movies, setMovies] = useState([])
  const [movieName, setMovieName] = useState("")


  const fetchAllMovies = async () => {
    console.log("Fetching all movies")
    const response = await axios.get("http://localhost:5000/api/movies")
    setMovies(response.data)
  }

  const addMovie = async (movieName) => {
    await axios.post("http://localhost:5000/api/movies", { movieName: movieName })
    setMovieName("")
    fetchAllMovies()
  }

  const deleteMovie = async (movieId) => {
    await axios.delete(`http://localhost:5000/api/movies/${movieId}`
      ,)
    fetchAllMovies()
  }

  useEffect(() => {
    console.log("called from useEffect")
    fetchAllMovies()
  }, [])

  return (
    <div>

      <div style={inputStyle}>
        <label htmlFor="taskInput">Movie Name: </label>
        <input
          type="text"
          id="taskInput"
          autoComplete="off"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
        
        <button onClick={() => addMovie(movieName)} style={addButtonStyle}>
          Add
        </button>
      </div>



      <h1>Movie List</h1>
      <ul>
        {
          movies.map(movie => (
            <li key={movie.id} style={itemStyle}>
              {movie.name}
              <button onClick={() => { deleteMovie(movie.id) }} style={{ ...deleteButtonStyle, fontWeight: 'mediums' }}> Delete </button>
            </li>
          ))
        }
      </ul>
    </div>

  )
}

export default App
