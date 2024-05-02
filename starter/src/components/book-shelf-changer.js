import React from 'react'; 

const bookShelfChanger = ({book, onShelfChange}) => {
    const shelves = [
        {value: 'currentlyReading', label: 'Currently Reading'},
        {value: 'wantToRead', label: 'Want to Read'},
        {value: 'read', label: 'Read'},
        {value: 'none', label: 'None'}
    ]
    return (
        <div className="book-shelf-changer">
            <select value={book.shelf} onChange={(e) => onShelfChange(book, e.target.value)}>
                <option value="none" disabled>
                    Move to...
                </option>
                {shelves.map(shelf => (
                    <option 
                        key={shelf.value} 
                        className={book.shelf === shelf.value ? "shelf-selected" : null}
                    >
                        {shelf.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default bookShelfChanger; 