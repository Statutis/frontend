import React from 'react';
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Index from "./pages/Index";
import UI from "./pages/UI";
import "@fontsource/roboto"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/300.css"
import AppProvider, {UserRefreshEvent} from "./AppProvider";
import Search from './pages/Search';
import RouteBase from "./components/RouteBase";
import Error from "./pages/Error";
import Login from "./pages/Login";
import axios from "axios";
import LegalNotice from "./pages/Legal/LegalNotice";
import store from './Store/store'
import {Provider} from 'react-redux'
import {tokenLocalStorageKey} from "./Store/AuthSlice";
import AuthService from "./Services/AuthService";
import AppBase from "./components/AppBase";

axios.defaults.baseURL = import.meta.env.APP_API_URL

axios.interceptors.request.use(async function (config) {
    let token = localStorage.getItem(tokenLocalStorageKey);


    if (token && config.headers) {
        if (!config.url?.includes("refresh")) {
            const expTimeStamp: number | undefined = AuthService.parseJwt(token)?.exp ?? undefined;
            if (!expTimeStamp)
                return
            const exp = new Date(expTimeStamp * 1000)

            if ((exp.getTime() - (new Date()).getTime()) / 1000 < 900) {
                const refresh = await AuthService.refresh()
                if (refresh) {

                    token = refresh.token;
                    const event = new UserRefreshEvent("onUserRefresh", refresh.token)
                    document.dispatchEvent(event)
                }
            }
        }

        config.headers.Authorization = "Bearer " + token;
    }

    return config;
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <AppProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Index/>}/>
                        <Route element={<RouteBase/>}>
                            <Route path="/_ui" element={<UI/>}/>
                            <Route path="/search" element={<Search/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/legal/notice" element={<LegalNotice/>}/>
                        </Route>
                        <Route path="*" element={<AppBase><Error code={404}/></AppBase>}/>
                    </Routes>
                </BrowserRouter>
            </AppProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)