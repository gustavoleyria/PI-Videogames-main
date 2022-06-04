import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { fetchVideogame } from '../store/actions';
import Videogame from './videogame';

export default function Videogames(){
    let videogames = useSelector((state) => state.videogames)
    console.log(videogames)
    let dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchVideogame())
    },[])
    console.log(videogames)
    return <div>
        {videogames.map((videogame) =>{
            return <Videogame name={videogame.name} image={videogame.image}/>
        })}
            
        </div>
}