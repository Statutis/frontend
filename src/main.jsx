import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Index from "./pages/Index";
import UI from "./pages/UI";
import "@fontsource/roboto"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/300.css"

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/_ui" element={<UI/>}/>
                <Route path="/" element={<Index/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)
