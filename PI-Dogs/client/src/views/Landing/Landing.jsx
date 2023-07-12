import { Link } from "react-router-dom"
// import style from '../views/Landing.module.css'

const Landing = () => {
    return(
        <div>
            <h2>Landing</h2>
            <button>
                <Link to='/home'>Home</Link>
            </button>
        </div>
    )
}

export default Landing