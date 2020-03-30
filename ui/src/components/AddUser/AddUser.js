import React, { Component } from 'react';

class AddUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            isValid: null
        }
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = () => {
        if (this.state.username.length < 3 || this.state.password.length < 8 || this.state.email.length < 3 || this.state.email.indexOf('@') === -1) {
            this.setState({ isValid: false });
        } else {
            this.setState({ isValid: true })
            const body = {
                email: this.state.email,
                password: this.state.password,
                username: this.state.username
            }
            fetch('http://localhost:8000/api/admin/add_user', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 200) {
                        alert('User added successfully! ')
                        this.props.onRouteChange('all-users');
                    }
                })
                .catch(err => console.error(err));
        }
    }

    render() {
        return (
            <div>
                <main className="pa4 black-80">
                    <form className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Add User </legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="username">Username<span className="dark-red">*</span></label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="username" id="username" onChange={this.handleInputChange} />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email">Email<span className="dark-red">*</span></label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email" id="email" onChange={this.handleInputChange} />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password<span className="dark-red">*</span></label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" onChange={this.handleInputChange} />
                            </div>
                        </fieldset>
                        <input type="button" className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick={this.handleSubmit} value="Submit" />
                    </form>
                    {this.state.isValid === false ? <p className="dark-red"> All fields are mandatory</p> : null}
                    {this.state.isValid === false ? <p className="dark-red">Invalid Email. Email must be more than 3 letters and contain '@'.</p> : null}
                    {this.state.isValid === false ? <p className="dark-red">Password must be at least 8 characters. </p> : null}
                    {this.state.isValid === false ? <p className="dark-red">Username should be at least 3 character</p> : null}
                </main>

            </div>
        )
    }
}


export default AddUser;