import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Index from "./pages/Index";
import UI from "./pages/UI";
import "@fontsource/roboto"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/300.css"
import AppBase from "./components/AppBase";
import AppProvider from "./AppProvider";

ReactDOM.render(
    <React.StrictMode>
        <AppProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index/>}/>
                    <Route element={<AppBase/>}>
                        <Route path="/_ui" element={<UI/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AppProvider>
    </React.StrictMode>,
    document.getElementById('root')
)