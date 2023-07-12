import {useState} from 'react'
import axios from 'axios'
import SearchBar from "../../components/Home/NavBar/SearchBar";
import Cards from "../../components/Home/Cards/Cards";


const Home = () => {
  const [dogs, setDogs] = useState([])
  const onSearch = async(name) => {
    try {
      const response = await axios(`http://localhost:3011/dogs/${name}`)
      if(response.data){
        setDogs((oldDogs) => [...oldDogs, response.data])
      }
    } catch (error) {
      alert('No hay perros con esa raza')
    }
  }

    return ( 
      <div className='home'>
      <h2>Jaguas</h2>
      <SearchBar onSearch={onSearch} />
      <Cards dogs={dogs}/>
      </div>
     );
  }

  export default Home;