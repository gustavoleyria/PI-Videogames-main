export default function Videogame({name,image}){
    return <div>
        <h3>{name}</h3>
        <img src={image} alt="image"/>
    </div>
}