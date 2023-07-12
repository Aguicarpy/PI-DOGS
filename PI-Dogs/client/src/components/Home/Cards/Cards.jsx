import Card from "./Card"
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect} from "react"
import { cleanDetail, getDogs, getTemperaments,searchDogName,filterByTemperaments,filterByName,filterByWeight,filterCreated} from "../../../redux/actions"
import paginate from '../../../helpers/paginate'
import { Link } from "react-router-dom"

const Cards = () => {
    
    const dispatch = useDispatch();
    const dogs = useSelector(state => state.dogs) //trae todas las props de dogs
    
    
    useEffect(()=>{
        dispatch(getDogs());
        dispatch(getTemperaments());
        dispatch(filterByTemperaments())
        return () => dispatch(cleanDetail())
    },[dispatch])
    
    const temperaments = useSelector(state => state.temperaments);
    const [temperament, setTemperament] = useState('all')
    
    const [displayed, setDisplayed] = useState([]);
    const [displayedObj, setDisplayedObj] = useState([]);
    const [page, setPage] = useState(1)
    const [pageMax, setPageMax] = useState(null)
    //helper paginado
    let pagination = paginate(dogs)
    
    //inicio de paginado
    useEffect(() => {
        setDisplayed(pagination.items)
        setDisplayedObj(dogs)
        setPageMax(pagination.totalPages)
    },[dogs])
    
    const handleSelectTemperament = (e) => {
        e.preventDefault();
        dispatch(filterByTemperaments(e.target.value));
        setTemperament(e.target.value);
        setPage(1);
      };
      // Temperament filter
    
      const handleClick = (e) => {
        e.preventDefault();
        dispatch(getDogs());
        setFilterName("az");
        setFilterWeight("normal");
        setFilterBreed("all");
        setTemperament("all");
        setPage(1);
      };
    
      // Weight filter
      const [filterWeight, setFilterWeight] = useState("");
      const handleSortWeight = (e) => {
        e.preventDefault();
        if (e.target.value === "normal") {
          dispatch(getDogs());
        }
        dispatch(filterByWeight(e.target.value));
        setFilterWeight(e.target.value);
        setPage(1);
        setFilterName("");
      };
      // Weight filter
    
      // Name filter
      const [filterName, setFilterName] = useState("");
      const handleSortName = (e) => {
        e.preventDefault();
        dispatch(filterByName(e.target.value));
        setFilterName(e.target.value);
        setPage(1);
        setFilterWeight("");
      };
      // Name filter
    
      // Created or Api filter
      const [filterBreed, setFilterBreed] = useState("");
      const handleSortBreed = (e) => {
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
        setFilterBreed(e.target.value);
        setPage(1);
      };
      // Created or Api filter

    const handlePages = (event) => {
        if(event.target.id ==='prev-btn'){
            if(page === 1) return;
            setPage(page - 1);
            pagination = paginate(displayedObj,page - 1);
            setDisplayed(pagination.items);
        }
        if(event.target.id === 'next-btn'){
            if(page === pageMax) return;
                setPage(page + 1);
                pagination = paginate(displayedObj, page + 1);
                setDisplayed(pagination.items);
        }
        if(event.target.id === 'last-btn'){
            if(page === pageMax) return;
                setPage(pageMax)
                pagination = paginate(displayedObj, pageMax);
                setDisplayed(pagination.items)
            
        }
        if(event.target.id === 'first-btn'){
            if(page === 1) return;
            setPage(1);
            pagination = paginate(displayedObj, 1);
            setDisplayed(pagination.items);
        }
        
    }



    return(
    <>
   

        {/* Filters and Form */}
        <div >
          <div >
            <span> Filter by temperament </span>
            <select
              value={temperament}
              onChange={(e) => handleSelectTemperament(e)}
            >
              <option value="all"> All </option>
              {temperaments.map((temp, index) => (
                <option onClick={(e) => handleClick(e)} key={index}>
                  {temp.name}
                </option>
              ))}
            </select>
            <br />
            <span> Sort by weight </span>
            <select value={filterWeight} onChange={(e) => handleSortWeight(e)}>
              <option value="normal"> ----- </option>
              <option value="asc"> Lightest </option>
              <option value="desc"> Heaviest</option>
            </select>
            <br />
            <span> Sort by breed </span>
            <select value={filterBreed} onChange={(e) => handleSortBreed(e)}>
              <option value="all"> All </option>
              <option value="api"> Api </option>
              <option value="created"> Created </option>
            </select>
            <br />
            <span> Sort by name </span>
            <select value={filterName} onChange={(e) => handleSortName(e)}>
              <option value="az"> A - Z </option>
              <option value="za"> Z - A</option>
            </select>
            <br />
            <div>
              <Link
                to="/create-dog"
                style={{ textDecoration: "none", color: "black" }}
              >
                Create a new breed
              </Link>
            </div>
          </div>
        
   
            {
               displayed.map(({image, name, weight, temperament, id}) => {
                if(typeof id === 'number'){
                    return(
                        <Card 
                        key={id}
                        id={id}
                        image={image}
                        name={name}
                        weight={weight}
                        temperament={temperament}
                        />
                    )
                }
                return <Card/>
               })
            }

        {/* paginado */}
        <div>
            <button id='first-btn' onClick={handlePages}>Primero</button>
            <button id='last-btn' onClick={handlePages}>Ultimo</button>
            <p>{page} de {pageMax}</p>
            <button id='prev-btn' onClick={handlePages}>Atras</button>
            <button id='next-btn' onClick={handlePages}>Siguiente</button>
        </div>
        </div>
    </>
    )
}

export default Cards