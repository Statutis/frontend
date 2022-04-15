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
import Search from './pages/Search';
import RouteBase from "./components/RouteBase";
import Error from "./pages/Error";
import Login from "./pages/Login";

ReactDOM.render(
    <React.StrictMode>
        <AppProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index/>}/>
                    <Route element={<RouteBase/>}>
                        <Route path="/_ui" element={<UI/>}/>
                        <Route path="/search" element={<Search/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Route>
                    <Route path="*" element={<Error code={404}/>}/>
                </Routes>
            </BrowserRouter>
        </AppProvider>
    </React.StrictMode>,
    document.getElementById('root')
)