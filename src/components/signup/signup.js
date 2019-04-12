import React, { Component } from 'react';
import './signup.css';
import { Link } from 'react-router-dom';
import { userService } from '../../services';
import { connect } from 'react-redux';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.signup = this.signup.bind(this);
        this.state = {
            workspace: this.props.state.workspace
        };
    }

    render() {
        return (
            <div className="panel panel-success text-center">
                <div className="panel-heading lead">
                    <strong>SIGNUP</strong>
                </div>
                <div className="panel-body">
                    <form className="form form-horizontal" onSubmit={this.signup}>
                        <div className="form-group">
                            <label className="control-label col-sm-5" htmlFor="email">Email:</label>
                            <div className="col-sm-7">
                                <input className="form-control" id="email" name="email" type="email" required/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-5" htmlFor="username">Username:</label>
                            <div className="col-sm-7">
                                <input className="form-control" id="username" name="username" type="text" required minLength="2"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-5" htmlFor="password">Password:</label>
                            <div className="col-sm-7">
                                <input className="form-control" id="password" name="password" type="password" required minLength="6"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-5" htmlFor="confirmpass">Confirm Password:</label>
                            <div className="col-sm-7">
                                <input className="form-control" id="confirmpass" name="confirmpass" type="password" required minLength="6"/>
                            </div>
                        </div>
                        <div className="col">
                            <button className="btn btn-success">Signup</button>
                            <Link to={'/' + this.state.workspace.displayName + '/login'}>Login with an existing account</Link><br/>
                            <Link to="/workspace" className="link-back">Go To Workspaces</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    signup(e) {
        if (e.target.password.value === e.target.confirmpass.value && e.target.password.value !== '') {
            userService.signup({
                workspace: this.state.workspace.id,
                email: e.target.email.value,
                username: e.target.username.value,
                password: e.target.password.value
            }).then(res => {
                if (!res.success) {
                    alert(res.message);
                } else {
                    sessionStorage.setItem('token', res.token);
                    this.props.history.push('/' + this.state.workspace.displayName + '/chat');
                }
            });
        } else if (e.target.password.value !== e.target.confirmpass.value && e.target.password.value !== '') {
            alert('Password and Confirm Password don\'t match.');
        } else {
            alert('Password is required.');
        }
        e.preventDefault();
    }
}

export const mapStateToProps = (state) => {
    return {
        state: state
    }
}

export default connect(mapStateToProps)(Signup);