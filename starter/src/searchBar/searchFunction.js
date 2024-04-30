import React from 'react'; 

const searchFunction = ({query, setQuery, setShowSearchpage, books}) => {

    const handleChange = (e) => {
        setQuery(e.target.value);
      }
      
      const search = query.trim().toLowerCase(); 
      let filteredBooks = books; 
      if (search.length > 0) {
        filteredBooks = books.filter(book => {
          return (
            book.title.toLowerCase().includes(search) || book.authors.join('').toLowerCase().includes(search)
          )
        })
      }

    return(
        <div className="search-books">
            <div className="search-books-bar">
                <button className="close-search" onClick={() => setShowSearchpage(false)}>
                    Close
                </button>
                <div className="search-books-input-wrapper">
                    <input 
                        type="text" 
                        placeholder="Search by title or author"
                        value={query}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="search-books-results">
            <ol className="books-grid"></ol>
                {query && filteredBooks.map(book => (
                <li key={book.id}>{book.title}</li>
                ))}
          </div>
        </div>
    )
}

export default searchFunction; 