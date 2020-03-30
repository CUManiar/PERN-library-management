import React, { Component } from 'react';
import './App.css';
// import { connect } from 'react-redux';
import Login from './components/Login/Login';
import UserHome from './components/User/UserHome';
import AdminHome from './components/Admin/AdminHome';
import Navigation from './components/Navigation/Navigation';
// import { setEmailAddress, setPassword } from './components/Login/loginActions';
// import { validateUser } from './components/Login/loginReducer';

// const mapStateToProps = (state) => {
//   return {
//     email: state.updateEmail.email,
//     password: state.updatePassword.password,
//     isPending: state.validateUser.isPending,
//     isValidUser: state.validateUser.isValidUser,
//     user: state.validateUser.user
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onEmailChange: (e) => dispatch(setEmailAddress(e.target.value)),
//     onPasswordChange: (e) => dispatch(setPassword(e.target.value)),
//     onSubmit: (e) => dispatch(validateUser())
//   }
// }

const initialState = {
	isUserLoggedIn: false,
	user: {
		id: '',
		username: '',
		email: '',
		role: ''
	},
	route: 'sign-in'
}

class App extends Component {

	constructor() {
		super();
		this.state = initialState;
	}


	loadUser = data => {
		this.setState({ user: data });
	};


	onRouteChange = (route) => {
		if (route === 'sign-in') {
			this.setState(initialState);
		} else if (route === 'home') {
			this.setState({ isUserLoggedIn: true })
		} else if (route === 'admin_home') {
			this.setState({ isUserLoggedIn: true });
		}

		this.setState({ route: route });
	}

	render() {

		const { isUserLoggedIn, route, user } = this.state;

		return (
			<div className="App">
				<Navigation
					user={user.username}
					isUserLoggedIn={isUserLoggedIn}
					onRouteChange={this.onRouteChange}
				/>
				{!isUserLoggedIn || route === 'sign-in' ? <Login loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> :
					(route === 'home') ?
						<UserHome user={this.state.user} /> :
						<AdminHome />
				}
			</div>
		)
	}
}


export default App;
