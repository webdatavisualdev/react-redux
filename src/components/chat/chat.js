import React, { Component } from 'react';
import './chat.css';
import openSocket from 'socket.io-client';
import { userService, history } from '../../services';
import { connect } from 'react-redux';
import Header from '../header/header';

const API = 'http://localhost:3001/';
const socket = openSocket(API);

class Chat extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        
        this.setMessage = this.setMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.addRoom = this.addRoom.bind(this);

        this.state = {
            messages: [],
            message: '',
            rooms: [],
            group: { name: 'General' },
            user: {},
            workspace: this.props.state.workspace,
            readGroups: {}
        };

        userService.getRooms(this.props.state.workspace.id).then(res => {
            if (res.success) {
                this.setState({
                    rooms: res.data
                });
                this.setGroup(res.data[0]);
            }
        });

        socket.on('connect', () => {

        });
    }
    
    render() {
        return (
            <div className="container-chat">
                <Header/>
                <div className="row">
                    <div className="col-xs-3">
                        <div class="input-group">
                            <input type="text" className="form-control" placeholder="Search"/>
                            <div className="input-group-btn">
                            <button className="btn btn-default btn-search">
                                <i className="glyphicon glyphicon-search"></i>
                            </button>
                            </div>
                        </div>
                        <div className="channel-list">
                        {
                            this.state.rooms.map((r, key) => 
                            <div className={this.state.group.name == r.name ? 'channel selected' : 'channel'} 
                            onClick={() => this.setGroup(r)}> {r.name} </div>)
                        }
                        </div>
                        <div>
                            <button className="btn btn-info" onClick={this.addRoom}>+ Add Room</button>
                        </div>
                    </div>
                    <div className="col-xs-9">
                        <div className="section-message">
                            {
                                this.state.messages.map(m => 
                                <div className={this.props.state.authentication.user.username === m.username ? 'sent' : 'received'}>
                                    <div className="one-message-container">
                                        {this.props.state.authentication.user.username !== m.username ? <p className="message-user">{m.username}</p> : null}
                                        <span className="message-text">{m.message}</span>
                                        <br/>
                                        <span className="message-time">{m.time}</span>
                                    </div>
                                </div>)
                            }
                        </div>
                        <div className="section-send">
                            <textarea type="text" value={this.state.message} placeholder="Write a message here" onChange={this.setMessage}></textarea>
                            <button onClick={this.sendMessage}>Send</button>  
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    setMessage(e) {
        this.setState({
            message: e.target.value
        });
    }

    sendMessage() {
        socket.emit('new-message', {
            message: this.state.message,
            time: new Date().toUTCString(),
            username: this.props.state.authentication.user.username,
            group: this.state.group._id,
            workspace: this.state.workspace.id
        });

        this.setState({
            message: ''
        });
    }

    setGroup(group) {
        this.setState({
            group: group,
        });

        userService.getMessages({
            token: sessionStorage.getItem('token'),
            workspace: this.props.state.workspace.id,
            group: group._id
        }).then(res => {
            console.log(res);
            if (res.success) {
                this.setState({
                    messages: res.data
                });
            }
        });

        if (!this.state.readGroups[group._id]) {
            socket.on(group._id + '/new-message', message => {
                this.state.messages.push(message);
                this.setState({
                    messages: this.state.messages
                });
            });

            var readGroups = this.state.readGroups;
            readGroups[group._id] = true;
            this.setState({
                readGroups: readGroups,
            });
        }
    }

    addRoom() {
        history.push('/' + this.state.workspace.displayName + '/add-room');
    }
}

function mapStateToProps(state) {
    return {
        state
    };
}

export default connect(mapStateToProps)(Chat);