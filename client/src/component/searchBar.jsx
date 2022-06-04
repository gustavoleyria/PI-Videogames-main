import {useState} from 'react';
import { searchVideogame } from '../store/actions';
import { useDispatch } from 'react-redux';

export default function SearchBar(){
    const [search, setSearch] = useState('')
    let dispatch = useDispatch()
    function onSubmit(e){
        e.preventDefault();
        dispatch(searchVideogame(search))
    }

    function onInputChange(e){
        e.preventDefault()
        setSearch(e.target.value)
    }
    
  //  onChange={ (e) => onInputChange}
  //onChange={onInputChange}
    return <div>
        <form onSubmit={onSubmit}>
            <input type="text"  onChange={ (e) => onInputChange(e)} value={search}/>
            <input type="submit" value="Buscar" />
        </form>
    </div>
}