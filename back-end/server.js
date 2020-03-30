const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');

// Route imports
const AuthController = require('./controllers/AuthController');
const AdminController = require('./controllers/AdminController');
const UserController = require('./controllers/UserController');

const db = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'chirag',
        password: 'root123',
        database: 'library-mgmt'
    }
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Routes
/**
 * Authentication routes
 */
app.post('/api/auth/register', AuthController.handleRegister(db, bcrypt));
app.post('/api/auth/sign-in', AuthController.handleSignIn(db, bcrypt));

/**
 * Admin Routes
 */
app.post('/api/admin/add_book', AdminController.handleBookAdd(db));
app.put('/api/admin/update_book', AdminController.handleBookUpdate(db));
app.delete('/api/admin/remove_book/:id', AdminController.handleRemoveBook(db));
app.get('/api/admin/all_books', AdminController.handleAllBookList(db));
app.post('/api/admin/add_user', AdminController.handleAddUser(db, bcrypt));
app.delete('/api/admin/remove_user', AdminController.handleRemoveUser(db));
app.get('/api/admin/all_users', AdminController.handleAllUsers(db));
app.get('/api/admin/search/:searchStr', AdminController.handleBookSearch(db));
app.get('/api/admin/search-user/:searchStr', AdminController.handleUserSearch(db));

/**
 * User Routes
 */
app.get('/api/user/', UserController.handleAllBookList(db));
app.get('/api/user/search/:searchStr', UserController.handleBookSearch(db));
app.post('/api/user/borrow-book', UserController.handleBookBorrow(db));
app.post('/api/user/return-book', UserController.handleReturnBook(db));
app.post('/api/user/get-books', UserController.handleUserBooks(db));

app.listen(process.env.PORT || 8000, err => {
    if (!err) console.log(`Server started on port ${process.env.PORT || 8000}`);
    else
        console.log(
            "Server couldn't be connected due to ",
            JSON.stringify(err, undefined, 2)
        );

});
