import React, { Component } from 'react';
import SearchBox from '../Reusable Components/SearchBox/SearchBox';

class BookList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            books: []
        }
    }

    setOrUpdateBookList = () => {
        fetch('http://localhost:8000/api/admin/all_books', {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => { this.setState({ books: data.data }) })
            .catch(err => console.error(err));
    }

    onRemoveBook = (id) => {
        if (window.confirm('Book will be removed. Are you sure? ')) {
            fetch('http://localhost:8000/api/admin/remove_book/' + id, {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 200) {
                        alert('Book removed successfully!');
                        this.setOrUpdateBookList();
                        this.onRouteChange('list-all-books');
                    } else {
                        alert('Something went wrong. Could not delete the book!');
                    }
                })
                .catch(err => console.error(err));
        }
    }

    handleSearch = (e) => {
        const searchParam = e.target.value.trim();
        if (searchParam.length > 0) {
            fetch('http://localhost:8000/api/admin/search/' + searchParam, {
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
                                        <th className="fw4 tc bb b--black-20 tl pb3 pr3 bg-white f4">ID</th>
                                        <th className="fw4 tc bb b--black-20 tl pb3 pr3 bg-white f4">Book Name</th>
                                        <th className="fw4 tc bb b--black-20 tl pb3 pr3 bg-white f4">Author</th>
                                        <th className="fw4 tc bb b--black-20 tl pb3 pr3 bg-white f4">Pages</th>
                                        <th className="fw4 tc bb b--black-20 tl pb3 pr3 bg-white f4">Publication</th>
                                        <th className="fw4 tc bb b--black-20 tl pb3 pr3 bg-white f4">Available</th>
                                        <th className="fw4 tc bb b--black-20 tl pb3 pr3 bg-white f4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="lh-copy">
                                    {
                                        this.state.books.map((item, i) => (
                                            <tr key={i} className="hover-bg-black hover-white pointer">
                                                <td className='pv3 pr3 bb b--black-20'>{item['id']}</td>
                                                <td className='pv3 pr3 bb b--black-20 ttc'>{item['book_name']}</td>
                                                <td className='pv3 pr3 bb b--black-20 ttc'>{item['author']}</td>
                                                <td className='pv3 pr3 bb b--black-20'>{item['pages']}</td>
                                                <td className='pv3 pr3 bb b--black-20 ttc'>{item['publication']}</td>
                                                <td className='pv3 pr3 bb b--black-20 '>{item['book_count']}</td>
                                                <td className='pv3 pr3 bb b--black-20 underline dark-blue b pointer' onClick={() => this.onRemoveBook(item['id'])}>Remove</td>
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


export default BookList;