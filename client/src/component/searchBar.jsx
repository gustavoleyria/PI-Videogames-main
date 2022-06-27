import {useState} from 'react';
import './searchBar.css';
import { searchVideogame } from '../store/actions';
import { useDispatch } from 'react-redux';

export default function SearchBar(){
    const [search, setSearch] = useState('')
    let dispatch = useDispatch()

    function onSubmit(e){
       //e.preventDefault();
       dispatch(searchVideogame(search))
       setSearch('')
    }

    function onInputChange(e){
        //e.preventDefault()
        setSearch(e.target.value)
    }

    return <div className='search'>
        <input type="text"  onChange={onInputChange} placeholder="Search..." value={search}/>
        <button type='submit' onClick={onSubmit} className='buttonSearch'>Search</button>
        
    </div>
}