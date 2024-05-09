import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Encrypt from './Encrypt'

export default function App() {
  return (
    <Routes>
        <Route path="/" element={<Encrypt />} />
        <Route path="/encrypt" element={<div>encrypt</div>}>
            <Route path="/publickey" element={<div>encrypt public key</div>} />
        </Route>
    </Routes>
  )
}
