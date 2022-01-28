import './style.scss';

import axios from "axios";
import { useState, useEffect } from 'react';
import { formatDate } from '../../utils';


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

            {posts.map((post) => {

                return (
                    <div key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <p>{post.updated_at ? formatDate(post.updated_at) : formatDate(post.created_at)}</p>
                        {/* Si post.image=true return post.image sinon rien */}
                        <div>{post.image && post.image}</div>
                    </div>
                )}
            )}
            
            
        </div>
    )
};


export default Accueil;