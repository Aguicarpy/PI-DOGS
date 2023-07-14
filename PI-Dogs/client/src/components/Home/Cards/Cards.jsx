// import Card from "./Card"
// import { useDispatch, useSelector } from 'react-redux'
// import { useState, useEffect} from "react"
// import { cleanDetail, getDogs, getTemperaments,filterByTemperaments,filterByName,filterByWeight,filterCreated} from "../../../redux/actions"
// import paginate from '../../../helpers/paginate'
// import { Link } from "react-router-dom"
// import SearchBar from "../NavBar/SearchBar"
// import s from "./Cards.module.css"

// const Cards = () => {
    
//     const dispatch = useDispatch();
//     const dogs = useSelector(state => state.dogs) //trae todas las props de dogs
    
    
//     useEffect(()=>{
//         dispatch(getDogs());
//         dispatch(getTemperaments());
//         dispatch(filterByTemperaments())
//         return () => dispatch(cleanDetail())
//     },[dispatch])
    
//     const temperaments = useSelector(state => state.temperaments);
//     const [temperament, setTemperament] = useState('all')
    
//     const [displayed, setDisplayed] = useState([]);
//     const [displayedObj, setDisplayedObj] = useState([]);
//     const [page, setPage] = useState(1)
//     const [pageMax, setPageMax] = useState(null)
//     //estados filtros
//     const [filterWeight, setFilterWeight] = useState(""); //filterByWeight > acttion
//     const [filterName, setFilterName] = useState(""); //filterByName > action
//     const [filterBreed, setFilterBreed] = useState(""); //filterCreated >action
//     //helper paginado
//     let pagination = paginate(dogs)
    
    
    
//     //inicio de paginado
//     useEffect(() => {
//         setDisplayed(pagination.items)
//         setDisplayedObj(dogs)
//         setPageMax(pagination.totalPages)
//     },[dogs])
    
//     const handleSelectTemperament = (e) => {
//         e.preventDefault();
//         dispatch(filterByTemperaments(e.target.value));
//         setTemperament(e.target.value);
//         setPage(1);
//       };
//       // Temperament filter
    
//       const handleClick = (e) => {
//         e.preventDefault();
//         dispatch(getDogs());
//         setFilterName("az");
//         setFilterWeight("normal");
//         setFilterBreed("all");
//         setTemperament("all");
//         setPage(1);
//       };
    
//       // Weight filter
//       // const [filterWeight, setFilterWeight] = useState("");
//       const handleSortWeight = (e) => {
//         e.preventDefault();
//         if (e.target.value === "normal") {
//           dispatch(getDogs());
//         }
//         dispatch(filterByWeight(e.target.value));
//         setFilterWeight(e.target.value);
//         setPage(1);
//         setFilterName("");
//       };
//       // Weight filter
    
//       // Name filter
//       // const [filterName, setFilterName] = useState("");
//       const handleSortName = (e) => {
//         e.preventDefault();
//         dispatch(filterByName(e.target.value));
//         setFilterName(e.target.value);
//         setPage(1);
//         setFilterWeight("");
//       };
//       // Name filter
    
//       // Created or Api filter
//       // const [filterBreed, setFilterBreed] = useState("");
//       const handleSortBreed = (e) => {
//         e.preventDefault();
//         dispatch(filterCreated(e.target.value));
//         setFilterBreed(e.target.value);
//         setPage(1);
//       };
//       // Created or Api filter

//     const handlePages = (event) => {
//         if(event.target.id ==='prev-btn'){
//             if(page === 1) return;
//             setPage(page - 1);
//             pagination = paginate(displayedObj,page - 1);
//             setDisplayed(pagination.items);
//         }
//         if(event.target.id === 'next-btn'){
//             if(page === pageMax) return;
//                 setPage(page + 1);
//                 pagination = paginate(displayedObj, page + 1);
//                 setDisplayed(pagination.items);
//         }
//         if(event.target.id === 'last-btn'){
//             if(page === pageMax) return;
//                 setPage(pageMax)
//                 pagination = paginate(displayedObj, pageMax);
//                 setDisplayed(pagination.items)
            
//         }
//         if(event.target.id === 'first-btn'){
//             if(page === 1) return;
//             setPage(1);
//             pagination = paginate(displayedObj, 1);
//             setDisplayed(pagination.items);
//         }
        
//     }


//     return(
//     <>
//         <div>
//          <SearchBar />
//         </div>

//         {/* Filters and Form */}
//         <div >
//           <div >
//             <span> Filter by temperament </span>
//             <select
//               value={temperament}
//               onChange={(e) => handleSelectTemperament(e)}
//             >
//               <option value="all"> All </option>
//               {temperaments.map((temp, index) => (
//                 <option onClick={(e) => handleClick(e)} key={index}>
//                   {temp.name}
//                 </option>
//               ))}
//             </select>
//             <br />
//             <span> Sort by weight </span>
//             <select value={filterWeight} onChange={(e) => handleSortWeight(e)}>
//               <option value="normal"> ----- </option>
//               <option value="asc"> Lightest </option>
//               <option value="desc"> Heaviest</option>
//             </select>
//             <br />
//             <span> Sort by breed </span>
//             <select value={filterBreed} onChange={(e) => handleSortBreed(e)}>
//               <option value="all"> All </option>
//               <option value="api"> Api </option>
//               <option value="created"> Created </option>
//             </select>
//             <br />
//             <span> Sort by name </span>
//             <select value={filterName} onChange={(e) => handleSortName(e)}>
//               <option value="az"> A - Z </option>
//               <option value="za"> Z - A</option>
//             </select>
//             <br />
//             <div>
//               <Link
//                 to="/create"
//                 style={{ textDecoration: "none", color: "black" }}
//               >
//                 Create a new breed
//               </Link>
//             </div>
//           </div>
//         <div>
//             {/* Cards */}
//           <div className={s.dogsCards}>
//             <br />
//             {displayed.length === 0 ? (
//               <img  alt="loadingGif" className={s.loading} />
//             ) : (
//               displayed?.map((el, index) => {
//                 return (
//                   <Card
//                     key={index}
//                     id={el.id}
//                     name={el.name}
//                     image={el.image}
//                     temperament={el.temperament}
//                     temperaments={el.temperaments
//                       ?.map((t) => t.name)
//                       .join(", ")}
//                     maxWeight={el.maxWeight}
//                     minWeight={el.minWeight}
//                   />
//                 );
//               })
//             )}
//           </div>

//         </div>

//         {/* paginado */}
//         <div>
//             <button id='first-btn' onClick={handlePages}>Primero</button>
//             <button id='last-btn' onClick={handlePages}>Ultimo</button>
//             <p>{page} de {pageMax}</p>
//             <button id='prev-btn' onClick={handlePages}>Atras</button>
//             <button id='next-btn' onClick={handlePages}>Siguiente</button>
//         </div>
//         </div>
//     </>
//     )
// }

// export default Cards

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getDogs,
//   getTemperaments,
//   filterByTemperaments,
//   filterByName,
//   filterByWeight,
//   filterCreated,
// } from "../../../redux/actions";
// import Card from './Card'
// import { Link } from "react-router-dom";
// import SearchBar from "../NavBar/SearchBar";
// import s from "../Cards/Cards.module.css";

// const Paginado = ({
//   dogsCardsPerPage,
//   allDogs,
//   paginado,
//   paginadoPrev,
//   paginadoNext,
//   currentPage,
// }) => {
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(allDogs / dogsCardsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <nav>
//       <div className={s.paginationCenter}>
//         <div className={s.number} onClick={paginadoPrev}>
//           «
//         </div>
//         {pageNumbers.map((number) => (
//           <div
//             className={currentPage === number ? s.pageActual : s.number}
//             key={number}
//             onClick={() => paginado(number)}
//           >
//             {number}
//           </div>
//         ))}
//         <div className={s.number} onClick={paginadoNext}>
//           »
//         </div>
//       </div>
//     </nav>
//   );
// };


// function Cards() {
//   const dispatch = useDispatch();
//   const allDogs = useSelector((state) => state.dogs);

//   //Paginado
//   const [currentPage, setCurrentPage] = useState(1);
//   const dogsCardsPerPage = 8; // Cuantos dogs va a renderizar por pagina
//   const numberOfLastDog = currentPage * dogsCardsPerPage;
//   const numberOfFirstDog = numberOfLastDog - dogsCardsPerPage;
//   const currentDogs = allDogs.slice(numberOfFirstDog, numberOfLastDog);
//   const paginado = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };
//   // Paginado

//   useEffect(() => {
//     dispatch(getDogs());
//     dispatch(getTemperaments());
//     dispatch(filterByTemperaments());
//   }, [dispatch]);

//   // Temperament filter
//   const temperaments = useSelector((state) => state.temperaments);
//   const [temperament, setTemperamets] = useState("all");

//   const handleSelectTemperament = (e) => {
//     e.preventDefault();
//     dispatch(filterByTemperaments(e.target.value ));
//     setTemperamets(e.target.value);
//     setCurrentPage(1);
//   };
//   // Temperament filter

//   const handleClick = (e) => {
//     e.preventDefault();
//     dispatch(getDogs());
//     setFilterName("az");
//     setFilterWeight("normal");
//     setFilterBreed("all");
//     setTemperamets("all");
//     setCurrentPage(1);
//   };

//   // Weight filter
//   const [filterWeight, setFilterWeight] = useState("");
//   const handleSortWeight = (e) => {
//     e.preventDefault();
//     if (e.target.value === "normal") {
//       dispatch(getDogs());
//     }
//     dispatch(filterByWeight(e.target.value));
//     setFilterWeight(e.target.value);
//     setCurrentPage(1);
//     setFilterName("");
//   };
//   // Weight filter

//   // Name filter
//   const [filterName, setFilterName] = useState("");
//   const handleSortName = (e) => {
//     e.preventDefault();
//     dispatch(filterByName(e.target.value));
//     setFilterName(e.target.value);
//     setCurrentPage(1);
//     setFilterWeight("");
//   };
//   // Name filter

//   // Created or Api filter
//   const [filterBreed, setFilterBreed] = useState("");
//   const handleSortBreed = (e) => {
//     e.preventDefault();
//     dispatch(filterCreated(e.target.value));
//     setFilterBreed(e.target.value);
//     setCurrentPage(1);
//   };
//   // Created or Api filter

//   function paginadoPrev() {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   }

//   function paginadoNext() {
//     let lastPage = Math.ceil(allDogs.length / dogsCardsPerPage);
//     if (currentPage < lastPage) setCurrentPage(currentPage + 1);
//   }

//   return (
//     <div>
//       <div className={s.logoBar}>
//         <a href="https://dogs-app-pi-one.vercel.app/home" className={s.aBar}>
//           <img alt="logo" style={{ width: "380px" }} />
//         </a>
//         <div className={s.credits}>
//           <div className={s.footerDiv}>
//             <p style={{ color: "white", paddingRight: "10px" }}>
//               Santiago Bonetto, 2022
//             </p>
//             <p
//               style={{
//                 color: "white",
//                 fontSize: "1em",
//                 paddingRight: "10px",
//               }}
//             >
//               •
//             </p>

//             <a
//               target="_blank"
//               href="https://www.linkedin.com/in/santiago-bonetto/"
//             >
//               <img
//                 alt="logoLinkedin"
//                 style={{ width: "30px", height: "30px", paddingRight: "10px" }}
//               />
//             </a>
//             <p
//               style={{
//                 color: "white",
//                 fontSize: "1em",
//                 paddingRight: "10px",
//               }}
//             >
//               •
//             </p>

//             <a target="_blank" href="https://github.com/Santirbe98/PI-Dogs">
//               <img
//                 alt="logogithub"
//                 style={{ width: "30px", height: "30px" }}
//               />
//             </a>
//           </div>
//         </div>
//       </div>
//       <div className={s.container}>
//         {/* SearchBar */}
//         <div className={s.searchBar}>
//           <SearchBar setCurrentPage={setCurrentPage} />
//         </div>

//         {/* Filters and Form */}
//         <div className={s.cardFilterContainer}>
//           <div className={s.filters}>
//             <span> Filter by temperament </span>
//             <select
//               value={temperament}
//               onChange={(e) => handleSelectTemperament(e)}
//             >
//               <option value="all"> All </option>
//               {temperaments.map((temp, index) => (
//                 <option onClick={(e) => handleClick(e)} key={index}>
//                   {temp.name}
//                 </option>
//               ))}
//             </select>
//             <br />
//             <span> Sort by weight </span>
//             <select value={filterWeight} onChange={(e) => handleSortWeight(e)}>
//               <option value="normal"> ----- </option>
//               <option value="asc"> Lightest </option>
//               <option value="desc"> Heaviest</option>
//             </select>
//             <br />
//             <span> Sort by breed </span>
//             <select value={filterBreed} onChange={(e) => handleSortBreed(e)}>
//               <option value="all"> All </option>
//               <option value="api"> Api </option>
//               <option value="created"> Created </option>
//             </select>
//             <br />
//             <span> Sort by name </span>
//             <select value={filterName} onChange={(e) => handleSortName(e)}>
//               <option value="az"> A - Z </option>
//               <option value="za"> Z - A</option>
//             </select>
//             <br />
//             <div className={s.buttonCreate}>
//               <Link
//                 to="/create"
//                 style={{ textDecoration: "none", color: "black" }}
//               >
//                 Create a new breed
//               </Link>
//             </div>
//           </div>

//           {/* Cards */}
//           <div className={s.dogsCards}>
//             <br />
//             {currentDogs.length === 0 ? (
//               <img alt="loadingGif" className={s.loading} />
//             ) : (
//               currentDogs?.map((el, index) => {
//                 return (
//                   <Card
//                     key={index}
//                     id={el.id}
//                     name={el.name}
//                     image={el.image}
//                     temperament={el.temperament}
//                     temperaments={el.temperaments
//                       ?.map((t) => t.name)
//                       .join(", ")}
//                     maxWeight={el.maxWeight}
//                     minWeight={el.minWeight}
//                   />
//                 );
//               })
//             )}
//           </div>
//         </div>

//         {/* Paginado */}
//         <div>
//           <Paginado
//             dogsCardsPerPage={dogsCardsPerPage}
//             allDogs={allDogs.length}
//             paginado={paginado}
//             paginadoPrev={paginadoPrev}
//             paginadoNext={paginadoNext}
//             currentPage={currentPage}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Cards;


import React, { Fragment } from "react";
import Card from "./Card";
import Pagination from "../../Pagination/Pagination";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDogs } from "../../../redux/actions";
import styles from "./Cards.module.css";

export default function DogArea() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  return (
    <Fragment>
     <div className={styles.dogsArea}>
        <Pagination
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          pagination={pagination}
          currentPage={currentPage}
        />
        <div className={styles.pagination}></div>
        {
          
          currentDogs.map((el) => { 
            return  (
          <Card
            key={el.id}
            id={el.id}
            name={el.name}
            image={el.image}
            temperament={el.temperament}
            temperaments={el.temperaments}
          />
        )})}
      </div>
    </Fragment>
  );
}