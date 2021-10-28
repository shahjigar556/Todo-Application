import React from 'react'
import './App.css'
import {Route,Switch} from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import TodoPage from './Pages/TodoPage';
import AddTodo from './Pages/AddTodo';


function App() {
  return (
    <React.Fragment>
       <Route exact path='/' component={LandingPage} />
       <Route exact path='/add' component={AddTodo} />
       <Route exact path='/edit/:id' component={TodoPage} /> 
    </React.Fragment>
  )
}

export default App
