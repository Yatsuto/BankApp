import { IonIcon } from '@ionic/react'; 
import { personOutline, lockClosedOutline } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';


const RegisterForm = ({}) => {

    const [leftPosition, setLeftPosition] = useState(0); 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
      const handleComponentMovement = (event) => {
        if (event.detail.direction === 'left') {
          setLeftPosition(prevPosition => prevPosition - 280); 
        } else if (event.detail.direction === 'right') {
          setLeftPosition(prevPosition => prevPosition + 100); 
        }
      };
  
      window.addEventListener('moveComponents', handleComponentMovement);
  
      return () => {
        window.removeEventListener('moveComponents', handleComponentMovement);
      };
    }, []);

    const handleMoveRight = () => {
        setLeftPosition(prevPosition => prevPosition + 180);
        // Dispatch an event to notify Component1
        window.dispatchEvent(new CustomEvent('moveComponents', { detail: { direction: 'right' } })); 
      };
    
      const handleRegister = async () => {
        try {
          const res = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: username,
              password,
              first_name: "John",
              last_name: "Doe",
              ssn: "123-45-6789"
            })
          });
      
          const data = await res.json();
          if (res.ok) {
            alert('✅ User registered successfully!');
          } else {
            alert(`❌ Error: ${data.error}`);
          }
        } catch (err) {
          console.error(err);
          alert('🚨 Failed to register');
        }
      };
      

    return(

        <div style={{ position: 'relative', left: `${leftPosition}px`, transition: 'left 0.3s ease'}}>

            <div style={{ position: 'relative', right: -280}}>
    
                <div style={{ textAlign: 'center', marginTop: '-1.5rem', color: "white" }}>
                    <h2 style={{ fontSize: '1.5rem', position: 'relative', top: -230, }}>Registeration</h2>
                    <IonIcon icon={personOutline} style={{ width: '20px', position: 'relative', right: -233, top: -207 }} />
                    <input 
                        type="Username" 
                        id="Username" 
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                        top: -210
                        }}>
                    </input>

                    <IonIcon icon={lockClosedOutline} style={{ width: '20px', position: 'relative', right: 36, top: -155 }} />
                    <input 
                        type="Password" 
                        id="Password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        top: -195
                        }}>
                    </input>

                    <div style={{position: 'relative', left: -115, top: -180}}>
                    <input type="checkbox"/>
                    </div>
                    <h2 style={{position: 'relative', left: -5, top: -202, fontSize: '0.8rem'}}>
                        I agree to the terms & conditions
                    </h2>

                    <button
                        id="Register" 
                        onClick={handleRegister}
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
                        top: -190,
                        }}>
                        <div style={{position: 'relative', top: -3, color: "black"}}>
                            Register
                        </div>
                    </button>

                    <h2 style={{position: 'relative', left: -25, top: -180, fontSize: '0.8rem'}}>
                        Already have an account? 
                    </h2>
                    <div style={{position: 'relative', left: 88, top: -200, fontSize: '0.8rem'}}>
                        <button onClick={handleMoveRight}>Login</button>
                    </div>

                </div>

            </div>
        </div>
    );
}
export default RegisterForm;
