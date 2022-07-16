import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";

function Search({
  handleQuery,
  query,
  booksFromSearch,
  changeShelf,
  booksFound,
}) {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            onChange={handleQuery}
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
          />
        </div>
      </div>

      <div className="search-books-results">
        <ol className="books-grid">
          {booksFound ? (
            booksFromSearch.map((book) => (
              <Book key={book.id} book={book} changeShelf={changeShelf} />
            ))
          ) : (
            <div>No Books</div>
          )}
        </ol>
      </div>
    </div>
  );
}

export default Search;
