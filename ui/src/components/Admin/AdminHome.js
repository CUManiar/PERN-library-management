import React, { Component } from 'react';
import UserList from '../UserList/UserList';
import './AdminHome.css';
import AddUser from '../AddUser/AddUser';
import AddBook from '../AddBook/AddBook';
import UpdateBook from '../UpdateBook/UpdateBook';
import BookList from '../BookList/BookList';
import Footer from '../Reusable Components/Footer/Footer';

class AdminHome extends Component {

    constructor(props) {
        super(props)
        this.state = {
            route: 'list-all-books'
        }
    }


    onRouteChange = (route) => {
        switch (route) {
            case 'add-user':
                this.setState({ route: 'add-user' })
                break;
            case 'all-users':
                this.setState({ route: 'all-users' })
                break;
            case 'remove-user':
                this.setState({ route: 'remove-user' })
                break;
            case 'add-book':
                this.setState({ route: 'add-book' })
                break;
            case 'remove-book':
                this.setState({ route: 'remove-book' })
                break;
            case 'update-book':
                this.setState({ route: 'update-book' })
                break;
            case 'list-all-books':
                this.setState({ route: 'list-all-books' })
                break;
            default:
                this.setState({ route: 'list-all-books' });
        }
    }

    render() {
        return (
            <div className="admin-home">
                <div className="mw9 center ph3-ns">
                    <div className="cf ph2-ns">
                        <div className="fl w-25 pa2 b--gray vh-75">
                            <ul className="list pl0 f4 tl pa2 ma1">
                                <p className="fw2 f4 black">User Operations</p>
                                <li className={`pa1 ml3 underline  pointer mt1  grow ${this.state.route === 'all-users' ? 'dark-gray b' : 'dark-blue'}`} onClick={() => this.onRouteChange('all-users')}> All Users </li>
                                <li className={`pa1 ml3 underline  pointer mt1 grow ${this.state.route === 'add-user' ? 'dark-gray b' : 'dark-blue'}`} onClick={() => this.onRouteChange('add-user')}> Add User </li>
                            </ul>
                            <ul className="list pl0  f4 tl pa2 ma1">
                                <p className="fw2">Library Operations</p>
                                <li className={`pa1 ml3 underline  pointer mt1 grow ${this.state.route === 'list-all-books' ? 'dark-gray b' : 'dark-blue'}`} onClick={() => this.onRouteChange('list-all-books')}> All books</li>
                                <li className={`pa1 ml3 underline  pointer mt1 grow ${this.state.route === 'add-book' ? 'dark-gray b' : 'dark-blue'}`} onClick={() => this.onRouteChange('add-book')}> Add Book </li>
                                <li className={`pa1 ml3 underline  pointer mt1 grow ${this.state.route === 'update-book' ? 'dark-gray b' : 'dark-blue'}`} onClick={() => this.onRouteChange('update-book')}> Update Book </li>
                            </ul>
                        </div>
                        <div className="fl w-75 pa2 vh-75 content">
                            {
                                (() => {
                                    switch (this.state.route) {
                                        case 'all-users':
                                            return <UserList onRouteChange={this.onRouteChange} />
                                        case 'add-user':
                                            return <AddUser onRouteChange={this.onRouteChange} />
                                        case 'add-book':
                                            return <AddBook onRouteChange={this.onRouteChange} />
                                        case 'update-book':
                                            return <UpdateBook onRouteChange={this.onRouteChange} />
                                        case 'list-all-books':
                                            return <BookList onRouteChange={this.onRouteChange} />
                                        default:
                                            return <BookList onRouteChange={this.onRouteChange} />
                                    }
                                })()
                            }
                        </div>
                    </div>
                </div>
                <div >
                    <Footer />
                </div>
            </div>
        )
    }
}


export default AdminHome;