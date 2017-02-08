import React from 'react';
import {Link} from 'react-router';
import checkAuth from '../requireAuth';
import {connect} from 'react-redux';
import {chatRoomMessage, chatRoomMessageList} from '../../actions/chatActions';

class ChatRoomPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRoom: { name: 'Pick a chat room' },
            message: ''
        };
    }

    render() {
        console.log('props');
        console.log(this.props);
        console.log('state');
        console.log(this.state);
        return (
            <div className="container-fluid" style={{ paddingTop: '16px', paddingLeft: '16px' }}>
                <div className="row">
                    <div className="dropdown col">
                        <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                            {this.state.currentRoom.name}
                            <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu">
                            {this.props.chatrooms.map((room, i) => <li key={i}><a onClick={() => this.gotoChatroom(room)} href={'#' + room.id}>{room.name}</a></li>)}
                        </ul>
                    </div>
                    <ul className="chat-history col">{this.props.messages.map((msg, i) => <li key={i}>{msg.username + ' : ' + msg.message}</li>)}</ul>
                </div>
                <div className="row">
                    <div className="input-group col-12">
                        <span className="input-group-addon">{this.props.user.displayName}</span>
                        <input type="text" className="form-control" placeholder="Type your message here..." value={this.state.message} onChange={this.handleInput.bind(this)} />
                        <span className="input-group-btn">
                          <button className="btn btn-secondary" type="button"
                                  onClick={this.clickSend.bind(this)}>Send</button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    gotoChatroom(room) {
        this.setState({
            currentRoom: room
        });
        this.props.getRoomMessages(room.id);
    }

    handleInput(event) {
      this.setState({message: event.target.value});
    }

    clickSend() {
      this.props.postMessage(this.state.currentRoom.id, this.props.user, this.state.message);
      this.setState({ message: '' });
    }
}

function mapStateToProps(state) {
    return {
        chatrooms: state.chat.rooms,
        messages: state.chat.messages,
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        postMessage: (roomId, user, message) => {
            dispatch(chatRoomMessage(roomId, user, message));
        },
        getRoomMessages: (roomId) => dispatch(chatRoomMessageList(roomId))
    };
}

export default checkAuth(connect(mapStateToProps, mapDispatchToProps)(ChatRoomPage));
