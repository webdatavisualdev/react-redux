import React, { Component } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userService, history } from '../../services';
import { userActions } from '../../actions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.state = {
            workspace: this.props.state.workspace
        };
    }

    render() {
        return (
            <div className="panel panel-success text-center">
                <div className="panel-heading lead">
                    <strong>LOGIN</strong>
                </div>
                <div className="panel-body">
                    <form className="form form-horizontal" onSubmit={this.login}>
                        <div className="form-group">
                            <label className="control-label col-sm-4" htmlFor="email">Email:</label>
                            <div className="col-sm-8">
                                <input className="form-control" id="email" name="email" type="email" required/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-4" htmlFor="password">Password:</label>
                            <div className="col-sm-8">
                                <input className="form-control" id="password" name="password" type="password" required minLength="6"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-12">
                                <label className="control-label" htmlFor="remember">Remember Me</label>
                                <input className="remember" id="remember" name="remember" type="checkbox"/>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <button className="btn btn-success btn-md">Login</button>
                            <Link to={'/' + this.state.workspace.displayName + '/signup'}>Create an account</Link><br/>
                            <Link to="/workspace" className="link-back">Go To Workspaces</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    login(e) {
        if (e.target.remember.checked) {
            localStorage.setItem('email', e.target.email.value);
            localStorage.setItem('password', e.target.password.value);
        }

        userService.login({
            workspace: this.state.workspace.id,
            email: e.target.email.value,
            password: e.target.password.value,
        }).then(res => {
            if (!res.success) {
                alert(res.message);
            } else {
                sessionStorage.setItem('token', res.token);
                this.props.dispatch(userActions.silentLogin(res.data));
                this.props.history.push('/' + this.state.workspace.displayName + '/chat');
            }
        });
        e.preventDefault();
    }
}

export const mapStateToProps = (state) => {
    return {
        state: state
    }
}

export default connect(mapStateToProps)(Login);