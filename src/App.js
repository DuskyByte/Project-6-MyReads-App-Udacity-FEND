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
    update(book, shelf) //Updates book in BooksAPI

    //Updates APP's local state
    console.log(book)
    const index = this.state.books.findIndex(index => index === book)
    book.shelf = shelf
    const updatedBooks = [...this.state.books]
    updatedBooks[index] = book
    this.setState({ updatedBooks })
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
        <Route path="/search" render={() => (
          <BookSearch
            books={this.state.books}
            onShelfChange={(book, shelf) => {
              this.shelfChange(book, shelf)
            }}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
