import axios from 'axios'
export const FETCH_VIDEOGAME = 'FETCH_VIDEOGAME';// variable para reducer
export const GET_DETAIL = 'GET_DETAIL';// variable para reducer
export const FETCH_GENRE = 'FETCH_GENRE';// variable para reducer
export const FETCH_PLATFORM = 'FETCH_PLATFORM';// variable para reducer
export const SEARCH_VIDEOGAME = 'SEARCH_VIDEOGAME';// variable para reducer
export const SORT_NAME = 'SORT_NAME';// variable para reducer
export const SORT_RATING = 'SORT_RATING';// variable para reducer
export const FILTER_GENRE = 'FILTER_GENRE';
export const FILTER_ORIGEN = 'FILTER_ORIGEN';
export const DELETE_GAME_DB = 'DELETE_GAME_DB';


export function fetchVideogame(){
    return function(dispatch){
        axios.get('http://localhost:3001/api/videogame/')
        .then((videogames) =>{
            dispatch({
                type: FETCH_VIDEOGAME,
                payload: videogames.data
            })        
        })
        .catch((error) =>{
            console.log(error)
        })
    }
}

export function getDetail(id) {
    return async function (dispatch) {
        try {
            const details = await axios.get('http://localhost:3001/api/videogame/' + id)
            console.log(details)
            return dispatch({
                type: GET_DETAIL,
                payload: details.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function fetchGenre(){
    return function(dispatch){
        axios.get('http://localhost:3001/api/genre/')
        .then((genres) =>{
            dispatch({
                type: FETCH_GENRE,
                payload: genres.data
            })        
        })
        .catch((error) =>{
            console.log(error)
        })
    }
}

export function fetchPlatform(){
    return function(dispatch){
        axios.post('http://localhost:3001/api/platform/')
        .then((platforms) =>{
            dispatch({
                type: FETCH_PLATFORM,
                payload: platforms.data
            })        
        })
        .catch((error) =>{
            console.log(error)
        })
    }
}


export function searchVideogame(search){
    return function(dispatch){
        axios.get('http://localhost:3001/api/videogame/search?search=' + search)
        .then((videogames) =>{
            dispatch({
                type: SEARCH_VIDEOGAME,
                payload: videogames.data
            })        
        })
        .catch((error) =>{
            console.log(error)
        })
    }
}

export function postVideogame(/*payload*/input) { //TRAIGO LA INFO NECESARIA PARA EL FORMULARIO DESDE EL POST DEL BACK
    return async function (dispatch) {
        const response = await axios.post("http://localhost:3001/api/videogame/", /*payload*/input)
        return response;
    }
}

export function sort(order){
    return{
        type: SORT_NAME,
        payload:order
    }
}


export function sortByRating(order){
    return{
        type: SORT_RATING,
        payload:order
    }
}

export function filterByGenre(genre){
    return{
        type: FILTER_GENRE,
        payload:genre
    }
}

export function filterByOrigen(origen){
    return{
        type: FILTER_ORIGEN,
        payload:origen
    }
}

export function deleteGameDB(id) {
    return async function (dispatch) {
        try {
            const game = await axios.delete("http://localhost:3001/api/videogame/delete/" + id)
            return dispatch({
                type: "DELETE_GAME_DB",
                payload: id
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function putVideogame(/*payload*/id,input) { //TRAIGO LA INFO NECESARIA PARA EL FORMULARIO DESDE EL POST DEL BACK
    console.log(input)
    return async function (dispatch) {
        const response = await axios.put("http://localhost:3001/api/videogame/update/" + id, /*payload*/input)
        return response;
    }
}