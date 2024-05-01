import "./App.css";
import * as BooksAPI from "./BooksAPI";
import {Link, Routes, Route} from "react-router-dom";
import { useEffect, useState } from "react";

//bookshelves 
import Bookshelf from "./bookshelves/bookshelf";
import SearchComponent from "./searchComponent/search";
import Book from "./bookCreation/createBook";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]);


// Fetch all books when the component mounts
useEffect(() => {
  BooksAPI.getAll()
    .then(bookID => {
      setBooks(bookID);
    }); 
}, [showSearchPage]);

const onShelfChange = (book, newShelf) => {
  BooksAPI.update(book, newShelf)
  .then(() => {
      // book.shelf = newShelf;
      const updatedBook = {...book, shelf: newShelf};

    //update current book state on main page
    const updatedBooks = books.map(b => b.id === book.id ? updatedBook : b);
    setBooks(updatedBooks);
  });
}


  return (
    <div className="app">
      {showSearchPage ? (
        <SearchComponent 
          onShelfChange={onShelfChange} 
          books={books} 
          setShowSearchpage={setShowSearchpage} 
          showSearchPage={showSearchPage} 
        /> 
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
            <Link to="/search" onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
