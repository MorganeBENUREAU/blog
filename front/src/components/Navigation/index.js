import './style.scss';

import React from 'react';
import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <div className="navigation_list">
            <NavLink to="/" className="link">
                <li>accueil</li>
            </NavLink>
            <NavLink to="/about" className="link">
                <li>about</li>
            </NavLink>
            <NavLink to="/addPost" className="link">
                <li>ajouter un post</li>
            </NavLink>
            <NavLink to="/contact" className="link">
                <li>contact</li>
            </NavLink>
        </div>
    )
};


export default Navigation;