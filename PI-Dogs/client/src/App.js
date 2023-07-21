import {Switch, Route} from 'react-router-dom'
import LandingPage from './views/Landing/Landing';
import Home from './views/Home/Home';
import Detail from './views/Details/Detail';
import CreateDog from './views/Forms/CreateDog';
import styles from './app.module.css'

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
