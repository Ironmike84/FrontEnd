//LOGIN View
import axios from 'axios';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './login-view.scss'

export function LoginView(props) {
  const [UserName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Declare hook for each input
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');
  const validate = () => {
    let isReq = true;
    if(!UserName){
     setUsernameErr('Username Required');
     isReq = false;
    }else if(UserName.length < 2){
     setUsernameErr('Username must be 2 characters long');
     isReq = false;
    }
    if(!password){
     setPasswordErr('Password Required');
     isReq = false;
    }else if(password.length < 10){
     setPassword('Password must be 6 characters long');
     isReq = false;
    }

    return isReq;
}

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
      /* Send request to the server for authentication */
      axios.post('https://muvies-app.herokuapp.com/login', {
          UserName: UserName,
          Password: password
      })
      .then(response =>{
          const data = response.data;
          props.onLoggedIn(data);
          location.reload()
      })
      .catch(e => {
        alert('User does not Exist Please try again...')
      });
    }
  };

    return (
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" placeholder="Enter username" value={UserName} onChange={e => setUsername(e.target.value)} />
          {/* code added here to display validation error */}
          {usernameErr && <p>{usernameErr}</p>}
  </Form.Group>
  
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          {/* code added here to display validation error */}
          {passwordErr && <p>{passwordErr}</p>}
  </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
          </Button>
      </Form>
    )
  }
