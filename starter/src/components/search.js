import React, { useState, useEffect } from 'react';
import * as BooksAPI from '../BooksAPI';
import { Link } from 'react-router-dom';

import Book from './createBook';


function SearchComponent ({onShelfChange, books}) {
    const [searchBooks, setSearchBooks] = useState([]);
    const [query, setQuery] = useState(''); 

    useEffect(() => {
      let isMounted = true; // add this line

      if (query) {
        BooksAPI.search(query, 20)
          .then(searchedBooks => {
            if (isMounted) { // add this line
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
            }
          });
      } else {
        setSearchBooks([books]); // Set searchBooks to current books state when query is empty
      }

      return () => { isMounted = false; } // add this line
    }, [query, books]);

    const onSearchShelfChange = (book, newShelf) => {
        // Update searchBooks state
        const updatedBook = {...book, shelf: newShelf};
        const updatedSearchedBooks = searchBooks.map(b => b.id === book.id ? updatedBook : b);
        setSearchBooks(updatedSearchedBooks);
    
        // Call App's onShelfChange function to update books state
        onShelfChange(book, newShelf);
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
        <div className="search-books">
          <div className="search-books-bar">
            <Link
              to="/"
              className="close-search"
              // onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </Link>
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
                <Book book={book} onShelfChange={onSearchShelfChange}/>
              </li>
            ))}
          </ol>
          </div>
        </div>
    )

}

export default SearchComponent; 