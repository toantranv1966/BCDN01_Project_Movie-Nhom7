import './App.css';
import { createBrowserHistory } from 'history';
import { Router, Switch } from 'react-router';
import {HomeTemplate} from './templates/HomeTemplate/HomeTemplate'
import Home from './pages/Home/Home';
import { AdminTemplate } from './templates/AdminTemplate/AdminTemplate';
import Users from './pages/_AdminPage/Users/Users'
import Films from './pages/_AdminPage/Films/Films';
import AddNewFilm from './pages/_AdminPage/Films/AddNew/AddNewFilm';
import Edit from './pages/_AdminPage/Films/Edit/Edit';
import showtime from './pages/_AdminPage/ShowTime/Showtime'



export const history = createBrowserHistory(); 

function App() {
  return (
    <Router history={history}>
      <Switch>
        <HomeTemplate path="/" exact Component={Home}/>
        <AdminTemplate path="/admin/users" exact Component={Users}/>
        <AdminTemplate path="/admin/films" exact Component={Films}/>
        <AdminTemplate path="/admin/films/addnewfilm" exact Component={AddNewFilm}/>
        <AdminTemplate path="/admin/films/edit/:id" exact Component={Edit}/>
        <AdminTemplate path="/admin/films/showtimes/:id" exact Component={showtime}/>
        
      </Switch>
    </Router>

  );
}

export default App;
