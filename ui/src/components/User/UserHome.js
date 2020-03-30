import React, { Component } from 'react';
import Profile from './Profile/Profile';
import BorrowBook from './BorrowBook/BorrowBook';
import ReturnBook from './ReturnBook/ReturnBook';
import Footer from '../Reusable Components/Footer/Footer';

class UserHome extends Component {

    constructor(props) {
        super(props)
        this.state = {
            route: 'profile'
        }
    }

    onRouteChange = (route) => {
        switch (route) {
            case 'borrow-book':
                this.setState({ route: 'borrow-book' })
                break;
            case 'return-book':
                this.setState({ route: 'return-book' })
                break;
            case 'profile':
                this.setState({ route: 'profile' })
                break;
            default:
                this.setState({ route: 'profile' });
        }
    }

    render() {
        return (
            <div className="admin-home">
                <div className="mw9 center ph3-ns">
                    <div className="cf ph2-ns">
                        <div className="fl w-25 pa2 b--gray vh-75">
                            <ul className="list pl0 f4 tl pa2 ma1">
                                <p className="fw2 f4 black">What you want to do?</p>
                                <li className={`pa1 ml3 underline  pointer mt1  grow ${this.state.route === 'profile' ? 'dark-gray b' : 'dark-blue'}`} onClick={() => this.onRouteChange('profile')}> Profile</li>
                                <li className={`pa1 ml3 underline  pointer mt1  grow ${this.state.route === 'borrow-book' ? 'dark-gray b' : 'dark-blue'}`} onClick={() => this.onRouteChange('borrow-book')}> Borrow Book</li>
                                {/* <li className={`pa1 ml3 underline  pointer mt1 grow ${this.state.route === 'return-book' ? 'dark-gray b' : 'dark-blue'}`} onClick={() => this.onRouteChange('return-book')}> Return Book</li> */}
                            </ul>
                        </div>
                        <div className="fl w-75 pa2 vh-75 content">
                            {
                                (() => {
                                    switch (this.state.route) {
                                        case 'profile':
                                            return <Profile user={this.props.user} onRouteChange={this.onRouteChange} />
                                        case 'borrow-book':
                                            return <BorrowBook user={this.props.user} onRouteChange={this.onRouteChange} />
                                        case 'return-book':
                                            return <ReturnBook />
                                        default:
                                            return <Profile />
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


export default UserHome;