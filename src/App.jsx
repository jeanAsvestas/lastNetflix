import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./app.scss"
import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar/Navbar"
import Home from "./pages/Homepage/Home"
import { Routes, Route, Navigate, Fragment } from "react-router-dom";
import Login from "../src/pages/Login/Login"
import Watch from "./pages/watch/Watch"
import Register from "./pages/Register/Register"
import Movies from "./pages/Movies/Movies"
import AuthService from './services/auth_service'
import AdminPage from './pages/admin-pages/admin/Admin';
import ListAdmin from './pages/admin-pages/list/List';
import Single from './pages/admin-pages/single/Single';
import Moviespanel from "./pages/admin-pages/moviespanel/MoviesPanel";
import AddMovie from "./pages/admin-pages/moviespanel/addmovie/AddMovie";
import EditMovie from "./pages/admin-pages/moviespanel/editmovie/EditMovie";
import Account from './pages/Account/Account';
import ProtectedRoute from './ProtectedRoute';
import Plans from './pages/Plans/Plans';



const App = () => {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  //const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);
  console.log(currentUser)
  // useEffect(() => {
  //   if (currentUser?.isAdmin) {
  //     console.log("22222")
  //     setIsAdmin(true);
  //   }
  //   console.log(currentUser);
  //   console.log(isAdmin);
  // }, [currentUser]);


  return <>
    {/* <Navbar props={currentUser} /> */}


    <Routes>

      <Route exact path="/" element={<Home />} />

      <Route exact path="/login" element={!currentUser ? <Login /> : <Navigate to='/' />} />

      <Route exact path="/register" element={!currentUser ? <Register /> : <Navigate to='/' />} />
      <Route exact path="/account" element={currentUser ? <Account props={currentUser} /> : <Navigate to='/' />} />
      <Route exact path="/watch/:id" element={currentUser ? <Watch /> : <Navigate to='/login' />} />
      <Route exact path="/plans" element={currentUser ? <Plans props={currentUser} /> : <Navigate to='/login' />} />

      <Route exact path="/movies" element={<Movies />} />
      {/* <Route exact path="/admin" element={isAdmin ? <AdminPage /> : <Navigate to='/' />} /> */}


      <Route element={<ProtectedRoute admin={currentUser?.isAdmin} />}>

        <Route exact path="/admin"  >
          <Route index element={currentUser?.isAdmin ? <AdminPage /> : <Navigate to='/' /> } />
          <Route path="moviespanel">
            <Route index element={currentUser?.isAdmin ? <Moviespanel /> : <Navigate to='/' /> } />
            <Route path="addmovie" element={currentUser?.isAdmin ? <AddMovie /> : <Navigate to='/' />} />
            <Route path="editmovie/:movieId" element={currentUser?.isAdmin ? <EditMovie /> : <Navigate to='/' />} />
          </Route>
          <Route path="users">
            <Route index element={currentUser?.isAdmin ? <ListAdmin /> : <Navigate to='/' /> } />
            <Route path=":userId" element={currentUser?.isAdmin ? <Single /> : <Navigate to='/' />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  </>

};


export default App;