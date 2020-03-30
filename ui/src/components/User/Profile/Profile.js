import React, { Component } from 'react';

class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userBooks: []
        }
    }

    setOrUpdateUserBooks = () => {
        fetch('http://localhost:8000/api/user/get-books', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: this.props.user.email })
        })
            .then(res => res.json())
            .then(data => {
                const item = data.data.sort((a, b) => new Date(b.borrowed_at).getTime() - new Date(a.borrowed_at).getTime())
                this.setState({ userBooks: item })
            })
            .catch(err => console.error(err));
    }

    handleBookReturn = (bookInfo) => {
        fetch('http://localhost:8000/api/user/return-book', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ book: bookInfo, user: this.props.user.email })
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    alert('Book returned ...');
                    this.setOrUpdateUserBooks();
                }
            })
            .catch(err => console.error(err));
    }

    componentDidMount() {
        this.setOrUpdateUserBooks();
    }

    render() {
        return (
            <div >
                <div className="current-books">
                    <p className='fw3 f4 tl underline'> Books are with you : </p>
                    {
                        this.state.userBooks.length > 0 ?
                            <table className="f6 w-100 mw8 center" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Book Name</th>
                                        <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Borrowed At</th>
                                        <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Returned At</th>
                                        <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="lh-copy">
                                    {
                                        this.state.userBooks.map((item, i) => (

                                            !item['returned_at'] ?
                                                <tr key={i} className="pointer">
                                                    <td className='pv3 pr3 bb b--black-20 ttc'>{item['book_name']}</td>
                                                    <td className='pv3 pr3 bb b--black-20 ttc'>{new Date(`${item['borrowed_at']}`).toLocaleString()}</td>
                                                    <td className='pv3 pr3 bb b--black-20 ttc'>{item['returned_at'] ? new Date(`${item['returned_at']}`).toLocaleString() : ''}</td>
                                                    <td className='pv3 pr3 bb b--black-20 link underline dark-blue ttc' onClick={() => this.handleBookReturn(item['book_name'])}>Return Book</td>
                                                </tr>
                                                :
                                                null
                                        ))
                                    }
                                </tbody>
                            </table>
                            :
                            <p> You don't have any book! </p>
                    }
                </div>

                <div className="all-books pt2 mt5">
                    <p className='fw3 f4 tl underline'> All book transaction history: </p>
                    {
                        this.state.userBooks.length > 0 ?
                            <table className="f6 w-100 mw8 center" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Book Name</th>
                                        <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Borrowed At</th>
                                        <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white tc">Returned At</th>
                                    </tr>
                                </thead>
                                <tbody className="lh-copy">
                                    {
                                        this.state.userBooks.map((item, i) => (
                                            <tr key={i} className="pointer">
                                                <td className='pv3 pr3 bb b--black-20 ttc'>{item['book_name']}</td>
                                                <td className='pv3 pr3 bb b--black-20 ttc'>{new Date(`${item['borrowed_at']}`).toLocaleString()}</td>
                                                <td className='pv3 pr3 bb b--black-20 ttc'>{item['returned_at'] ? new Date(`${item['returned_at']}`).toLocaleString() : ''}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            :
                            <p> You don't have any book! </p>
                    }
                </div>
            </div>
        )
    }
}


export default Profile;