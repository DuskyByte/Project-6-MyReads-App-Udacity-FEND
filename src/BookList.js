import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import * as BooksAPI from './BooksAPI'
import BookCover from './BookCover'
import './App.css'

class BookList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  render() {
    return (
      <ol className="books-grid">
        {this.props.books.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <BookCover
                  coverLinks={book.imageLinks}
                />
                <div className="book-shelf-changer">
                  <select defaultValue={book.shelf || 'none'}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">{book.shelf === 'currentlyReading' && '✔ '}Currently Reading</option>
                    <option value="wantToRead">{book.shelf === 'wantToRead' && '✔ '}Want to Read</option>
                    <option value="read">{book.shelf === 'read' && '✔ '}Read</option>
                    <option value="none">{book.shelf === undefined && '✔ '}None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{(book.authors) ? book.authors[0] : book.authors}</div>
            </div>
          </li>
        ))}
      </ol>
    )
  }
}

export default BookList