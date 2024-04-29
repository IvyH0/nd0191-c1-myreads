import React from 'react'; 

import Book from '../bookCreation/createBook';

const Bookshelf = ({books, shelf, title}) => {
    const filteredBooks = books.filter(book => book.shelf === shelf);
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                {filteredBooks.map(book => (
                    <li key={book.id}>
                        <Book book={book} />
                    </li>
                ))}
                </ol>
            </div>
        </div>
    )
}

export default Bookshelf;