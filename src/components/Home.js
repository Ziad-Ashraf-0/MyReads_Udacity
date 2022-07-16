import React from "react";
import { Link } from "react-router-dom";
import Shelf from "./Shelf";

function Home({
  currentlyReadingShelf,
  readShelf,
  wantToReadShelf,
  changeShelf,
}) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <Shelf
          category="Want to read"
          books={wantToReadShelf}
          changeShelf={changeShelf}
        />
        <Shelf
          category="Currently Reading"
          books={currentlyReadingShelf}
          changeShelf={changeShelf}
        />
        <Shelf category="Read" books={readShelf} changeShelf={changeShelf} />
      </div>
      <div className="open-search">
        <Link to="search">Add a book</Link>
      </div>
    </div>
  );
}

export default Home;
