import "./App.css";
import * as BooksAPI from "./BooksAPI";
import { useEffect, useState } from "react";

//bookshelves 
import Bookshelf from "./bookshelves/bookshelf";
import Book from "./bookCreation/createBook";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]);
  const [searchBooks, setSearchBooks] = useState([]);
  const [query, setQuery] = useState(''); 


// Fetch all books when the component mounts
useEffect(() => {
  BooksAPI.getAll()
    .then(bookID => {
      setBooks(bookID);
    }); 
}, [showSearchPage]);

// Perform a search whenever the query changes
useEffect(() => {
  if (query) {
    BooksAPI.search(query, 20)
      .then(searchedBooks => {
        if (searchedBooks.error) {
          setSearchBooks([]);
        } else {
          const mergeSearchBooks = searchedBooks.map(searchedBook => {
            const findBook = books.find(book => book.id === searchedBook.id);
            return {
              ...searchedBook, 
              shelf: findBook ? findBook.shelf : 'none' 
            }
          })

          setSearchBooks(mergeSearchBooks);
        }
      });
  } else {
    setSearchBooks([books]); // Set searchBooks to current books state when query is empty
  }
}, [query, books]); //seperate useEffects to avoid unnecessary API calls

const onShelfChange = (book, newShelf) => {
  BooksAPI.update(book, newShelf)
  .then(() => {
      // book.shelf = newShelf;
      const updatedBook = {...book, shelf: newShelf};

    //update current book state on main page
    const updatedBooks = books.map(b => b.id === book.id ? updatedBook : b);
    setBooks(updatedBooks);

    //update search book state on search page
    const updatedSearchedBooks = searchBooks.map(b => b.id === book.id ? updatedBook : b);
    setSearchBooks(updatedSearchedBooks);

  });
}

const handleChange = (e) => {
  setQuery(e.target.value);
}

const search = query.trim().toLowerCase(); 
let filteredBooks = searchBooks; 
if (search.length > 0) {
  filteredBooks = searchBooks.filter(book => {
    return (
      (book.title && book.title.toLowerCase().includes(search)) || 
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
                <Book book={book} onShelfChange={onShelfChange}/>
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
