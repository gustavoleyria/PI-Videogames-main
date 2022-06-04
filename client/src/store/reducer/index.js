import {FETCH_VIDEOGAME, SEARCH_VIDEOGAME} from '../actions';

const initialState = {
    videogames: [],
    filteredVideogames: []
}

export default function reducer (state = initialState, action){
    
    switch(action.type){
        case FETCH_VIDEOGAME:
            return{
                ...state,
                videogames: action.payload,
                filteredVideogames: action.payload
            }
        case SEARCH_VIDEOGAME:
            return{
                ...state,
                filteredVideogames: action.payload
            }
        default:
            return state
    }
}