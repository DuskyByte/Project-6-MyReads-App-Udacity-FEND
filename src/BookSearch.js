import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import BookList from './BookList'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BookSearch extends Component {
  static propTypes = {
    currentlyReading: PropTypes.array.isRequired,
    wantToRead: PropTypes.array.isRequired,
    read: PropTypes.array.isRequired
  }

  state = {
    query: '',
    searchResults: []
  }

  bookSearch = (query) => {
    this.setState({ query: query })
    if (query) {
      BooksAPI.search(query).then(
        result => (result) ? (
          this.setState(state => ({ searchResults: result }))
        ) : (
          this.setState(state => ({ searchResults: [] }))
        )
      )
    } else {
      this.setState(state => ({ searchResults: [] }))
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className='close-search'
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.bookSearch(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
        <BookList
          books={this.state.searchResults}
        />
        </div>
      </div>
    )
  }
}

export default BookSearch