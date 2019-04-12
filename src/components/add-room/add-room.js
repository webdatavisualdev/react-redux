import React, { Component } from 'react';
import './add-room.css';
import openSocket from 'socket.io-client';
import { userService, history } from '../../services';
import { connect } from 'react-redux';
import Header from '../header/header';
import { Link } from 'react-router-dom';

const API = 'http://localhost:3001/';
const socket = openSocket(API);

class AddRoom extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            workspace: this.props.state.workspace,
            users: [],
            participants: []
        };

        this.selectUser = this.selectUser.bind(this);
        this.addRoom = this.addRoom.bind(this);

        userService.getUsers({
            workspace: this.props.state.workspace.id,
            token: sessionStorage.getItem('token')
        }).then(res => {
            console.log(res);
            if (res.success) {
                this.setState({
                    users: res.data
                });
            }
        });
    }
    
    render() {
        return (
            <div className="container-add-room">
                <Header/>
                <div className="col-sm-12">
                    <Link className="back-link" to={'/' + this.state.workspace.displayName + '/chat'}>Go to chat</Link>
                    <form onSubmit={this.addRoom}>
                        <div className="form-group">
                            <label htmlFor="name">Room Name:</label>
                            <input type="text" className="form-control" id="name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="users">Select Participants:</label>
                            {
                                this.state.users.map(u => 
                                    <div className="checkbox">
                                        <label><input type="checkbox" value={u.username} onChange={this.selectUser}/>{u.username}</label>
                                    </div>
                                )
                            }
                        </div>
                        <button className="btn btn-info">Add Room</button>
                    </form>
                </div>
            </div>
        );
    }

    addRoom(e) {
        e.preventDefault();
        if (e.target.name.value != '' && this.state.participants.length > 0) {
            userService.addRoom({
                name: e.target.name.value,
                participants: this.state.participants,
                workspace: this.state.workspace.id,
                token: sessionStorage.getItem('token')
            }).then(res => {
                if (res.success) {
                    history.push('/' + this.state.workspace.displayName + '/chat');
                } else {
                    alert(res.message);
                }
            });
        }
    }

    selectUser(e) {
        var participants = this.state.participants;
        if (e.target.checked && participants.indexOf(e.target.value) < 0) {
            participants.push(e.target.value);
        } else if (!e.target.checked && participants.indexOf(e.target.value) >= 0) {
            participants.splice(participants.indexOf(e.target.value), 1);
        }

        this.setState({
            participants: participants
        })
    }
}

function mapStateToProps(state) {
    return {
        state
    };
}

export default connect(mapStateToProps)(AddRoom);