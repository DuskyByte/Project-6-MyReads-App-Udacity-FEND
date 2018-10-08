import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
import { getAll } from './BooksAPI'
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

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookShelf 
            books={this.state.books}
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
