import axios from 'axios'
export const FETCH_VIDEOGAME = 'FETCH_VIDEOGAME';
export const SEARCH_VIDEOGAME = 'SEARCH_VIDEOGAME';

export function fetchVideogame(){
    return function(dispatch){
        axios.get('http://localhost:3001/api/videogame/')
        .then((videogames) =>{
            dispatch({
                type: FETCH_VIDEOGAME,
                payload: videogames.data
            })
        .catch((error) =>{
            console.log(error)
        })
        })
    }
}

export function searchVideogame(search){
    return function(dispatch){
        axios.get('http://localhost:3001/api/videogame?name=' + search)
        .then((videogames) =>{
            dispatch({
                type: SEARCH_VIDEOGAME,
                payload: videogames.data
            })
        .catch((error) =>{
            console.log(error)
        })
        })
    }
}