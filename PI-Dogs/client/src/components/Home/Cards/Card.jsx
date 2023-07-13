import { Link } from "react-router-dom"

const Card = ({image, name, minWeight, maxWeight, temperament, id}) => {
    return(
        <div>
            <img src={image} alt={name} width='500px'/>
            <h2>Name: {name}</h2>
            <h2>Weight: {minWeight} - {maxWeight} kg</h2>
            <h2>Temperaments: {temperament}</h2>
             <Link to={`/detail/${id}`}>Ver detalles</Link>
        </div>
    )
}

export default Card