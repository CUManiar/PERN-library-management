const handleBookAdd = (db) => (req, res) => {

    // db.transaction(trx => {
    //     trx.insert({
    //         book_name: req.body.name
    //     })
    // })

    db.select('*').from('booklist').where('book_name', '=', req.body.name).then(data => {
        if (data.length > 0) {
            res.json({
                status: 304,
                message: 'Book already available. Kindly update it rather adding again!'
            });
        } else {
            db.insert({
                book_name: req.body.name,
                author: req.body.author,
                pages: req.body.pages,
                publication: req.body.publication,
                book_count: req.body.bookCount
            })
                .into('booklist')
                .returning('*')
                .then(bookInfo => {
                    res.json({
                        status: 200,
                        message: 'Book added successfully',
                        data: bookInfo[0]
                    })
                })
                .catch(err => {
                    res.status(400).json({
                        status: 400,
                        message: 'Can not add book, Something went wrong',
                        data: err
                    })
                });
        }
    });

}

const handleBookUpdate = (db) => (req, res) => {
    db('booklist')
        .where('id', '=', req.body.id)
        .returning('*')
        .update({
            book_name: req.body.name,
            author: req.body.author,
            pages: req.body.pages,
            publication: req.body.publication,
            book_count: req.body.bookCount
        })
        .then(updatedBook => {
            if (updatedBook.length > 0) {
                res.json({
                    status: 200,
                    message: 'Book info updated',
                    data: updatedBook
                })
            } else {
                res.json({
                    status: 400,
                    message: 'Can not update book. Book not available!'
                })
            }
        })
        .catch(err => {
            res.json({
                status: 400,
                message: 'Can not update book. Book not available!',
                data: JSON.stringify(err, undefined, 2)
            })
        });
}

const handleRemoveBook = (db) => (req, res) => {
    db('booklist')
        .where('id', '=', req.params.id)
        .del()
        .then(removedBook => {
            res.json({
                status: 200,
                message: 'Book removed successfully!'
            })
        })
        .catch(err => {
            res.json({
                status: 400,
                message: 'Book not found! Can not remove.'
            })
        });
}

const handleAllBookList = (db) => (req, res) => {
    db.select('*')
        .returning('*')
        .from('booklist')
        .then(books => {
            res.json({
                status: 200,
                message: 'Request success',
                data: books
            })
        })
        .catch(err => {
            res.json({
                status: 400,
                message: 'Ooops, Something is not correct!'
            })
        })
}

const handleAddUser = (db, bcrypt) => (req, res) => {
    const crypticPassword = bcrypt.hashSync(req.body.password, 1);
    db.transaction(trx => {
        trx
            .insert({
                email: req.body.email,
                hash: crypticPassword
            })
            .into("login")
            .returning("email")
            .then(loginEmail => {
                return trx("users")
                    .returning("*")
                    .insert({
                        email: loginEmail[0],
                        username: req.body.username
                    })
                    .then(user => {
                        return res.json({
                            status: 200,
                            message: 'Registration success!',
                            data: user[0]
                        });
                    });
            })
            .then(trx.commit)
            .catch(trx.rollback);
    }).catch(err => res.status(400).json({
        status: 400,
        message: "Unable to register!"
    }));
}

const handleRemoveUser = (db) => (req, res) => {
    db.transaction(trx => {
        trx('login').del()
            .where('email', '=', req.body.email)
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .del()
                    .where('email', '=', req.body.email)
                    .then(user => {
                        res.json({
                            status: 200,
                            message: 'User removed successfully!',
                            data: user
                        })
                    })
                    .catch(err => {
                        res.json({
                            status: 400,
                            message: 'Invalid email, user not present',
                            error: err
                        });
                    })
                    .then(trx.commit)
                    .catch(trx.rollback);
            })
            .catch(err => {
                res.json({
                    status: 400,
                    message: 'Can not remove user, something is not correct!'
                })
            })
    });
}

const handleAllUsers = (db) => (req, res) => {
    db.select('*')
        .returning('*')
        .from('users')
        .then(users => {
            res.json({
                status: 200,
                message: 'User retrieval success!',
                data: users
            })
        })
        .catch(err => {
            res.json({
                status: 400,
                message: 'Oops, Something is not correct!'
            })
        })
}

const handleBookSearch = (db) => (req, res) => {
    const { searchStr } = req.params;
    db('booklist')
        .where('book_name', 'like', `${searchStr}%`)
        .orWhere('author', 'like', `${searchStr}%`)
        .orWhere('publication', 'like', `${searchStr}%`)
        .then(books => {
            books.length > 0 ?
                res.json({
                    status: 200,
                    message: 'Get your searched books here ...',
                    data: books
                }) :
                res.json({
                    status: 204,
                    message: 'No book is available! Find for other one  . . .',
                    data: null
                })
        })
        .catch(err => {
            res.json({
                status: 400,
                message: 'something went wrong'
            })
        })
}

const handleUserSearch = (db) => (req, res) => {
    const { searchStr } = req.params;
    db('users')
        .where('username', 'like', `${searchStr}%`)
        .orWhere('email', 'like', `${searchStr}%`)
        .then(users => {
            users.length > 0 ?
                res.json({
                    status: 200,
                    message: 'Get your searched books here ...',
                    data: users
                }) :
                res.json({
                    status: 204,
                    message: 'No book is available! Find for other one  . . .',
                    data: null
                })
        })
        .catch(err => {
            res.json({
                status: 400,
                message: `something went wrong  ${err}`
            })
        })
}


module.exports = {
    handleBookAdd,
    handleBookUpdate,
    handleRemoveBook,
    handleAllBookList,
    handleAddUser,
    handleRemoveUser,
    handleAllUsers,
    handleBookSearch,
    handleUserSearch
}