import './style.scss';

import axios from "axios";
import { useState, useEffect } from 'react';

import Logo from '../Logo';
import Navigation from '../Navigation';
import Post from '../Post';


const Accueil = () => {
    // declarer un use state pour enregistrer la reponse
    const [posts, setPosts] = useState([]);
    // Le use effect se joue quand le composant est monté
    useEffect(() => {
        axios.get('http://localhost:3000/post')
            .then(
                (response) => {
                    console.log(response);
                    // change le state avec la reponse
                    setPosts(response.data);
            })
            .catch ((error) => {
                    console.log(error);
            });
        
        
    }, []);
    
    // console logguer le nouveau state
    console.log('ici les posts', posts);
    // Mapper sur le state dans le return suivant car afficher des choses

    return (
        <div className="accueil">

            <Logo />

            <Navigation />

            <div className="container_all-posts">

                {posts.map((post) => (
                    <Post post={post} key={post.id}/>
                ))}
            </div>
            
        </div>
    )
};


export default Accueil;