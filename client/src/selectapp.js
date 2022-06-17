import React from 'react'
import Ilearn from './Ilearn.png'
import Ianalyze from './ianalyze.jpg'
import './selectapp.css'
import Idiscover from './iDiscover.png'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Button } from '@material-ui/core'
import Ishop from './cart.png'
export default function Selectapp() {
    const navigate = useNavigate();
    useEffect(() => {
        if(!localStorage.getItem('twittertoken')){
            navigate('/')
        }
      });
    function iDiscover(e) {
        navigate('/idiscover')
    }

    function Logout(e){
        localStorage.removeItem('twittertoken')
        navigate('/')
    }
  return (
    <div style={{marginLeft:"28%",marginTop:"12%"}} >
<h3 style={{marginLeft:"35%",marginBottom:"10%"}}>Select App </h3>
<div class="item" style={{marginRight:"30px",cursor:"pointer"}}>
    <img src={Idiscover} onClick={iDiscover} alt='idiscover' />
    <span class="caption">iDiscover</span>
</div>
<div class="item" style={{marginRight:"30px",cursor:"pointer"}}>
    <img  src={Ilearn} alt='ilearn'/>
    <span class="caption">iLearn</span>
</div>
<div class="item" style={{marginRight:"30px",cursor:"pointer"}}>
    <img src={Ianalyze} alt='ianalyze'/>
    <span class="caption">iAnalyze</span>
</div>
<div class="item" style={{marginRight:"30px",cursor:"pointer"}}>
    <img src={Ishop} alt='ishop'/>
    <span class="caption">iShop</span>
</div>
<div style={{marginTop:"50px",marginLeft:"38%"}}>
<Button onClick={Logout} style={{color:"white",backgroundColor:"#ba293c"}}>Logout</Button>
</div>

        
        </div>
  )
}
