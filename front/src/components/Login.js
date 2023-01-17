import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const history = useNavigate();


  async function submit(e){
    e.preventDefault();

    try {
      await axios.post("http://localhost:4001/api/v1/auth/user/login", {email, password})
                 .then(res => {
                      if(res.data){
                        history("/Home", {state : {id: email}})
                      }else if(!res.data){
                        console.log("error");
                      }
                 })
                 .catch(e => {console.log("error");})
    } catch{
    console.log(e)
  }
}

  return (
    <div>
      <form action="POST">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={submit}>Login</button>
      </form>

      <Link to="/" onClick={submit}>Signup page</Link>
    </div>
  );
}

export default Login;
