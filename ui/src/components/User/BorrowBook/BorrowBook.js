import React, { Component } from 'react';
import SearchBox from '../../Reusable Components/SearchBox/SearchBox';

class BorrowBook extends Component {

    constructor(props) {
        super(props)
        this.state = {
            books: [],
            userBooks: []
        }
    }

    setOrUpdateBookList = () => {
        fetch('http://localhost:8000/api/user', {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => { this.setState({ books: data.data }) })
            .catch(err => console.error(err));

        fetch('http://localhost:8000/api/user/get-books', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: this.props.user.email })
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    const item = data.data.sort((a, b) => new Date(b.borrowed_at).getTime() - new Date(a.borrowed_at).getTime())
                    item.forEach(item => this.setState({ userBooks: [...this.state.userBooks, item.book_name] }))
                }
            })
            .catch(err => console.error(err));
    }

    handleSearch = (e) => {
        const searchParam = e.target.value.trim();
        if (searchParam.length > 0) {
            fetch('http://localhost:8000/api/user/search/' + searchParam, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 200) {
                        return this.setState({ books: data.data });
                    } else if (data.status === 204) {
                        return this.setState({ books: [] });
                    }
                })
        } else {
            this.setOrUpdateBookList();
        }
    }

    borrowBook = (bookName) => {
        fetch('http://localhost:8000/api/user/borrow-book', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ book: bookName, user: this.props.user.email })
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    alert('Book added. You can collect it from shelf!');
                    this.props.onRouteChange('profile');
                }
            });

    }

    componentDidMount() {
        this.setOrUpdateBookList();
    }

    render() {
        return (
            <div className="pl2">
                <div className="book-search">
                    <SearchBox placeholder={`Book name, Author, Publication ...`} handleSearch={this.handleSearch} />
                </div>
                <div className="overflow-auto mt3 pt3">
                    {
                        this.state.books.length > 0 ?
                            <table className="f6 w-100 mw8 center" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th className="fw4 tc bb b--black-20 tl pb3 pr3 bg-white f4">Book Name</th>
                                        <th className="fw4 tc bb b--black-20 tl pb3 pr3 bg-white f4">Author</th>
                                        <th className="fw4 tc bb b--black-20 tl pb3 pr3 bg-white f4">Pages</th>
                                        <th className="fw4 tc bb b--black-20 tl pb3 pr3 bg-white f4">Publication</th>
                                        <th className="fw4 tc bb b--black-20 tl pb3 pr3 bg-white f4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="lh-copy">
                                    {
                                        this.state.books.map((item, i) => (
                                            <tr key={i} className=" pointer">
                                                <td className='pv3 pr3 bb b--black-20 ttc tl'>{item['book_name']}</td>
                                                <td className='pv3 pr3 bb b--black-20 ttc'>{item['author']}</td>
                                                <td className='pv3 pr3 bb b--black-20'>{item['pages']}</td>
                                                <td className='pv3 pr3 bb b--black-20 ttc'>{item['publication']}</td>
                                                {
                                                    this.state.userBooks.indexOf(item['book_name']) ?
                                                        <td className={`pv3 pr3 bb b--black-20 b mid-gray`}
                                                        > You have this one!
                                                </td>
                                                        : <td className={`pv3 pr3 bb b--black-20 b ${item['book_count'] > 0 ? 'underline link dark-blue pointer' : 'mid-gray'}`}
                                                            onClick={() => this.borrowBook(item['book_name'])}
                                                        >{item['book_count'] > 0 ? 'Borrow' : 'Not Available'}
                                                        </td>
                                                }
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                            :
                            <p> No book available! </p>
                    }
                </div>
            </div>
        )
    }
}


export default BorrowBook;