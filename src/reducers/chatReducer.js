import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function chatReducer(state = initialState.chat, action) {
    switch (action.type) {
        case types.CHAT_ROOM_CREATED_SUCCESS:
            return Object.assign({}, state, {
                rooms: [ ...state.rooms, action.chatroom ]
            });

        case types.CHAT_ROOM_JOINED_SUCESS:
            return state;

        case types.CHAT_ROOM_LEFT_SUCESS:
            return state;

        case types.CHAT_ROOM_MESSAGE_SUCCESS:
            if (!action.message)
              return state;
            return Object.assign({}, state, {
              messages: [ ...state.messages, action.message ]
            });

        default:
            return state;
    }
}
