import { sort, sortByRating, filterByGenre, filterByOrigen, fetchVideogame} from "../store/actions";
import './order.css';
import { DESCENDENTE, ASCENDENTE, Strategy,RPG,Casual,Arcade,Racing,Fighting,Board_Games,Indie,Action,
    Simulation,Puzzle,Massively_Multiplayer,Sports,Card,Educational,Adventure,Shooter,Platformer,Family, DB, API, RESET } from "./constantes/sort"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";


export default function Order(){
    let videogames = useSelector((state) => state.filteredVideogames/*.videogames*/)
    const dispatch = useDispatch();
    
    function onSelectChange(e){
        return dispatch(sort(e.target.value))
    }

    function onReset(e){
        dispatch(fetchVideogame())
    }

    function onSelectChangeByRating(e){
        dispatch(sortByRating(e.target.value))
    }

    function onSelectChageByGenre(e){
        if(e.target.value) dispatch(filterByGenre(e.target.value))
    }

    function onSelectChageByOrigen(e){
        console.log(e.target.value)
        if(e.target.value) dispatch(filterByOrigen(e.target.value))
    }

    return <div className="select">
        <p>Order By</p>
        <select name="select" onChange={onSelectChange} className="selectOrder">
            <option>Alphabetic</option>
            <option value={ASCENDENTE}>Ascendente</option>
            <option value={DESCENDENTE}>Descendente</option>
        </select>
        <select name="select" onChange={onSelectChangeByRating} className="selectOrder">
            <option value={RESET}>Rating</option>
            <option value={ASCENDENTE}>Ascendente Rating</option>
            <option value={DESCENDENTE}>Descendente Rating</option>
        </select>
        <select name="select" onChange={onSelectChageByGenre} className="selectOrder">
            <option value={RESET}>Genres</option>
            <option value={Strategy}>Strategy</option>
            <option value={RPG}>RPG</option>
            <option value={Casual}>Casual</option>
            <option value={Arcade}>Arcade</option>
            <option value={Racing}>Racing</option>
            <option value={Fighting}>Fighting</option>
            <option value={Board_Games}>Board Games</option>
            <option value={Indie}>Indie</option>
            <option value={Action}>Action</option>
            <option value={Simulation}>Simulation</option>
            <option value={Puzzle}>Puzzle</option>
            <option value={Massively_Multiplayer}>Massively Multiplayer</option>
            <option value={Sports}>Sports</option>
            <option value={Card}>Card</option>
            <option value={Educational}>Educational</option>
            <option value={Adventure}>Adventure</option>
            <option value={Shooter}>Shooter</option>
            <option value={Platformer}>Platformer</option>
            <option value={Family}>Family</option>
        </select>
        <select name="select" onChange={onSelectChageByOrigen} className="selectOrder">
            <option value={RESET}>Origen</option>
            <option value={DB}>DATA BASE</option>
            <option value={API}>API</option>
        </select>
        <button onClick={onReset} className="buttonOrder">Reset</button>
        
    </div>
     
}
