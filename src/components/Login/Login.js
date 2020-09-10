import React, { useState, useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleSignOut, handleFbSignIn, handleGoogleSignIn } from './LoginManager';

function Login() {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    });
    initializeLoginFramework();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                setUser(res);
                setLoggedInUser(res);
            })
    }
    const signOut = () => {
        handleSignOut()
        .then(res =>{
          setUser(res);
          setLoggedInUser(res);
        })
      }
    
      const fbSignIn = () => {
        handleFbSignIn()
        .then(res =>{
          setUser(res);
          setLoggedInUser(res);
        })
      }
    
      const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
          isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
          const isPasswordValid = e.target.value.length > 6;
          const passwordHasNumber = /\d{1}/.test(e.target.value);
          isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
          const newUserInfo = { ...user };
          newUserInfo[e.target.name] = e.target.value;
          setUser(newUserInfo);
        }
      }
      const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
    
        }
        if (!newUser && user.email && user.password) {
    
        }
        e.preventDefault();
      }
   
    return (
      <div style={{ textAlign: 'center' }}>
        {
          user.isSignedIn ? <button onClick={signOut}>Sign Out</button> : <button onClick={googleSignIn}>Sign In</button>
        }
        <br />
        <button onClick={fbSignIn}>Sign In Using Facebook</button>
    
        {
          user.isSignedIn && <div>
            <p> Welcome, {user.name}</p>
            <p>Your email address is: {user.email}</p>
            <img src={user.photo} alt="user" />
          </div>
        }
        <h1>Our Own Authentication</h1>
        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
        <label htmlFor="newUser">New User Sign Up</label>
        <form onSubmit={handleSubmit}>
          {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="Your Name" />}
          <br />
          <input type="text" onBlur={handleBlur} placeholder="Your email address" name="email" required />
          <br />
          <input type="password" onBlur={handleBlur} name="password" placeholder="Your password" required />
          <br />
          <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
        </form>
        <p style={{ color: 'red' }}>{user.error}</p>
        {user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged in'}  successfully!</p>}
    
    
      </div>
    );
}
    
    export default Login;