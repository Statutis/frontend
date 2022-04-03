import NavTop from "../components/UI/NavTop";
import '../assets/app/app.scss'
import '../assets/app/pages/main.scss'
import HeaderRight from './../img/index_right.svg'
import HeaderLeft from './../img/index_left.svg'
import DoneImg from '../img/done.png'
import SearchServiceBar from "../components/SearchServiceBar";
import Footer from "../components/UI/Footer";


function Index() {

    return <>
        <NavTop/>
        <div className={"index-header"}>
            <img src={HeaderLeft} alt="Logo Gauche"/>
            <div>
                <div className={"index-title"}>
                    <img src={DoneImg} alt="Done"/>
                    <div>
                        <h1>Tous les services
                            sont opérationnels</h1>
                        <p className={"text-muted"}>Dernière vérification : 5 min</p>

                    </div>
                </div>
            </div>
            <img src={HeaderRight} alt="Logo Droit"/>
        </div>
        <div className={"content"}>
            <SearchServiceBar/>
        </div>
        <Footer/>
    </>
}

export default Index;