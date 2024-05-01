import "./App.css";
import * as BooksAPI from "./BooksAPI";
import {Link, Routes, Route} from "react-router-dom";
import { useEffect, useState } from "react";

//bookshelves 
import Bookshelf from "./components/bookshelf";
import SearchComponent from "./components/search";

function App() {
  const [books, setBooks] = useState([]);

// Fetch all books when the component mounts
useEffect(() => {
  BooksAPI.getAll()
    .then(bookID => {
      setBooks(bookID);
    }); 
}, [books]);

const onShelfChange = (book, newShelf) => {
  BooksAPI.update(book, newShelf)
  .then(() => {
    const updatedBook = {...book, shelf: newShelf};
    //update current book state on main page
    const updatedBooks = books.map(b => b.id === book.id ? updatedBook : b);
    setBooks(updatedBooks);
  });
}


  return (
    <Routes>
      <Route
        path="/" element={
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
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        }
      >

      </Route>
      <Route 
        path="/search" element={
          <SearchComponent 
            onShelfChange={onShelfChange} 
            books={books} 
          />} 
      />
    </Routes>
  );
}

export default App;
