import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './user.css';
import { FaUserCircle, FaEnvelope, FaCalendarAlt, FaApple, FaHeart, FaStar, FaCoffee, FaLeaf, FaSnowflake, FaSmile, FaRocket, FaTree, FaCar } from 'react-icons/fa';

function UserPage() {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [randomIcons, setRandomIcons] = useState([]);

    useEffect(() => {
        // Retrieve user data from navigation state
        const fetchedUser = location.state || {
            name: 'Поля',
            email: 'polya@example.com',
            
            avatar: '🐥',
        };
        setUser(fetchedUser);

        // Generate random icons ensuring they do not overlap
        const icons = generateRandomIcons(200);
        setRandomIcons(icons);
    }, [location.state]);

    function generateRandomIcons(count) {
        const positions = [];
        const icons = [];
        const iconTypes = [FaApple, FaHeart, FaStar, FaCoffee, FaLeaf, FaSnowflake, FaSmile, FaRocket, FaTree, FaCar, FaEnvelope];
        const radius = 50;

        function isOverlapping(newTop, newLeft) {
            return positions.some(([top, left]) => {
                const distance = Math.sqrt(Math.pow(top - newTop, 2) + Math.pow(left - newLeft, 2));
                return distance < radius;
            });
        }

        while (icons.length < count) {
            const top = Math.random() * (window.innerHeight - radius);
            const left = Math.random() * (window.innerWidth - radius);

            if (!isOverlapping(top, left)) {
                positions.push([top, left]);
                const Icon = iconTypes[Math.floor(Math.random() * iconTypes.length)];
                icons.push({ Icon, position: { top: `${top}px`, left: `${left}px` } });
            }
        }
        return icons;
    }

    return (
        <div className="userPage-userContainer">
        <header className="userHeader">
            Учётная запись
        </header>

        <main>
            {user ? (
                <div className="userInfoContainer">
                    <div className="userAvatar">{user.avatar}</div>
                    <h1><FaUserCircle /> {user.name}</h1>
                    <p><FaEnvelope /> Email: {user.email}</p>
                    
                    <button className="editDataButton">Редактировать</button>                   
                    <Link to="/" className="loginButton"> Выход</Link>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </main>

        <Link to="/start">
            <button className="FromUserToStartBack-button">Назад</button> 
        </Link>
    </div>
    );
}

export default UserPage;