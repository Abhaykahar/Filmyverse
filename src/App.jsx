import React, { createContext, useState } from 'react'
import Header from './components/Header'
import Cards from './components/Cards'
import { Route, Routes } from 'react-router-dom'
import AddMoives from './components/AddMoives'
import Detail from './components/Detail'
import Login from './components/Login'
import Signup from './components/Signup'


const AppState = createContext();

const App = () => {
  const [login, setLogin] = useState(false);
  const [userName,setUserName] = useState("")
  return (
    <AppState.Provider value={{ login, userName, setLogin, setUserName }}>
    <div className='App relative'>
      <Header />
      <Routes>
        <Route path='/' element={<Cards />} />
        <Route path='/addMovie' element={<AddMoives />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        </Routes>
      </div>
    </AppState.Provider>
  )
}

export default App
export {AppState}

