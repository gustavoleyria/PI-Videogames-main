import './App.css';
import SearchBar from './component/searchBar';
import Videogames from './component/videogames';
import Order from './component/order';

function App() {
  return (
    <div className="App">
      <SearchBar/>
      <Order/>
      <Videogames />
    </div>
  );
}

export default App;
