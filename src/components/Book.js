import React from "react";

function Book({ book, changeShelf }) {
  console.log(book);

  const image = book.imageLinks ? book.imageLinks.thumbnail : "";
  const control = book.shelf ? book.shelf : "none";
  const updateShelf = (e) => {
    changeShelf(book, e.target.value);
  };
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 192,
              backgroundImage: `url(${image}.)`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select onChange={updateShelf} value={control}>
              <option value="none" disabled>
                Move to...
              </option>

              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors && book.authors.map((author) => <p>{author}</p>)}
        </div>
      </div>
    </li>
  );
}

export default Book;
