import React, { Component } from "react";
import './Login.css';
import Footer from "../Reusable Components/Footer/Footer";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: "",
            signInPassword: "",
            isUserValid: true
        };
    }

    onEmailChange = event => {
        this.setState({ signInEmail: event.target.value });
    };

    onPasswordChange = event => {
        this.setState({ signInPassword: event.target.value });
    };

    onSubmitSignIn = () => {
        fetch(`http://localhost:8000/api/auth/sign-in `, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.data && data.data.id) {
                    if (data.data.role === 'admin') {
                        this.props.loadUser(data.data);
                        this.props.onRouteChange('admin_home');
                    } else {
                        this.props.loadUser(data.data);
                        this.props.onRouteChange('home');
                    }
                } else {
                    this.setState({ isUserValid: false });
                }
            });
    };

    render() {
        return (
            <div className="login-card">
                <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <div className="measure ">
                            {!this.state.isUserValid ? (
                                <p className="dark-red"> Invalid credentials </p>
                            ) : (
                                    ""
                                )}
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">
                                        Email
                      </label>
                                    <input
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="email"
                                        onChange={this.onEmailChange}
                                        name="email-address"
                                        id="email-address"
                                    />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">
                                        Password
                      </label>
                                    <input
                                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="password"
                                        onChange={this.onPasswordChange}
                                        name="password"
                                        id="password"
                                    />
                                </div>
                            </fieldset>
                            <div className="route">
                                <input
                                    onClick={this.onSubmitSignIn}
                                    className="br3 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                    type="submit"
                                    value="Sign in"
                                />
                            </div>
                            <div className="lh-copy mt3">
                                New User ?{" "}
                                <p
                                    className="f6 link dim black db  dark-red"
                                >
                                    Ask your admin to register you as user.
                    </p>
                            </div>
                        </div>
                    </main>
                </article>
                <div className="bottom-0 absolute w-100">
                    <Footer />
                </div>
            </div>
        );
    }
}

export default SignIn;