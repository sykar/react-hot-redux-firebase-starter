import * as firebase from 'firebase/firebase-browser';
import {firebaseConfig} from '../config';


class FirebaseApi {

  static initAuth() {
    firebase.initializeApp(firebaseConfig);
    return new Promise((resolve, reject) => {
      const unsub = firebase.auth().onAuthStateChanged(
        user => {
          unsub();
          resolve(user);
        },
        error => reject(error)
      );
    });
  }

  static createUserWithEmailAndPassword(user) {
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(u => {
        return firebase.auth().currentUser.updateProfile({ displayName: user.username })
            .then(() => Object.assign({}, u, { displayName: user.username }));
    });
  }

  static signInWithEmailAndPassword(user) {
    return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
  }

  static authSignOut(){
    return firebase.auth().signOut();
  }

  static databasePush(path, value) {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(path)
        .push(value, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
    });
  }

  static GetValueByKeyOnce(path, key) {
    return firebase
      .database()
      .ref(path)
      .orderByKey()
      .equalTo(key)
      .once('value');
  }

    // static GetCollection(path) {
    //     return firebase
    //       .database()
    //       .ref(path)
    //       .orderByKey()
    //       .once('value');
    // }

  static GetChildAddedByKeyOnce(path, key) {
    return firebase
      .database()
      .ref(path)
      .orderByKey()
      .equalTo(key)
      .once('child_added');
  }

  static databaseSet(path, value) {
    return firebase
      .database()
      .ref(path)
      .set(value);
  }

  static listenChildrenAdded(path, callback) {
      return firebase
        .database()
        .ref(path)
        .on('child_added', callback);
  }

  static listenChildrenRemoved(path, callback) {
      return firebase
          .database()
          .ref(path)
          .on('child_removed', callback);
  }

  static listenChildrenChanged(path, callback) {
      return firebase
          .database()
          .ref(path)
          .on('child_changed', callback);
  }
}

export default FirebaseApi;
