import { useState } from 'react'
import './App.scss'
import { Route, Routes } from 'react-router'
import MainPage from './pages/MainPage'
import HistoryPage from './pages/HistoryPage'

function App() {

  return (
    <>
      <Routes>
        <Route element={<MainPage/>} path='/'/>
        <Route element={<HistoryPage/>} path='/history'/>
      </Routes>
    </>
  )
}

export default App
