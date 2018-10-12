import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { search } from './BooksAPI'

class BookSearch extends Component {
  state = {
    query: '',
    foundBooks: []
  }

  //Search BooksAPI for books
  searchForBooks = (query) => {
    this.setState({ query: query })
    if (query) {
      search(query).then(
        result => (result.error) ? this.setState(state => ({ foundBooks: [] })) : this.setState(state => ({ foundBooks: result }))
      )
    } else {
      this.setState(state => ({ foundBooks: [] }))
    }
  }

  //Clears book from search results if added to a shelf
  removeBook = (book) => {
    this.setState((state) => ({
      foundBooks: state.foundBooks.filter((b) => b.id !== book.id)
    }))
  }

  render() {
    const { query, foundBooks } = this.state
    const { books, onShelfChange } = this.props

    return (
	    <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author" 
              value={query}
              onChange={(event) => this.searchForBooks(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {foundBooks.filter(book => books.every(searchedBook => searchedBook.id !== book.id)).map((book) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + book.imageLinks.thumbnail + ')' }}></div>
                  <div className="book-shelf-changer">
                    <select defaultValue="none" onChange={(event) => {
                        onShelfChange(book, event.target.value)
                        this.removeBook(book)
                      }}>
                      <option value="move" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">✔None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{(book.authors) ? book.authors[0] : book.authors}</div>
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
		)
  }
}

export default BookSearch