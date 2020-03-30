import React, { Component } from 'react';
import SearchBox from '../Reusable Components/SearchBox/SearchBox';

class UserList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allUsers: []
        }
    }

    setOrUpdateAllUsers = () => {
        fetch('http://localhost:8000/api/admin/all_users', {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json())
            .then(data => this.setState({ allUsers: data.data }))
            .catch(err => console.error('Couldn\'t fetch users ' + err));
    }

    componentDidMount() {
        this.setOrUpdateAllUsers();
    }

    handleSearch = (e) => {
        const searchParam = e.target.value.trim();
        if (searchParam.length > 0) {
            fetch('http://localhost:8000/api/admin/search-user/' + searchParam, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 200) {
                        this.setState({ allUsers: data.data });
                    } else if (data.status === 204) {
                        this.setState({ allUsers: [] });
                    }
                })
        } else {
            this.setOrUpdateAllUsers();
        }
    }

    onRemoveUser = (email) => {
        if (window.confirm('User will be removed. Are you sure?')) {
            fetch('http://localhost:8000/api/admin/remove_user', {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email })
            })
                .then(res => {
                    if (res.status === 200) {
                        alert('User removed successfully!');
                        this.props.onRouteChange('all-users');
                        this.setOrUpdateAllUsers();
                    }
                })
                .catch(err => console.error(err));
        }
    }

    render() {
        return (
            <div className="pal2">
                <div className="book-search">
                    <SearchBox placeholder={`Username, Email ...`} handleSearch={this.handleSearch} />
                </div>
                <div className="overflow-auto mt3 pt3">
                    {
                        this.state.allUsers.length > 0 ?
                            <table className="f6 w-100 mw8 center" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th className="fw4 tc bb b--black-20 tl pb3 pr3 bg-white f4">ID</th>
                                        <th className="fw4 tc bb b--black-20 tl pb3 pr3 bg-white f4">Username</th>
                                        <th className="fw4 tc bb b--black-20 tl pb3 pr3 bg-white f4">Email</th>
                                        <th className="fw4 tc bb b--black-20 tl pb3 pr3 bg-white f4">Role</th>
                                        <th className="fw4 tc bb b--black-20 tl pb3 pr3 bg-white f4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="lh-copy">
                                    {
                                        this.state.allUsers.map((item, i) => (
                                            <tr key={i} className="hover-bg-black hover-white pointer">
                                                <td className='pv3 pr3 bb b--black-20'>{item['id']}</td>
                                                <td className='pv3 pr3 bb b--black-20 '>{item['username']}</td>
                                                <td className='pv3 pr3 bb b--black-20'>{item['email']}</td>
                                                <td className='pv3 pr3 bb b--black-20'>{item['role']}</td>
                                                <td className='pv3 pr3 bb b--black-20 underline dark-blue b pointer' onClick={() => this.onRemoveUser(item['email'])}>Remove</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            :
                            <p> No user available!</p>
                    }
                </div>
            </div>
        )
    }
}


export default UserList;