import React from 'react';
import ReactDOM from 'react-dom'
import {BrowserRouter, Outlet, Route, Routes} from 'react-router-dom'
import Index from "./pages/Index";
import UI from "./pages/UI";
import "@fontsource/roboto"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/300.css"
import AppProvider from "./AppProvider";
import Search from './pages/Search';
import RouteBase from "./components/RouteBase";
import Error from "./pages/Error";
import Login from "./pages/Login";
import axios from "axios";
import LegalNotice from "./pages/Legal/LegalNotice";
import store from './Store/store'
import {Provider} from 'react-redux'
import {tokenLocalStorageKey} from "./Store/AuthSlice";
import authService from "./Services/AuthService";
import AppBase from "./components/AppBase";
import Register from "./pages/Register";
import ProtectedPath from "./ProtectedPath";
import Profil from "./pages/Profil";
import NavTop from "./components/NavTop";
import Footer from "./components/Footer";
import GroupForm from "./pages/Group/GroupForm";
import GroupDelete from "./pages/Group/GroupDelete";
import TeamList from "./pages/Team/TeamList";

const GroupOverview = React.lazy(() => import("./pages/Group/GroupOverview"))

axios.defaults.baseURL = import.meta.env.APP_API_URL

axios.interceptors.request.use(async function (config) {
    let token: string | false | undefined | null = localStorage.getItem(tokenLocalStorageKey);


    if (token && config.headers) {
        if (!config.url?.includes("refresh") && !config.url?.includes("users/me")) {
            token = await authService.fixToken(token)
        }

        if (token)
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
                        <Route element={<><NavTop/><Outlet/><Footer/></>}>
                            <Route path="/" element={<Index/>}/>
                            <Route element={<RouteBase/>}>
                                <Route path="/_ui" element={<UI/>}/>
                                <Route path="/search" element={<Search/>}/>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/register" element={<Register/>}/>
                                <Route path="/legal/notice" element={<LegalNotice/>}/>
                                <Route path="/groups/:id"
                                       element={<React.Suspense fallback={<>...</>}><GroupOverview/></React.Suspense>}/>

                                <Route path="/teams" element={<TeamList/>}/>
                                <Route element={<ProtectedPath><Outlet/></ProtectedPath>}>
                                    <Route path="/groups/:id/delete" element={<GroupDelete/>}/>
                                    <Route path="/groups/:id/edit" element={<GroupForm/>}/>
                                    <Route path="/groups/add" element={<GroupForm/>}/>
                                    <Route path="/profil" element={<Profil/>}/>
                                </Route>

                            </Route>
                            <Route path="*" element={<AppBase><Error code={404}/></AppBase>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AppProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)