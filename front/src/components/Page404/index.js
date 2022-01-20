import './style.scss';

import { Link } from 'react-router-dom';

const Page404 = () => (

  <div className="page404">

    <h2>404</h2>
    <p>PAGE NOT FOUND</p>
    <Link className="button" to="/">Accueil</Link>
    
  </div>
);


export default Page404;