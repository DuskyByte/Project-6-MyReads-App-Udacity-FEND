import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { getAll, update } from './BooksAPI'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
import './App.css'

class BooksApp extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    getAll().then((books) => {
      books.forEach((book) => {
        if (book.shelf === 'currentlyReading') {
          this.setState(state => ({
            currentlyReading: state.currentlyReading.concat([ book ])
          }))
        }
        if (book.shelf === 'wantToRead') {
          this.setState(state => ({
            wantToRead: state.wantToRead.concat([ book ])
          }))
        }
        if (book.shelf === 'read') {
          this.setState(state => ({
            read: state.read.concat([ book ])
          }))
        }
      })
    })
  }

  updateShelf(book, shelf) {
    update(book, shelf)
    if (book.shelf === 'currentlyReading') {
      this.setState(state => ({
        currentlyReading: state.currentlyReading.filter(test => test !== book)
      }))
    }
    if (book.shelf === 'wantToRead') {
      this.setState(state => ({
        wantToRead: state.wantToRead.filter(test => test !== book)
      }))
    }
    if (book.shelf === 'read') {
      this.setState(state => ({
        read: state.read.filter(test => test !== book)
      }))
    }
    book.shelf = shelf
    if (book.shelf === 'currentlyReading') {
      this.setState(state => ({
        currentlyReading: state.currentlyReading.concat([ book ])
      }))
    }
    if (book.shelf === 'wantToRead') {
      this.setState(state => ({
        wantToRead: state.wantToRead.concat([ book ])
      }))
    }
    if (book.shelf === 'read') {
      this.setState(state => ({
        read: state.read.concat([ book ])
      }))
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookShelf 
            currentlyReading={this.state.currentlyReading}
            wantToRead={this.state.wantToRead}
            read={this.state.read}
            changeShelf={(book, shelf) => {
              this.updateShelf(book, shelf)
            }}
          />
        )}/>
        <Route path="/search" render={() => (
          <BookSearch 
            onShelf={[].concat(this.state.currentlyReading, this.state.wantToRead, this.state.read)}
            changeShelf={(book, shelf) => {
              this.updateShelf(book, shelf)
            }}
          />
        )}/>
      </div>  
    )
  }
}

export default BooksApp