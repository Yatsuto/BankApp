import { IonIcon } from '@ionic/react'; 
import { personOutline, lockClosedOutline } from 'ionicons/icons'; 
import React, { useState, useEffect } from 'react';


const LoginForm = () => {

    const [leftPosition, setLeftPosition] = useState(0); 
    
    useEffect(() => {
      const handleComponentMovement = (event) => {
        if (event.detail.direction === 'right') {
          setLeftPosition(prevPosition => prevPosition + 280); 
        }
      };
  
      window.addEventListener('moveComponents', handleComponentMovement);
  
      return () => {
        window.removeEventListener('moveComponents', handleComponentMovement);
      };
    }, []); 
    
    
    const handleMoveLeft = () => {
    setLeftPosition(prevPosition => prevPosition - 280);
    window.dispatchEvent(new CustomEvent('moveComponents', { detail: { direction: 'left' } })); 
  
    };
 
    return(

        <div style={{ position: 'relative', left: `${leftPosition}px`, transition: 'left 0.3s ease' }}>

            <div style={{ marginTop: '1.5rem', color: "white" }}>
                <h2 style={{ fontSize: '1.5rem', position: 'relative', top: -10, right: -110 }}>Login</h2>
                <IonIcon icon={personOutline} style={{ width: '20px', position: 'relative', right: -240, top: 12 }} />
                <input 
                    type="Username" 
                    id="Username" 
                    placeholder="Username"
                    style={{
                    width: "250px",
                    padding: "10px",
                    border: "1px solid white",
                    borderRadius: "20px",
                    boxSizing: "border-box",
                    backgroundColor: "transparent",
                    height: "37px",
                    color: "white",
                    position: 'relative', 
                    top: 10,
                    right: -5
                    }}>
                </input>

                <IonIcon icon={lockClosedOutline} style={{ width: '20px', position: 'relative', right: 30, top: 65 }} />
                <input 
                    type="Password" 
                    id="Password" 
                    placeholder="Password"
                    style={{
                    width: "250px",
                    padding: "10px",
                    border: "1px solid white",
                    borderRadius: "20px",
                    boxSizing: "border-box",
                    backgroundColor: "transparent",
                    height: "37px",
                    color: "white",
                    position: 'relative',
                    top: 25,
                    right: -25
                    }}>
                </input>
            
                <div style={{position: 'relative', left: 20, top: 38}}>
                    <input type="checkbox"/>
                </div>
                <h2 style={{position: 'relative', left: 39, top: 15, fontSize: '0.8rem'}}>
                    Remember me
                </h2>
                <div style={{position: 'relative', right: -150, top: -3, fontSize: '0.8rem', textDecoration: 'underline'}}>
                    <a href="#">Forgot Password?</a>  
                </div>

                <button
                    id="Login" 
                
                    style={{
                    width: "250px",
                    padding: "10px",
                    border: "1px solid white",
                    borderRadius: "20px",
                    boxSizing: "border-box",
                    backgroundColor: "white",
                    height: "37px",
                    color: "white",
                    position: 'relative', 
                    top: 10,
                    right: -25
                    }}>
                    <div style={{position: 'relative', top: -3, right: 0, color: "black"}}>
                        Login
                    </div>
                </button>

                <h2 style={{position: 'relative', left: 35, top: 26, fontSize: '0.8rem'}}>
                    Don't have an account? 
                </h2>
                <div style={{position: 'relative', left: 215, top: 7, fontSize: '0.8rem'}}>
                <button onClick={handleMoveLeft}>Register</button> 
                </div>

            </div>
        </div>
        
    );
};
export default LoginForm;