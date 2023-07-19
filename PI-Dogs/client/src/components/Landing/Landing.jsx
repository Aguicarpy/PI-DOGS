import { Link } from 'react-router-dom';
import styles from '../Landing/Landing.module.css'

const LandingPage = () => {
    return(
        <>
            <div className={styles.hero}>
                <h1 className={styles.title}>🐶 Bienvenido a la Woof Woof Page 🐶</h1>
                <Link to='/home'>
                    <button className={styles.bubblyButton}>Ingresar</button>
                </Link>
            </div>
        </>
    )
}

export default LandingPage;