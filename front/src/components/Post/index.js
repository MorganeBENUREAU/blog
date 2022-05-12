import './style.scss';

import { formatDate } from '../../utils';


const Post = ({ post }) => {

    return (

        <div className="post">
                
            <h3 className="post_title">{post.title}</h3>
            <p className="post_content">{post.content}</p>
            <p className="post_updated-at">{post.updated_at ? formatDate(post.updated_at) : formatDate(post.created_at)}</p>
            {/* Si post.image=true return post.image sinon rien */}
            <div>{post.image && post.image}</div>


        </div>
            
    )
};


export default Post;