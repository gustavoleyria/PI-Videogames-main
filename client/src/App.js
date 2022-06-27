import {Route/*, Routes*/} from 'react-router-dom';
import './App.css';
import VideogameDetail from './component/videogameDetail';
import AddVideogame from './component/addVideogame';
import LandingPage from './component/landingPage';
import Home from './component/home';
import UpDateVideogameForm from './component/upDateVideogame'

function App() {
  return (
    <div className="App">
      <Route path="/" exact>
        <LandingPage/>
      </Route>
      
      <Route path="/Home" exact>
        <Home/>
      </Route>
      <Route path="/addGame" exact>
        <AddVideogame/>
      </Route>
      <Route path="/videogame/:id" exact>
        <VideogameDetail/>
      </Route>
      <Route path="/update/:id" exact>
        <UpDateVideogameForm/>
      </Route>
      
                 
        
    </div>
  );
}

export default App;
