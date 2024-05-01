import React from 'react'; 

import Book from './createBook';

const Bookshelf = ({books, shelf, title, onShelfChange}) => {

    const filteredBooks = books.filter(book => book.shelf === shelf);
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                {filteredBooks.map(book => (
                    <li key={book.id}>
                        <Book book={book} onShelfChange={onShelfChange}/>
                    </li>
                ))}
                </ol>
            </div>
        </div>
    )
}

export default Bookshelf;