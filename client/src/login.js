import React, { useEffect, useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//import jwtDecode from "jwt-decode";

const Login = () => {
    const [login,setLogin] = useState('')
    const [password,setPassword]= useState('')
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[logged,setLogged]=useState(false)


    const navigate = useNavigate();
    useEffect(() => {
      if(localStorage.getItem('twittertoken')){
        navigate("/select");
      }
  
    });
  function handleSocialLogin(e) {
    e.preventDefault();
    
     let body = JSON.stringify({ username:login, password:password })
    axios.post('http://localhost:5001/auth/login',{
      username:login,
      password:password
    }).then(response =>localStorage.setItem("twittertoken", response.data.token)).catch(err => alert(err)) 
    setTimeout(()=>{
      if(localStorage.getItem('twittertoken')){
        navigate("/select");
      }
      window.location.reload();

    },2000)

  }
  function handleSocialSignup(e) {
    e.preventDefault();
  
    axios.post('http://localhost:5001/auth/register',{
      username:login,
      password:password,
      name:name,
      email:email
    }).then(response =>alert("User Created Successfully")).catch(err => alert(err)) 
    setTimeout(()=>{
      window.location.reload();

    },3000)

  }

  function handleInputChange(event) {
    setLogin(event.target.value);
}
function handleInputChanges(event) {
  setPassword(event.target.value);
}
function handleInputEmail(event) {
  setEmail(event.target.value);
}
function handleInputName(event) {
  setName(event.target.value);
}
  return (
    <div className="" style={{width:"40%",marginLeft:"28%",alignSelf:"center"}}>
      {logged === false &&
      <>
      <div className=""> 
    
        <h4>Log in to Igenie</h4>
      </div>
      <div className="">
        <form id="form" className="form" onSubmit={e => handleSocialLogin(e)}>
          <div className="FormControl">
            <label htmlFor="email">Username</label>
            <input name="email" id="email" className="Input" onChange={handleInputChange} />
          </div>
          <div className="FormControl">
            <label htmlFor="password">Password</label>
            <input name="password" id="password" className="Input" onChange={handleInputChanges} />
          </div>
          <button className="FormButton">Log in</button>
        </form>
       <p>Don't have an Account!? <a onClick={()=>setLogged(true)} style={{color:"blue"}}>SignUp</a></p>
        <div>

          <span style={{ padding: "0 5px", color: "grey" }}>.</span>
        
        </div>
      
      </div>
   
      </>
}
{logged === true &&
<div>
<div className=""> 
        <img
          src="https://pluspng.com/img-png/png-twitter-logo-twitter-in-png-2500.png"
          alt="twitter logo"
          style={{ width: "32px", height: "32px" }}
        />
        <h4>Create Account</h4>
      </div>
      <div className="">
        <form id="form" className="form" onSubmit={e => handleSocialSignup(e)}>
          <div className="FormControl">
            <label htmlFor="email">Username</label>
            <input name="email" id="email" className="Input" onChange={handleInputChange} />
          </div>
          <div className="FormControl">
            <label htmlFor="password">Password</label>
            <input name="password" id="password" className="Input" onChange={handleInputChanges} />
          </div>
          <div className="FormControl">
            <label htmlFor="email">Email</label>
            <input name="email" id="email" className="Input" onChange={handleInputEmail} />
          </div>
          <div className="FormControl">
            <label htmlFor="name">Name</label>
            <input name="name" id="name" className="Input" onChange={handleInputName} />
          </div>
          <button className="FormButton">Signup</button>
        </form>
       <p>Already have an Account!? <a onClick={()=>setLogged(false)} style={{color:"blue"}}>Login</a></p>
        <div>

          <span style={{ padding: "0 5px", color: "grey" }}>.</span>
        
        </div>
      
      </div>

</div>

}
    </div>
  );
};
export default Login;