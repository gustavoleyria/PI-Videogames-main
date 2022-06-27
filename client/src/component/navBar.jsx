import './navBar.css';
import SearchBar from './searchBar';
import Order from './order';
import {NavLink} from 'react-router-dom';


export default function NavBar(){
    return <div className='navBarSticky'>
        <div className='navBar'>
          <h1  className='navBar2'>VIDEO GAMES</h1>
          <NavLink to="/Home" className="navLink" style={isActive => ({
      color: isActive ? "blue" : "white"
    })}>Home</NavLink>
          <NavLink to="/addGame" className="navLink" style={isActive => ({
      color: isActive ? "blue" : "white"
    })}>AddGame</NavLink>
          <NavLink to="/" exact className="navLink" style={isActive => ({
      color: isActive ? "blue" : "white"
    })}>LandingPage</NavLink>
          <SearchBar />
        </div>
        <Order/>
        
    
    </div>
}