import { Link } from "react-router-dom";
import cardCss from './videogame.module.css'

export default function Videogame({id, name,image,genres}){
    return (<div className={cardCss.cnt}>
        <Link to={`/videogame/${id}`} style={{ textDecoration: 'none' }}>
        <h1 className={cardCss.h1}>{name}</h1>
        </Link>
        
        <img src={image} alt="imagen" width="250" height="200"/>
        <p className={cardCss.p}>{genres.map(e => (e + " "))}</p>
        </div>)
}
