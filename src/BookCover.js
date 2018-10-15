import React, { Component } from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BookCover extends Component {
	render() {
    return (
    	<div>
    		{/* Tests to make sure the book has a cover image, if not returns a div with no background */}
	    	{this.props.coverLinks ? (
	    		<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + this.props.coverLinks.thumbnail + '")' }}></div>
	    	) : (
	    		<div className="book-cover" style={{ width: 128, height: 193 }}></div>
	    	)}
    	</div>
    )
  }
}

export default BookCover