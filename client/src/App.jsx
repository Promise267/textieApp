import React from 'react'
import Login from './modules/Login'
import Register from './modules/Register'
import Home from './modules/Home'
import Chat from './components/Chat'
import {Route, Routes} from "react-router-dom"
import "./App.css"

export default function App() {
  return (
      <Routes>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/register" element = {<Register/>}/>
        <Route path="/home" element = {<Home/>}/>
        <Route path="/home/chat" element = {<Chat/>}/>
      </Routes>
    
  )
}
