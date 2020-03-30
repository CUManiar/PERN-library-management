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

const handleBookBorrow = (db) => (req, res) => {
    const { book, user } = req.body;
    db.transaction(trx => {
        trx('booklist')
            .where('book_name', '=', book)
            .decrement('book_count', 1)
            .then(bookInfo => {
                return trx('book')
                    .returning('*')
                    .insert({
                        book_name: book,
                        last_issued_to: user,
                        last_issued_at: new Date()
                    })
                    .then(bookData => {
                        return trx('user_history')
                            .returning('*')
                            .insert({
                                book_name: book,
                                borrowed_at: new Date(),
                                email: user
                            })
                            .then(user => {
                                return res.json({
                                    status: 200,
                                    message: 'Book issued',
                                    data: user
                                });
                            });
                    });
            })
            .then(trx.commit)
            .catch(trx.rollback);
    }).catch(err => {
        res.json({
            status: 400,
            message: 'Something went wrong ' + err
        })
    })
}

const handleReturnBook = (db) => (req, res) => {
    const { book, user } = req.body;
    db.transaction(trx => {
        trx('booklist')
            .where('book_name', '=', book)
            .increment('book_count', 1)
            .then(bookInfo => {
                return trx('user_history')
                    .where('email', '=', user)
                    .andWhere('book_name', '=', book)
                    .returning('*')
                    .update({
                        returned_at: new Date()
                    })
                    .then(user => {
                        return res.json({
                            status: 200,
                            message: 'Book returned',
                            data: user
                        });
                    });
            })
            .then(trx.commit)
            .catch(trx.rollback);
    }).catch(err => {
        res.json({
            status: 400,
            message: 'Something went wrong ' + err
        })
    })
}

const handleUserBooks = (db) => (req, res) => {
    const { email } = req.body;
    db('user_history')
        .where('email', '=', email)
        .then(books => {
            res.json({
                status: 200,
                message: 'Books found',
                data: books
            });
        })
        .catch(err => {
            res.json({
                status: 400,
                message: 'Error fetching details, try again later!',
                data: err
            });
        });
}



module.exports = {
    handleAllBookList,
    handleBookSearch,
    handleBookBorrow,
    handleReturnBook,
    handleUserBooks
}