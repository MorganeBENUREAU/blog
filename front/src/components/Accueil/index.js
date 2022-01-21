import './style.scss';

import axios from "axios";
import { useState, useEffect } from 'react' ;


const Accueil = () => {
    useEffect(() => {
        const options = {
        method: 'GET',
        url: 'http://localhost:3000/post',
        headers: {
            cookie: 'connect.sid=s%253ADKdPyNdNLRoVJwGhLgkS1Bva0yE0zhrv.b5Gkm5f3Qu8nWXkeAvy%252BhjSl5WfpAsOohUWREvHgEUg'
        }
        };
    
        axios.request(options).then(function (response) {
        console.log(response.data);
        }).catch(function (error) {
        console.error(error);
        });
    })
    
    return (
        <div className="accueil">
        
        </div>
    )
};


export default Accueil;