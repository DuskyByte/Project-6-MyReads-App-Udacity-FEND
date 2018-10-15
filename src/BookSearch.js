import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import BookList from './BookList'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BookSearch extends Component {
  static propTypes = {
    onShelf: PropTypes.array.isRequired
  }

  state = {
    query: '',
    searchResults: []
  }

  bookSearch = (query) => {
    this.setState({ query: query })
    if (query) {
      BooksAPI.search(query).then(
        results => (results.error) ? (
          this.setState(state => ({ searchResults: [] }))
        ) : (
          results.sort(sortBy('title')),
          //Maps over the results Array and returns the most current copy of a book if it is in the onShelf Array otherwise returns it's own book
          this.setState(state => ({ searchResults: results.map(book => this.props.onShelf.find(testBook => testBook.id === book.id) || book) }))
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
          changeShelf={(book, shelf) => {
            this.props.changeShelf(book, shelf)
          }}
        />
        </div>
      </div>
    )
  }
}

export default BookSearch