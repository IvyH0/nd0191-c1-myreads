import "./App.css";
import * as BooksAPI from "./BooksAPI";
import { useEffect, useState } from "react";

//bookshelves 
import Bookshelf from "./bookshelves/bookshelf";
import SearchFunction from "./searchBar/searchFunction";
import Book from "./bookCreation/createBook";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState(''); 


  useEffect(() => {
    BooksAPI.getAll()
      .then(bookID => {
        console.log(bookID)
        setBooks(bookID);
      }); 
    
    if (query) {
      BooksAPI.search(query, 20)
        .then(books => {
          console.log('searched books', books);
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
  
  const search = query.trim().toLowerCase(); 
  let filteredBooks = books; 
  if (search.length > 0) {
    filteredBooks = books.filter(book => {
      return (
        book.title.toLowerCase().includes(search) || 
        (book.authors && book.authors.join('').toLowerCase().includes(search))
      )
    })
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
          <ol className="books-grid">
            {query && filteredBooks.map(book => (
              <li key={book.id}>
                <Book book={book} />
              </li>
            ))}
          </ol>
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
