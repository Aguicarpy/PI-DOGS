import './App.css';
import {Switch, Route} from 'react-router-dom'
import Landing from './views/Landing/Landing';
import Home from './views/Home/Home';
import Detail from './views/Details/Detail';
import CreateDog from './views/Forms/CreateDog';

function App() {
  return (
    <div className="App">
     <Switch>
      <Route exact path='/' render={() => <Landing />} ></Route>
      <Route path='/home' render={() => <Home />} ></Route>
      <Route path='/detail/:id' render={() => <Detail />}></Route>
      <Route path='/home/create' render={() => <CreateDog />}></Route>

     </Switch>
    </div>
  );
}

export default App;
