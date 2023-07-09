import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=7ffd8259";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    searchMovies("All")
  }, []);

  const searchEnterKey = (e) => {
    if (e.key === "Enter") {
      searchMovies(searchTerm);
    }
  };

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const result = await response.json();

    console.log(result);
    setData(result);
  };
  
  return (
    <div className="app">
      {/* <h1 onClick={()=>window.location.reload(true)}> MovieLand</h1> */}
       <h1><a href="http://localhost:3001">MovieLand</a></h1>

      <div className="search">
        <input
          placeholder="Trending"
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={searchEnterKey}
        />
        <img
          src={SearchIcon}
          alt="search icon"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {data.Response === "True" ? (
        <div className="container">
          {data.Search.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
