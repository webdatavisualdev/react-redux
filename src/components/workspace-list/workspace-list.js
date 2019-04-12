import React, { Component } from 'react';
import './workspace-list.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userService, history } from '../../services';
import { userActions } from '../../actions';

class WorkspaceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workspaces: [],
            email: ''
        };

        this.sendEmail = this.sendEmail.bind(this);
        this.setEmail = this.setEmail.bind(this);
    }

    componentWillMount() {
        userService.getAllWorkspaces().then(res => {
            console.log(res);
            if (res.success) {
                this.setState({
                    workspaces: res.data
                });
            }
        });
    }

    render() {
        return (
            <div className="content">
                <ul>
                    {
                        this.state.workspaces.map((w, key) => 
                            <li>
                                <span className="workspace-title">{w.fullName}</span>
                                <span className="workspace-link" onClick={() => this.goLogin(w)}>localhost:3000/{w.displayName}</span>
                            </li>
                        )
                    }
                </ul>
                <div className="form-section">
                    <p>Find Workspace</p>
                    <div className="row">
                        <div className="col-sm-8">
                            <input type="email" placeholder="Fill your email" id="email" required onChange={this.setEmail}/>
                        </div>
                        <div className="col-sm-4">
                            <button className="btn btn-success btn-email" onClick={this.sendEmail}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    goLogin(workspace) {
        sessionStorage.setItem('workspace', JSON.stringify(workspace));
        this.props.dispatch(userActions.setWorkspace(workspace));
        history.push('/' + workspace.displayName + '/login');
    }

    setEmail(e) {
        if (e.target.value != '') {
            this.setState({
                email: e.target.value
            });
        }
    }

    sendEmail() {
        if (this.state.email != '') {
            userService.sendAvailableWorkspaces({
                email: this.state.email
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

export default connect(mapStateToProps)(WorkspaceList);