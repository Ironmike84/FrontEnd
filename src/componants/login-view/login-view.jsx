//LOGIN View
import React, { useState } from 'react';
import './login-view.scss';
export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
};

return (
    <div className='login-container'>
    <form>

    <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} /></label>
        <br></br>
        <br></br>
    <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} /></label>
        <br></br>
        <br></br>
{/* on User input set value of username and password in UseState Const Varibles */}
            <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
    </div>
);
}