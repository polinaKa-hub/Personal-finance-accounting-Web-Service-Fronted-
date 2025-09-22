 // start.jsx
 import React, { useState, useEffect } from 'react';
 import { Link } from 'react-router-dom';
 import './start.css';
 
 function StartPage() {
     const [currentTime, setCurrentTime] = useState(new Date());
 
     useEffect(() => {
         const intervalId = setInterval(() => {
             setCurrentTime(new Date());
         }, 1000);
 
         return () => clearInterval(intervalId);
     }, []);
 
     const formattedTime = currentTime.toLocaleString();
 
     return (
        <div>
            <header className="header">
                <div>Учетная запись</div>
                <div className="menu-icon">☰</div>
            </header>
            <div className="page-container">
                <div className="circular-menu">
                    <Link to="/finance">Затраты</Link>
                    <Link to="/category">Накопления</Link>
                    <Link to="/transactions">Транзакции</Link>
                </div>
               
            </div>
        </div>
     );
 }
 
 export default StartPage;
 