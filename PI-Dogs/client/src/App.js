import {Switch, Route} from 'react-router-dom'
import LandingPage from './views/Landing/Landing';
import Home from './views/Home/Home';
import Detail from './views/Details/Detail';
import CreateDog from './views/Forms/CreateDog';
import styles from './app.module.css'
import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:3011'
axios.defaults.baseURL = 'https://pi-dogs-production-328a.up.railway.app/'

function App() {
  return (
    <div className={styles.Guille}>
     <Switch>
      <Route exact path='/' render={() => <LandingPage />} ></Route>
      <Route path='/home' render={() => <Home />} ></Route>
      <Route path='/dogs/:id' render={() => <Detail />}></Route>
      <Route path='/create' render={() => <CreateDog />}></Route>
     </Switch>
    </div>
  );
}

export default App;
