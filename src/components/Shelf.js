import React from "react";
import Book from "./Book";

function Shelf({ category, books, changeShelf }) {
  console.log(books);
  return (
    <div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">{category}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <Book key={book.id} book={book} changeShelf={changeShelf} />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Shelf;
