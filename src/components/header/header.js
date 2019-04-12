import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userService, history } from '../../services';
import logo from './logo.svg';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <img src={logo} className="navbar-header" alt="logo" />
                    </div>
                    <ul className="nav navbar-nav">
                        <li><a>Home</a></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><a onClick={this.logout}>Logout</a></li>
                    </ul>
                </div>
            </nav>
        );
    }

    logout() {
        userService.logout();
    }
}

export const mapStateToProps = (state) => {
    return {
        state: state
    }
}

export default connect(mapStateToProps)(Header);