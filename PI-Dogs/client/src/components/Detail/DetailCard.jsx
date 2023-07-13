import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import  {cleanDetail, getDetail} from '../../redux/actions'


const DetailCard = () => {

    let { id } = useParams();
    const { name,image,age, weight, height, temperament} = useSelector((state) => state.dogDetail);
    const dispatch = useDispatch();

    
    useEffect(()=>{
        axios.get(`http://localhost:3011/dogs/${id}`)
        .then(({data}) => {
            if(data.name){
                dispatch(getDetail(data.id))
            }
            else{
                alert('No hay perros con ese id')
            }
        })
        return ()=> {dispatch(cleanDetail())}
    },[dispatch, id])
    
    return(
        <div>
            <h3>{id}</h3>
            <img src={image} alt={name} width='300px'></img>
            <h3>{name}</h3>
            <h3>{age}</h3>
            <h3>{temperament}</h3>
            <h3>{weight}</h3>
            <h3>{height}</h3>

            <Link to="/home">
            <h2>Back</h2>
            </Link>
        </div>
    )
}


export default DetailCard