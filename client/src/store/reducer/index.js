import { ASCENDENTE,Strategy,RPG,Casual,Arcade,Racing,Fighting,Board_Games,Indie,Action,
    Simulation,Puzzle,Massively_Multiplayer,Sports,Card,Educational,Adventure,Shooter,Platformer,Family, DB, API, RESET } from '../../component/constantes/sort';
import {FETCH_VIDEOGAME, GET_DETAIL, FETCH_GENRE, FETCH_PLATFORM, SEARCH_VIDEOGAME, SORT_NAME, SORT_RATING,FILTER_GENRE,FILTER_ORIGEN,DELETE_GAME_DB} from '../actions';

const initialState = {
    videogames: [],//variable para todos los videojuegos
    genres: [],//variable para todos los generos
    detail: {},
    platforms: [],//variable para todos las plataformas
    filteredVideogames: []//variable que guarda le filtrado de juegos
}

export default function reducer (state = initialState, action){
    
    switch(action.type){
        case FETCH_VIDEOGAME:
            return{
                ...state,
                videogames: action.payload,//.data,
                filteredVideogames: action.payload
            }
        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload,
            }
        case FETCH_GENRE:
            return{
                ...state,
                genres: action.payload,//.data,
                //filteredVideogames: action.payload
            }
        case FETCH_PLATFORM:
            return{
                ...state,
                platforms: action.payload,//.data,
                //filteredVideogames: action.payload
            }    
        case SEARCH_VIDEOGAME:
            return{
                ...state,
                //videogames: action.payload.data,
                filteredVideogames: action.payload
            }
        case SORT_NAME:
            let orderedVideogames = [...state.videogames];
            orderedVideogames = orderedVideogames.sort((a,b)=>{
                if(a.name < b.name){
                    return action.payload === ASCENDENTE ? -1 : 1;
                }
                if(a.name > b.name){
                    return  action.payload === ASCENDENTE ? 1 : -1;
                }
                return 0;
            })
            return{
                ...state,
                filteredVideogames: orderedVideogames
            }
        case SORT_RATING:
            let orderedByRatingVideogames = [...state.videogames];
            orderedByRatingVideogames = orderedByRatingVideogames.sort((a,b)=>{
                if(a.rating < b.rating){
                    return action.payload === ASCENDENTE ? -1 : 1;
                }
                if(a.rating > b.rating){
                    return  action.payload === ASCENDENTE ? 1 : -1;
                }
                return 0;
            })
            return{
                ...state,
                filteredVideogames: orderedByRatingVideogames
            }
            case FILTER_GENRE:
            let orderedByGenreOne = [...state.videogames];
            let orderedByGenre = orderedByGenreOne.filter(game => {
                if(action.payload === RESET){
                    return (game.id)
                } else{
                    return game.genres.includes(action.payload)
                }
            })
            return{
                ...state,
                filteredVideogames: orderedByGenre
            }
            case FILTER_ORIGEN:
            let orderedByOrigenOne = [...state.videogames];
            let orderedByOrigen = orderedByOrigenOne.filter(game => {
                if(action.payload === DB){
                    return (game.id.length > 10)
                } 
                if(action.payload === API){
                    return (game.id.toString().length < 10)
                }
                if(action.payload === RESET){
                    return (game.id)
                }
            })
            return{
                ...state,
                filteredVideogames: orderedByOrigen
            }
            case "DELETE_GAME_DB":
            return{
                ...state,
                videogames: state.videogames.filter(v => v.id !== action.payload),
                filteredVideogames: state.filteredVideogames.filter(v => v.id !== action.payload)
            }
        default:
            return state
    }
}
