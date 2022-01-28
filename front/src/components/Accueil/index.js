import './style.scss';

import axios from "axios";
import { useState, useEffect } from 'react' ;


const Accueil = () => {
    // declarer un use state pour enregistrer la reponse
    const [count, setCount] = useState([]);
    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'http://localhost:3000/post',
            headers: {
                cookie: 'connect.sid=s%253ADKdPyNdNLRoVJwGhLgkS1Bva0yE0zhrv.b5Gkm5f3Qu8nWXkeAvy%252BhjSl5WfpAsOohUWREvHgEUg'
            }
            };
        
            axios.request(options).then(function (response) {
                // change le state avec la reponse
                setCount(response.data);
            }).catch(function (error) {
            console.error(error);
        });
        // afficher le nouveau state
        console.log(count);
        // Mapper sur le state
    })
    
    return (
        <div className="accueil">
        
        </div>
    )
};


export default Accueil;