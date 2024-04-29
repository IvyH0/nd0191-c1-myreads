import "./App.css";
import * as BooksAPI from "./BooksAPI";
import { useEffect, useState } from "react";

//bookshelves 
import Bookshelf from "./bookshelves/bookshelf";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]); 

  useEffect(() => {
    BooksAPI.getAll()
      .then(books => {
        setBooks(books);
        console.log('All books:', books);
      });

    BooksAPI.get('bookId')
      .then(book => {
        console.log('Single book:', book);
      });
  }, []);

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Bookshelf books={books} shelf='currentlyReading' title='Currently Reading' />
              <Bookshelf books={books} shelf='wantToRead' title='Want to Read' />
              <Bookshelf books={books} shelf='read' title='Read' />
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
