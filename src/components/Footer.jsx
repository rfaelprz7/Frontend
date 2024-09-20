// src/components/Footer.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => (
    <footer className="bg-dark text-white p-3 text-center mt-5" style={{ borderTop: '3px solid primary', boxShadow: '0 -5px 10px rgba(0, 0, 0, 0.5)' }}>
      <p className="text-secondary" style={{ opacity: 0.7 }}>All rights reserved 2024 KopeeTearia</p>
    </footer>
);

export default Footer;
