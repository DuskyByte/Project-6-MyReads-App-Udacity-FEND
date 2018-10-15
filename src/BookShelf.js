import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookList from './BookList'
import './App.css'

//Should be self-explanatory

class BookShelf extends Component {
  static propTypes = {
    currentlyReading: PropTypes.array.isRequired,
    wantToRead: PropTypes.array.isRequired,
    read: PropTypes.array.isRequired
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <BookList
                  books={this.props.currentlyReading}
                  changeShelf={(book, shelf) => {
                    this.props.changeShelf(book, shelf)
                  }}
                />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <BookList
                  books={this.props.wantToRead}
                  changeShelf={(book, shelf) => {
                    this.props.changeShelf(book, shelf)
                  }}
                />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <BookList
                  books={this.props.read}
                  changeShelf={(book, shelf) => {
                    this.props.changeShelf(book, shelf)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link
            to="/search"
          >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BookShelf