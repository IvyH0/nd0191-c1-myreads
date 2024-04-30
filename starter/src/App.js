import "./App.css";
import * as BooksAPI from "./BooksAPI";
import { useEffect, useState } from "react";

//bookshelves 
import Bookshelf from "./bookshelves/bookshelf";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState(''); 


  useEffect(() => {
    BooksAPI.getAll()
      .then(bookID => {
        setBooks(bookID);
      }); 
    
    if (query) {
      BooksAPI.search(query, 20)
        .then(books => {
          console.log(books)
          if (books.error) {
            setBooks([]);
          } else {
            setBooks(books);
          }
        });
    }
  }, [query]);

  const onShelfChange = (book, newShelf) => {
    BooksAPI.update(book, newShelf)
    .then(() => {
        book.shelf = newShelf;
        const updatedBook = {...book, shelf: newShelf};
        const updatedBooks = books.map(b => b.id === book.id ? updatedBook : b);
        setBooks(updatedBooks);
    });
  }

  const handleChange = (e) => {
    setQuery(e.target.value);
  }
  
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
                value={query}
                onChange={handleChange}
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
              <Bookshelf books={books} shelf='currentlyReading' title='Currently Reading' onShelfChange={onShelfChange}/>
              <Bookshelf books={books} shelf='wantToRead' title='Want to Read' onShelfChange={onShelfChange}/>
              <Bookshelf books={books} shelf='read' title='Read' onShelfChange={onShelfChange}/>
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
