const express = require('express');
let books = require("./booksdb.js");
let doesExist = require("./auth_users.js").doesExist;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Register a user
public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books, null, 10));  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn]);
 });
  
 public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const booksByAuthor = [];
  if (typeof books !== 'object' || books === null) {
    return res.status(500).send({ error: 'Invalid books object' });
  }
  const bookKeys = Object.keys(books);
  bookKeys.forEach(key => {
    if (books[key].author === author) {
      booksByAuthor.push(books[key]);
    }
  });
  res.send(booksByAuthor);
});


// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  const booksByTitle = [];
  if (typeof books !== 'object' || books === null) {
    return res.status(500).send({ error: 'Invalid books object' });
  }
  const bookKeys = Object.keys(books);
  bookKeys.forEach(key => {
    if (books[key].title === title) {
      booksByTitle.push(books[key]);
    }
  });
  res.send(booksByTitle);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const concernedBookReviews = books[isbn].reviews;
  return res.send(concernedBookReviews);
});

module.exports.general = public_users;
