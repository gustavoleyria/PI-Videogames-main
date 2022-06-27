import './landingPage.css';
import {Link} from 'react-router-dom'

export default function LandingPage(){
    return <div>
        
        <Link to="/Home">
            <button className="landingPage">
                Go Home
            </button>
        </Link>
    </div>
}


