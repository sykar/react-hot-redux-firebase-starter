import firebaseApi from '../api/firebase';
import * as types from './actionTypes';

import { authLoggedIn } from './authActions';
import {ajaxCallError, beginAjaxCall} from './ajaxStatusActions';

export function chatRoomList() {
    return (dispatch) => {
        firebaseApi.listenChildrenAdded('chatrooms', data => {
            dispatch({
                type: types.CHAT_ROOM_CREATED_SUCCESS,
                chatroom: {
                    id: data.key,
                    name: data.val().name
                }
            });
        });
    };
}

export function chatRoomCreated(name) {
    return (dispatch) => {
        return firebaseApi.databasePush('chatrooms', { name: name })
            .then(() => dispatch({
                type: types.CHAT_ROOM_CREATED_SUCCESS,
                name: name
            }));
    };
}

export function chatRoomJoined(roomId, userId) {
    return (dispatch) => {
        return firebaseApi.databasePush('chatroom-users/' + roomId, { uid: userId })
            .then(() => dispatch({
                type: types.CHAT_ROOM_JOINED_SUCCESS,
                roomId: roomId,
                userId: userId
            }));
    };
}

export function chatRoomLeft(roomId, userId) {
    return (dispatch) => {
        return firebaseApi.databaseSet('chatroom-users/' + roomId + '/' + userId, null)
            .then(() => dispatch({
                type: types.CHAT_ROOM_LEFT_SUCCESS,
                roomId: roomId,
                userId: userId
            }));
    };
}

export function chatRoomMessage(roomId, user, message) {
    return (dispatch) => {
        return firebaseApi.databasePush('chatroom-messages/' + roomId, { uid: user.uid, username: user.displayName, message: message });
    };
}

export function chatRoomMessageList(roomId) {
  return (dispatch) => {
    firebaseApi.listenChildrenAdded('chatroom-messages/' + roomId, data => {
        dispatch({
            type: types.CHAT_ROOM_MESSAGE_SUCCESS,
            message: {
                id: data.key,
                userId: data.val().userId,
                username: data.val().username,
                message: data.val().message
            }
        });
    });
  };
}
