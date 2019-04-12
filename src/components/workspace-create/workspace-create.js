import React, { Component } from 'react';
import './workspace-create.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userService, history } from '../../services';
import { userActions } from '../../actions';

class WorkspaceCreate extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="panel panel-success text-center">
                <div className="panel-heading lead">
                    <strong>Create Workspace</strong>
                </div>
                <div className="panel-body">
                    <form className="form form-horizontal" onSubmit={this.createWorkspace}>
                        <div className="form-group">
                            <label className="control-label col-sm-5" htmlFor="fullName">Full Name:</label>
                            <div className="col-sm-7">
                                <input className="form-control" id="fullName" name="fullName" type="text" required minLength="2"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-5" htmlFor="displayName">Display Name:</label>
                            <div className="col-sm-7">
                                <input className="form-control" id="displayName" name="displayName" type="text" required minLength="2"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-5" htmlFor="email">Admin User:</label>
                            <div className="col-sm-7">
                                <input className="form-control" id="email" name="email" type="email" required/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-5" htmlFor="password">Password:</label>
                            <div className="col-sm-7">
                                <input className="form-control" id="password" name="password" type="password" required minLength="6"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-5" htmlFor="confirmPass">Confirm Password:</label>
                            <div className="col-sm-7">
                                <input className="form-control" id="confirmPass" name="confirmPass" type="password" required minLength="6"/>
                            </div>
                        </div>
                        <div className="col">
                            <button className="btn btn-success">Create Workspace -></button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    createWorkspace(e) {
        e.preventDefault();
        if (e.target.password.value === e.target.confirmPass.value && e.target.password.value !== '') {
            userService.createWorkspace({
                fullName: e.target.fullName.value,
                displayName: e.target.displayName.value,
                email: e.target.email.value,
                password: e.target.password.value
            }).then(res => {
                alert(res.message);
            });
        }
    }
}

export const mapStateToProps = (state) => {
    return {
        state: state
    }
}

export default connect(mapStateToProps)(WorkspaceCreate);