import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
}



export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
      .then(res => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        return signedInUser;

      })
      .catch(err => {
        console.log(err);
        console.log(err.message);

      })
  }
//  export const handleFBLogin = () => {
//     const fbprovider = new firebase.auth.FacebookAuthProvider();
//     return firebase.auth().signInWithPopup(fbprovider).then(function(result) {
//       // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//       var token = result.credential.accessToken;
//       // The signed-in user info.
//       var user = result.user;
//       return user;
export const handleFbSignIn = () => {
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(fbProvider).then(function (result) {
      var token = result.credential.accessToken;
      var user = result.user;
      // console.log('fb user after sign in', user);
      user.success = true;
      return user;
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

 export const handleSignOut = () => {
    return firebase.auth().signOut()
      .then(res => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          photo: '',
          email: '',
          error: '',
          success: false
        }
        return signedOutUser;
      })
      .catch(err => {

      })
  }

//   export const createUserWithEmailAndPassword = () => {
//     firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
//     .then(res => {
//       const newUserInfo = {...user};
//       newUserInfo.error = '';
//       newUserInfo.success = true;
//       setUser(newUserInfo);  
//       updateUserName(user.name); 
          
//     })
//     .catch(error => {
//       // Handle Errors here.
//       const newUserInfo = {...user};
//       newUserInfo.error = error.message;
//       newUserInfo.success = false;
//       setUser(newUserInfo);
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log(errorCode, errorMessage);
//       // ...
//     });
//   }

//   export const signInWithEmailAndPassword = () =>{
//     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//     .then(res => {
//       const newUserInfo = {...user};
//       newUserInfo.error = '';
//       newUserInfo.success = true;
//       setUser(newUserInfo);
//       setLoggedInUser(newUserInfo); 
//       history.replace(from);
//       console.log('sign in user info', res.user);
//     })
//     .catch(error => {        
//       const newUserInfo = {...user};
//       newUserInfo.error = error.message;
//       newUserInfo.success = false;
//       setUser(newUserInfo);
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log(errorCode, errorMessage);
//     });
//   } 

//   const updateUserName = name => {
//     const user = firebase.auth().currentUser;

// user.updateProfile({
//   displayName: name, 
// }).then(function() {
//   console.log('User name updated successfully');
// }).catch(function(error) {
//   console.log(error);
// });

