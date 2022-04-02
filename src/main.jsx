import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Index from "./pages/Index";
import './assets/basic.scss'
import UI from "./pages/UI";

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/_ui" element={<UI/>}/>
            <Route path="/" element={<Index/>}></Route>
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
)
