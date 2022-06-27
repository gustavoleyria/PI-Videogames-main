import React, { useState, useEffect } from 'react'
import { Link, useParams, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { getDetail, deleteGameDB, fetchVideogame } from '../store/actions'
import NavBar from './navBar';
import styleDetail from './videogameDetail.module.css'
import NavBarWH from './navBarWH'

export default function Detail() {
    const { id } = useParams()
    const large = id.toString().length

    let history = useHistory()

    const dispatch = useDispatch()
    const details = useSelector(state => state.detail)

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getDetail(id))
            .then((response) => {
                setLoading(false);
            })
            .catch(error => console.log(error));
    }, [/*dispatch,id*/])


    if (loading) {
        return (
            <div>
                <Link to="/Home">
                    <button className={styleDetail.btnBack}>Home</button>
                </Link>
                <div className={styleDetail.loading}>
                </div>

            </div>
        )
    }
console.log(details.description)
console.log(id.toString().length)

function deleteGameDBOnClick(e){
    if(large > 7){
        e.preventDefault()
        dispatch(deleteGameDB(id))
        dispatch(fetchVideogame())
        alert("Game Delete")
        history.push("/Home")
    }else{
        alert("Game From API, don't Delete")
    }    
}

function UpDateGameDBOnClick(e){
    if(large > 7){
        e.preventDefault()
        history.push("/update/" + id)
    }else{
        alert("Game From API, don't UpDate")
    }    
}
function createMarkup() {
    return {__html: details.description};
  }
   
    return (
        <div>
            <div className={styleDetail.dateNav2}>
                <NavBarWH/>
                <div className={styleDetail.dateNav}>                    
                    {/* <h6 className={styleDetail.h6}> {details.name} </h6> */}
                    <img className={styleDetail.imgNav} src={details.image} alt="" width="140px" height="70px" />
                    <button className={styleDetail.bottonDelete} onClick={(e) => deleteGameDBOnClick(e)}>Delete_DB</button>
                    <button className={styleDetail.bottonUpDate} onClick={(e) => UpDateGameDBOnClick(e)}>UpDate_DB</button>
                </div>
            </div>
        <div className={styleDetail.background}>
            <div className={styleDetail.border}>
                <h1 className={styleDetail.h1}> {details.name} </h1>
                <img className={styleDetail.img} src={details.image} alt="" width="500px" height="310px" />
                {/* <p className={styleDetail.description} dangerouslySetInnerHTML={{ _html: details.description}}>{details.description}</p> */}
                <div className={styleDetail.description} dangerouslySetInnerHTML={createMarkup()} />
                {/* <div dangerouslySetInnerHTML={{_html:details.description}}/>  */}
                <h2 className={styleDetail.h2}>Release Date:</h2>
                <p className={styleDetail.p}> {details.release_date} </p>
                <h2 className={styleDetail.h2}>Rating:</h2>
                <p className={styleDetail.p}> {details.rating} </p>
                <h2 className={styleDetail.platforms} >Genres:</h2>
                <p className={styleDetail.pPlatforms}> {details.genres.map(e => (e + " "))}</p>
                <h2 className={styleDetail.platforms} >Platforms:</h2>
                <p className={styleDetail.pPlatforms}> {details.platforms.map(e => (e + " "))}</p>
            </div>           
        </div>
        </div>
    )
}
