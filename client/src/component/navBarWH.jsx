import './navBarWH.css';
import {NavLink} from 'react-router-dom';


export default function NavBarWH(){
    return <div className='navBarWH'>
          <h1  className='navBar2WH'>VIDEO GAMES</h1>
          <NavLink to="/Home" className="navLinkWH" style={isActive => ({
      color: isActive ? "blue" : "white"
    })}>Home</NavLink>
          <NavLink to="/addGame" className="navLinkWH" style={isActive => ({
      color: isActive ? "blue" : "white"
    })}>AddGame</NavLink>
          <NavLink to="/" exact className="navLinkWH" style={isActive => ({
      color: isActive ? "blue" : "white"
    })}>LandingPage</NavLink>
        </div>
        
}