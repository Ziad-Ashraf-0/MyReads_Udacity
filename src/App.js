import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import { useState, useEffect, useRef } from "react";
import * as BooksAPI from "./BooksAPI";

function App() {
  const [query, setQuery] = useState("");
  const [wantToReadShelf, setWantToReadShelf] = useState([]);
  const [readShelf, setReadShelf] = useState([]);
  const [currentlyReadingShelf, setCurrentlyReadingShelf] = useState([]);
  const [booksFromSearch, setBooksFromSearch] = useState([]);
  const [booksFound, setBooksFound] = useState(false);

  const isMounted = useRef(false);

  useEffect(() => {
    const getBooks = async () => {
      const books = await BooksAPI.getAll();
      const currentlyReading = books.filter(
        (book) => book.shelf === "currentlyReading"
      );
      const wantToRead = books.filter((book) => book.shelf === "wantToRead");
      const read = books.filter((book) => book.shelf === "read");
      setCurrentlyReadingShelf(currentlyReading);
      setReadShelf(read);
      setWantToReadShelf(wantToRead);
    };
    getBooks();
  }, []);

  async function changeShelf(book, shelf) {
    await BooksAPI.update(book, shelf);
    await BooksAPI.getAll().then((books) => {
      setCurrentlyReadingShelf(
        books.filter((book) => book.shelf === "currentlyReading")
      );
      setReadShelf(books.filter((book) => book.shelf === "read"));
      setWantToReadShelf(books.filter((book) => book.shelf === "wantToRead"));
    });
  }

  function handleQuery(e) {
    setQuery(e.target.value);
  }
  useEffect(() => {
    if (isMounted.current) {
      if (query) {
        handleSearch(query);
        console.log(query);
      } else {
        setBooksFromSearch([]);
      }
    } else {
      isMounted.current = true;
    }
  }, [query]);

  async function handleSearch(query) {
    await BooksAPI.search(query).then((books) => {
      if (books && !books.error) {
        setBooksFromSearch(books);
        setBooksFound(true);
      } else {
        setBooksFound(false);
      }
    });
  }

  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              wantToReadShelf={wantToReadShelf}
              readShelf={readShelf}
              currentlyReadingShelf={currentlyReadingShelf}
              changeShelf={changeShelf}
            />
          }
        />
        <Route
          path="search"
          element={
            <Search
              handleQuery={handleQuery}
              query={query}
              booksFromSearch={booksFromSearch}
              changeShelf={changeShelf}
              booksFound={booksFound}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
