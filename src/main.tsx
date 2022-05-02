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
import TeamDetails from "./pages/Team/TeamDetails";
import TeamForm from "./pages/Team/TeamForm";
import TeamDelete from "./pages/Team/TeamDelete";
import ServicePickUpCheckType from "./pages/Service/ServicePickUpCheckType";
import ServiceAddDns from "./pages/Service/ServiceAddDns";
import ServiceAddHttp from "./pages/Service/ServiceAddHttp";
import ServiceAddPing from "./pages/Service/ServiceAddPing";
import ServiceDelete from "./pages/Service/ServiceDelete";
import ServiceAddAtlassianStatusPage from "./pages/Service/ServiceAddAtlassianStatusPage";

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
                                <Route path="/teams/:id" element={<TeamDetails/>}/>
                                <Route element={<ProtectedPath><Outlet/></ProtectedPath>}>
                                    <Route path="/groups/:id/delete" element={<GroupDelete/>}/>
                                    <Route path="/groups/:id/edit" element={<GroupForm/>}/>
                                    <Route path="/groups/add" element={<GroupForm/>}/>
                                    <Route path="/profil" element={<Profil/>}/>
                                    <Route path="/teams/:id/edit" element={<TeamForm/>}/>
                                    <Route path="/teams/:id/delete" element={<TeamDelete/>}/>
                                    <Route path="/teams/add" element={<TeamForm/>}/>
                                    <Route path="/services/add/checktype" element={<ServicePickUpCheckType/>}/>

                                    <Route path="/services/add/dns" element={<ServiceAddDns/>}/>
                                    <Route path="/services/edit/dns/:id" element={<ServiceAddDns/>}/>

                                    <Route path="/services/add/http" element={<ServiceAddHttp/>}/>
                                    <Route path="/services/edit/http/:id" element={<ServiceAddHttp/>}/>

                                    <Route path="/services/add/ping" element={<ServiceAddPing/>}/>
                                    <Route path="/services/edit/ping/:id" element={<ServiceAddPing/>}/>

                                    <Route path="/services/add/atlassian_status_page" element={<ServiceAddAtlassianStatusPage/>}/>
                                    <Route path="/services/edit/atlassian_status_page/:id" element={<ServiceAddAtlassianStatusPage/>}/>

                                    <Route path="/services/delete/:guid" element={<ServiceDelete/>}/>
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
