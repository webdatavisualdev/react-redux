import React, { Component } from 'react';
import './workspace.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userService, history } from '../../services';
import { userActions } from '../../actions';
import WorkspaceCreate from '../workspace-create/workspace-create';
import WorkspaceList from '../workspace-list/workspace-list';

class WorkSpace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPage: 'list'
        };
    }

    render() {
        return (
            <div className="container-fluid container-workspace">
                <div className="nav">
                    <div className={this.state.selectedPage === 'list' ? 'item selected' : 'item'} onClick={() => this.selectPage('list')}>WorkSpace List</div>
                    <div className={this.state.selectedPage === 'create' ? 'item selected' : 'item'} onClick={() => this.selectPage('create')}>Create WorkSpace</div>
                </div>
                <div className="workspace-content">
                    {
                        this.state.selectedPage === 'list' ? <WorkspaceList/> : <WorkspaceCreate/>
                    }
                </div>
            </div>
        );
    }

    selectPage(page) {
        this.setState({
            selectedPage: page
        });
    }
}

export const mapStateToProps = (state) => {
    return {
        state: state
    }
}

export default connect(mapStateToProps)(WorkSpace);