# Book Review API

The Book Review API is a web service built using Node.js and Express.js that facilitates the management of book reviews. Registered users can add, modify, and delete book reviews, while also accessing information about books based on ISBN, author, and title. The API incorporates JSON Web Tokens (JWT) for user authentication and session management.

**Author: Sunny Allana**  
**GitHub: [Sunny Allana](https://github.com/sunnyallana/)** <br/>
**LinkedIn: [Sunny Allana](https://www.linkedin.com/in/sunnyallana/)** <br/>
**Instagram: [Sunny Allana](https://www.instagram.com/imsunnyallana/)**

## Features

- User registration and login
- Adding/modifying book reviews for registered users
- Listing books based on ISBN, author, and title
- Retrieving book reviews

## Technologies Used

- Node.js
- Express.js
- JWT for authentication
- Session management
- JSON for data storage

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/book-review-system.git
   cd book-review-system
   ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the application:
    ```bash
    node index.js
    ```
The application will be available at http://localhost:5000.

## API Endpoints
1. Register a User:
    ```bash
    POST /register
    ```
Register a new user by providing a username and password.

2. Login:
    ```bash
    POST /login
    ```

 Authenticate a user and obtain a JWT token for subsequent requests.

3. Add/Modify Book Review:
    ```bash
    PUT /auth/review/:isbn
    ```

 Add or modify a book review for the provided ISBN.

4. Delete Book Review:
    ```bash
    DELETE /auth/review/:isbn
    ```

Delete a book review based on the ISBN.

5. List Books:
    ```bash
    GET /
    ```
Get the list of all available books.

6. Get Book Details:
    ```bash
    GET /isbn/:isbn
    ```

Get details for a specific book based on the ISBN.

7. Get Books by Author:
    ```bash
    GET /author/:author
    ```

Get a list of books by a specific author.

8. Get Books by Title:
    ```bash
    GET /title/:title
    ```
    
Get a list of books with a specific title.

9. Get Book Reviews:
    ```bash
    GET /review/:isbn
    ```
    
Get reviews for a specific book based on the ISBN.

License
This project is licensed under the MIT License.

Acknowledgments
Special thanks to the Node.js and Express.js communities for providing powerful tools for building web applications.
