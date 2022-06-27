import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { fetchVideogame } from '../store/actions';
import Videogame from './videogame';
import './videogames.css';

export default function Videogames(){
    let videogames = useSelector((state) => state.filteredVideogames/*.videogames*/)
    //console.log(videogames)
    let dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchVideogame())
    },[])
    console.log(videogames)
    return (
            <div className='container'>
                <div className='containerCard' >
                    {videogames.map((videogame) =>{
                        //console.log(videogame.genres)
                        return <Videogame key={videogame.id} id={videogame.id} name={videogame.name} image={videogame.image} genres={videogame.genres} />
                    })}  
                </div> 
            
            </div>
        
        )
}
