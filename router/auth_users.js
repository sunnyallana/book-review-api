const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

const authenticatedUser = (username,password)=>{ //returns boolean
  let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }
  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 });

    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});

// Add or modify a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const username = req.session.authorization.username;
  const isbn = req.params.isbn;
  const reviewText = req.query.review;

  if (!username || !isbn || !reviewText) {
    return res.status(400).json({ message: "Invalid request. Username, ISBN, and review text are required." });
  }
  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found for the provided ISBN" });
  }
  if (books[isbn].reviews && books[isbn].reviews[username]) {
    books[isbn].reviews[username] = reviewText;
  } else {
    if (!books[isbn].reviews) {
      books[isbn].reviews = {};
    }
    books[isbn].reviews[username] = reviewText;
  }
  return res.status(200).json({ message: "Review added/modified successfully." });
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const username = req.session.authorization.username;
  const isbn = req.params.isbn;
  if (!username || !isbn) {
    return res.status(400).json({ message: "Invalid request. Username and ISBN are required." });
  }
  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found for the provided ISBN" });
  }
if (books[isbn].reviews && books[isbn].reviews[username]) {
    delete books[isbn].reviews[username];
    return res.status(200).json({ message: "Review deleted successfully." });
  } else {
    return res.status(404).json({ message: "Review not found for the provided ISBN and user" });
  }
});

module.exports.authenticated = regd_users;
module.exports.doesExist = doesExist;
module.exports.users = users;
