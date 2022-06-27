import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { fetchGenre, fetchPlatform, putVideogame } from '../store/actions'
import { useDispatch, useSelector } from 'react-redux';
import styleForm from './upDateVideogame.module.css';
import NavBarWH from './navBarWH';

function validate(input) {
    let errors = {}
    if (!input.name) {
        errors.name = "Name required"
    }
    if (!input.description) {
        errors.description = "Complete description"
    }
    if (!input.rating || input.rating > 10 || input.rating < 0) {
        errors.rating = "Rating valid 0 - 10"
    }
    if (!input.release_date) {
        errors.release_date = "Complete date"
    } else if (!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(input.release_date)) { 
        errors.release_date = "Format error (yyyy/mm/dd)"
    }
    if (input.platforms.length < 1) {
        errors.platforms = "Enter platforms"
    }
    if (input.genres.length < 1) {
        errors.genres = "Enter genres"
    } 
    return errors
}


export default function UpDateVideogameForm() {
    const dispatch = useDispatch()
    const history = useHistory()

    const genres = useSelector((state) => state.genres)
    const platforms = useSelector((state) => state.platforms)

    const details = useSelector((state) => state.detail)
    console.log(details)
    console.log(details.id)
    console.log(details.description)
    

    const id = details.id;


    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: details.name,
        description: `${details.description}`,
        release_date: details.release_date,
        rating: details.rating,
        background_image: details.image,
        genres: details.genres,
        platforms: details.platforms
    })



    //----------Inputs---------
    function handleInputChange(e) {
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    //-----Select genres----
    function handleGenreSelect(e) {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
        setErrors(validate({
            ...input,
            genres: [...input.genres, e.target.value]
        }))
    }
    //-----Select platfroms----
    function handlePlatformsSelect(e) {
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
        setErrors(validate({
            ...input,
            platforms: [...input.platforms, e.target.value]
        }))
    }

    //---------Send form--------
    function handleSubmit(e) {
        if (input.name === "") {
            e.preventDefault()
            alert("Completar correctamente el formulario")
        } else {
            e.preventDefault();
            dispatch(putVideogame(id,input))
            alert("Videojuego Actualizado!!")
            setInput({
                name: "",
                description: "",
                platforms: "",
                release_date: "",
                rating: "",
                background_image: "",
                genres: [],
                platforms: [] 
            })
            history.push('/home')
        }
    }

    //---------Delete genres---------
    function handleGenreDelete(el) {
        let newGenres = input.genres.filter(genre => genre !== el)
        setInput({
            ...input,
            genres: newGenres
        })
        setErrors(validate({
            ...input,
            genres: newGenres
        }))
        
    }

    //---------Delete platforms--------
    function handlePlatformDelete(el) {
        let newPlatforms = input.platforms.filter(platform => platform !== el)
        setInput({
            ...input,
            platforms : newPlatforms
        })
        setErrors(validate({
            ...input,
            platforms: newPlatforms
        }))
    }

    useEffect(() => {
        dispatch(fetchGenre());
        dispatch(fetchPlatform())

    }, [dispatch]);




    return (
        <div className={styleForm.backgroundAdd}>
            <NavBarWH/>
            <h1 className={styleForm.h1Add}>UPDATE GAME</h1>
            <form className={styleForm.formAdd} onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label className={styleForm.labelAdd}>Name</label>
                    <input
                        className={styleForm.inputsAdd}
                        type="text"
                        value={input.name}
                        name="name"
                        placeholder='Ej Place to Game'
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        errors.name && (
                            <p className={styleForm.danger}> {errors.name} </p>
                        )
                    }
                </div>

                <div>
                    <label className={styleForm.labelAdd}>Rating</label>
                    <input
                        className={styleForm.inputsAdd}
                        type="number"
                        name="rating"
                        placeholder='0 - 10'
                        value={input.rating}
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        errors.rating && (
                            <div className={styleForm.danger} > {errors.rating} </div>
                        )
                    }
                </div>

                <div>
                    <label className={styleForm.labelAdd}>Release Date</label>
                    <input
                        className={styleForm.inputsAdd}
                        type="text"
                        value={input.release_date}
                        name="release_date"
                        placeholder='Ej 1960-05-30'
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        errors.release_date && (
                            <div className={styleForm.danger} > {errors.release_date} </div>
                        )
                    }
                </div>

                <div >
                    <label className={styleForm.labelAdd} >Image:</label>
                    <input
                        className={styleForm.inputImageAdd}
                        type= "url"
                        name="background_image"
                        value={input.background_image}
                        placeholder="URL"
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>

                <div>
                    <label className={styleForm.labelAdd} >Description</label>
                    <textarea
                    className={styleForm.inputDescriptionAdd}
                        type="text"
                        value={input.description}
                        name="description"
                        onChange={(e) => handleInputChange(e)}
                        rows="5" cols="45"
                    />
                    {
                        errors.description && (
                            <p className={styleForm.danger} > {errors.description} </p>
                        )
                    }
                </div>

                <div className={styleForm.platformsAdd} >
                    <label className={styleForm.labelPlatformsAdd} >Platforms</label>
                    <select  className = {styleForm.platGenreSelectAdd} onChange={(e) => handlePlatformsSelect(e)}>
                        {
                            platforms.map((e) => (
                                <option key={e.id} value={e.name}> {e.name} </option>
                            ))
                        }
                    </select>
                    {input.platforms.map(e => (
                        <div>
                            <li key={e} className={styleForm.liAdd}>{e}<button
                                className={styleForm.buttonCloseAdd}
                                type="button"
                                onClick={() => handlePlatformDelete(e)}
                            >X</button>
                            </li>
                        </div>
                    ))}
                    {
                        errors.platforms && (
                            <p className={styleForm.dangerAdd} > {errors.platforms} </p>
                        )
                    }
                </div >

                <div className={styleForm.genresAdd}>
                    <label className={styleForm.labelGenreAdd} >Genres</label>
                    <select className = {styleForm.platGenreSelectAdd} onChange={(e) => handleGenreSelect(e)}>
                        {
                            genres.map((e) => (
                                <option key={e.id} value={e.name}> {e.name} </option>
                            ))
                        }
                    </select>
                    <ul>
                        {input.genres.map(e => (
                            <div>
                                <li className={styleForm.liAdd}>{e}<button
                                    className={styleForm.buttonCloseAdd}
                                    type="button"
                                    onClick={() => handleGenreDelete(e)}
                                >X</button>
                                </li>
                            </div>
                        ))}
                    </ul>
                    {
                        errors.genres && (
                            <p className={styleForm.dangerAdd2} > {errors.genres} </p>
                        )
                    }
                </div>
                {console.log(errors)}
                {console.log(input)}
                {
                    
                    errors && (errors.name || errors.rating || errors.description || errors.genres || errors.platforms) ?
                        <p className={styleForm.buttonDangerAdd} >Complete Form</p>
                        :
                        <button
                            type="submit"
                            className={styleForm.buttonAdd}
                        >UpDate VIDEOGAME
                        </button>
                }
            </form>
        </div>
        )   
}