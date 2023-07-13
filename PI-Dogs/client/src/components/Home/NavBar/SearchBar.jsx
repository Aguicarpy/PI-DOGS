import {useState} from "react";
import { searchDogName } from "../../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

const SearchBar = () => {
    const [name, setName] = useState('')
    const dispatch = useDispatch();



    const handleChange = (event) => {
        event.preventDefault();
        setName(event.target.value);
        // setPage(1)
    }
    
    // const cleanInput = (event) => {
    //     onSearch(name);
    //     setName('');
    // }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name) {
            return alert("Please write a name");
          } else {
            dispatch(searchDogName(name));
            setName("");
          }
    }

    return(
        <div>
            <input 
            type="text"
            placeholder="Ingrese raza del perro"
            onChange={(e)=> handleChange(e)}
            value={name}
            />
            <button 
            type='submit'
            onClick={(event)=> handleSubmit(event)}>Search Dog</button>
        </div>
    )
}

export default SearchBar;