// src/components/Header.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import hidir from '../assets/hidir.png';

const Header = () => (
    <header className="header bg-black text-white p-3">
        <div className="container">
            <img src={hidir} alt="KopeeTearia Logo" className="logo" />
        </div>
    </header>
);

export default Header;