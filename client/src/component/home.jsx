import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { fetchVideogame } from '../store/actions';
import Videogame from './videogame'; 
import Pagination from './pagination';
import styleHome from './home.module.css'
import NavBar from './navBar';




export default function Home() {

  const dispatch = useDispatch()
  let videogames = useSelector((state) => state.filteredVideogames)

  //-------Paginado---------
  const [currentPage, setCurrentPage] = useState(1)
  const [videogamesPerPage, setVideogmesPerPage] = useState(15) 
  const indexLastVideogames = currentPage * videogamesPerPage 
  const indexFirstVideogames = indexLastVideogames - videogamesPerPage

  const currentVideogames = videogames.slice(indexFirstVideogames, indexLastVideogames)

  function pagination(pageNumber) {
    setCurrentPage(pageNumber)
  }
  //---------------------------

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  useEffect(() => {
          dispatch(fetchVideogame())
          setLoading(false)

          //.catch(error => setError(error.message))     
      }, [dispatch])
      


  console.log(videogames)
 console.log(currentVideogames)


  if (error) {
    return (
      <div className="ERROR">
        <h1>{error}</h1>
      </div>
    )
  }

  if (loading) {
    return (
      <div className={styleHome.loading}>
        <h1>{}</h1> 
      </div>
    )
  }
  

  return (
     <div className={styleHome.bodyHome}>
     <NavBar/>
    <div>
      <div className={styleHome.bodyHome2}>
        <Pagination
          videogamesPerPage={videogamesPerPage}
          videogames={videogames.length}
          pagination={pagination}
        />
        </div>
      <div className={styleHome.divCard} >
        <div className={styleHome.divCardUnitario}>
        {
          currentVideogames && currentVideogames.map(e => (
            <Videogame
              name={e.name}
              genres={e.genres.map(e => e)}
              image={e.image}
              rating={e.rating}
              id={e.id}
              key={e.id}
            />
          ))
        }
        </div>
      </div>
    </div>
    </div>
  )
}