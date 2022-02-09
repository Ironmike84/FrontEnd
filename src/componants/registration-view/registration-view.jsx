//---------------------------------------// REGISTRATION-VIEW \\-----------------------------------------------\\

import React, { useState } from 'react';
import axios from 'axios';
import { Row, Col, Button, Container, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import './registration-view.scss'

export function RegistrationView(props){
    const [ name, setName ] = useState('');
    const [ UserName, setUserName] = useState('');
    const [ password, setPassword] = useState('');
    const [ email, setEmail] = useState('');
    const [ birthday, setBirthday] = useState('');
    const [ values, setValues ] = useState({
            nameErr: '',
            usernameErr: '',
            password: '',
            email: ''
    });

// validate user inputs
const validate = () => {
    let isReq = true;
    if(name){
        setValues({nameErr:'Name is Required'});
        isReq = false;
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
    }if(password.length < 6){
     setPassword('Password must be 6 characters long');
     isReq = false;
    }if(email){
    setEmail('Must Be A Valid E-Mail');
    isReq = false;
    }
    }else if(email.indexOf('@')=== -1){
    setEmailErr('Must Include @ Symbol');
    isReq = false;
}
return isReq;
}
const handleSubmit = (e) => {
    e.prevent.Default();
    const isReq = validate();
    if (isReq){
        axios.post('https://muvies-app.herokuapp.com/users/NewUser/', {
            Name: name,
            Username: UserName,
            Password: password,
            Email: email,
            Birthday: birthday
        })
        .then(response =>{ 
            const data = response.data;
            console.log(data);
            alert('Registration Successful, Please Login');
            window.open('/', '_self'); 
        })
        .catch(response =>{ 
            console.error(response);
            alert('Unable to Register!!!');
        });
    }
};
        return (
            <Container>
            <Row className='mt-5'>
                <Col md={12}>
                    <Form>
                        <H3>Sign Up</H3>
                        <p></p>
{/* ------// NAME \\-------------------------------------------------------------- */}
                        <Form.Group controlId='formName' className='reg-form-inputs'>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type = 'text' value={name} onChange={(e) =>
                            setName(e.target.value)}/>
                                {values.nameErr && <p>{values.nameErr}</p>}
                        </Form.Group>
{/* ------// USERNAME \\-------------------------------------------------------------- */}
                        <Form.Group controlId='formUsername' className='reg-form-inputs'>
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type = 'text' value={UserName} onChange={(e) =>
                            setUserName(e.target.value)}/>
                                {values.usernameErr && <p>{values.usernameErr}</p>}
                        </Form.Group>
{/* ------// PASSWORD \\-------------------------------------------------------------- */}
                        <Form.Group controlId='formPassword' className='reg-form-inputs'>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type = 'text' value={UserName} onChange={(e) =>
                            setPassword(e.target.value)}/>
                                {values.passwordErr && <p>{values.passwordErr}</p>}
                        </Form.Group>
{/* ------// EMAIL \\-------------------------------------------------------------- */}
                        <Form.Group controlId='Email' className='reg-form-inputs'>
                            <Form.Label>E-Mail:</Form.Label>
                            <Form.Control type = 'email' value={email} onChange={(e) =>
                            setEmail(e.target.value)}/>
                                {values.emailErr && <p>{values.emailErr}</p>}
                        </Form.Group>
{/* ------// EMAIL \\-------------------------------------------------------------- */}
                        <Form.Group controlId='UpdateBirthday' className='reg-form-inputs'>
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Control type = 'date' name='birthday' onChange={(e) =>
                            setBirthday(e.target.value)}/>
                        </Form.Group>
                        <Button variant='primary' type="submit" onClick={handleSubmit}>Submit</Button>
                        <p></p>
                        <p>Already Registered <Link to={'/'}>Sign</Link>Here</p>
                    </Form>
                </Col>
            </Row>
        </Container>
        )
}

RegistrationView.propTypes = {
    register: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired
    })
};

