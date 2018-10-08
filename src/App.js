import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
import { getAll, update } from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    getAll().then((books) => {
      this.setState({ books })
    })
  }

  shelfChange(book, shelf) {
    update(book, shelf)
    getAll().then((books) => {
      console.log(book.title + ' changed shelves.')
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookShelf 
            books={this.state.books}
            onShelfChange={(book, shelf) => {
              this.shelfChange(book, shelf)
            }}
          />
        )}/>
        <Route exact path="/search" render={() => (
          <BookSearch />
        )}/>
      </div>
    )
  }
}

export default BooksApp
