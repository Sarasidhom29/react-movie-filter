import { useState, useEffect } from "react";
import  films  from "./data/films"; // importi l’array qui

function App() {
  // Stato per la lista dei film iniziale
  const [movieList, setMovieList] = useState(films); // usi l’array importato

  const [selectedGenre, setSelectedGenre] = useState("");
  const [filteredMovies, setFilteredMovies] = useState(movieList);

  const generiUnici = [...new Set(movieList.map((m) => m.genre))];

  useEffect(() => {
    const risultatoFiltrato = movieList.filter((m) => {
      if (selectedGenre === "") {
        return true;
      }
      return m.genre === selectedGenre;
    });
    setFilteredMovies(risultatoFiltrato);
  }, [selectedGenre, movieList]);

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;

    if (name === "selectedGenre") {
      setSelectedGenre(target.value);
    }
  };

  const [newTitle, setNewTitle] = useState("");
  const addMovie = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const nuovoFilm = {
      title: newTitle,
      genre: "Da definire",
    };
    setMovieList([...movieList, nuovoFilm]);
    setNewTitle("");
  };

  return (
    <>
      <form onSubmit={addMovie}>
        <h1>Aggiungi film</h1>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Titolo del film"
        />
        <button type="submit">Aggiungi film</button>
      </form>

      <form>
        <h1>Filter movies by genre</h1>
        <select
          value={selectedGenre}
          onChange={handleChange}
          name="selectedGenre"
        >
          <option value="">Tutti i generi</option>
          {generiUnici.map((genere, index) => (
            <option key={index} value={genere}>
              {genere}
            </option>
          ))}
        </select>
      </form>

      <ul>
        {filteredMovies.map((movie, index) => (
          <li key={index}>
            {movie.title} - {movie.genre}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;