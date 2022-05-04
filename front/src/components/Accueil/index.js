import './style.scss';

import axios from "axios";
import { useState, useEffect } from 'react';
import { formatDate } from '../../utils';

import Logo from '../Logo';
import Navigation from '../Navigation';


const Accueil = () => {
    // declarer un use state pour enregistrer la reponse
    const [posts, setPosts] = useState([]);
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

                {posts.map((post) => {

                    return (
                        
                        <div className="container_one-post" key={post.id}>
                            <h3 className="post_title">{post.title}</h3>
                            <p className="post_content">{post.content}</p>
                            <p className="post_updated-at">{post.updated_at ? formatDate(post.updated_at) : formatDate(post.created_at)}</p>
                            {/* Si post.image=true return post.image sinon rien */}
                            <div>{post.image && post.image}</div>
                        </div>
                    )}
                )}
            </div>
            
        </div>
    )
};


export default Accueil;