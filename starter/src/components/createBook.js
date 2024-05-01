import React from 'react'; 

import BookShelfChanger from './book-shelf-changer';

const Book = ({book, onShelfChange}) => {
    return (
        <div className="book">
            <div className="book-top">
                <div
                className="book-cover"
                style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url("${book.imageLinks ? book.imageLinks.thumbnail : ''}")`
                }}
                ></div>
                <BookShelfChanger book={book} onShelfChange={onShelfChange}/>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors ? book.authors.join(', ') : 'No authors'}</div>
            
        </div>
    )
}

export default Book; 