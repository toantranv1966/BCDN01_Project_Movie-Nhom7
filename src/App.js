import './App.css';
import { createBrowserHistory } from 'history';
import { Route, Router, Switch } from 'react-router';
import {HomeTemplate} from './templates/HomeTemplate/HomeTemplate'
import Home from './pages/Home/Home';
import { AdminTemplate } from './templates/AdminTemplate/AdminTemplate';
import Users from './pages/_AdminPage/Users/Users'
import Films from './pages/_AdminPage/Films/Films';
import AddNewFilm from './pages/_AdminPage/Films/AddNew/AddNewFilm';
import Edit from './pages/_AdminPage/Films/Edit/Edit';
import showtime from './pages/_AdminPage/ShowTime/Showtime';
import {UserTemplate} from './templates/UserTemplate/UserTemplate';
import Register from './pages/Register/Register';
import AdminLogin from './pages/Login/AdminLogin';
import AddNewUser from './pages/_AdminPage/Users/AddNew/AddNewUser';
import EditUser from './pages/_AdminPage/Users/Edit/EditUser';

export const history = createBrowserHistory(); 

function App() {
  return (
    <Router history={history}>
      <Switch>
        <HomeTemplate path="/" exact Component={Home}/>
        <AdminTemplate path="/admin" exact Component={Users}/>
        <AdminTemplate path="/admin/users" exact Component={Users}/>
        <AdminTemplate path="/admin/users/addnewuser" exact Component={AddNewUser}/>
        <AdminTemplate path="/admin/users/edit/:id" exact Component={EditUser}/>

        <AdminTemplate path="/admin/films" exact Component={Films}/>
        <AdminTemplate path="/admin/films/addnewfilm" exact Component={AddNewFilm}/>
        <AdminTemplate path="/admin/films/edit/:id" exact Component={Edit}/>
        <AdminTemplate path="/admin/films/showtimes/:id" exact Component={showtime}/>

        <UserTemplate path="/adminlogin" exact Component={AdminLogin}/>
        <UserTemplate path="/register" exact Component={Register}/>
        {/* <Route path="/register" exact Component={Register}/> */}
        
      </Switch>
    </Router>

  );
}

export default App;
