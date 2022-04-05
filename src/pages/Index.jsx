import NavTop from "../components/NavTop";
import '../assets/app/app.scss'
import '../assets/app/pages/main.scss'
import HeaderRight from './../img/index_right.svg'
import HeaderLeft from './../img/index_left.svg'
import DoneImg from '../img/done.png'
import SearchServiceBar from "../components/SearchServiceBar";
import Footer from "../components/Footer";
import GroupServiceCard from "../components/GroupServiceCard";
import useDocumentTitle from "../useDocumentTitle";


function Index() {

    useDocumentTitle("Page d'accueil")

    return <>
        <NavTop/>
        <div className={"app-header"}>
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
        <div className={"fluid-content"}>
            <SearchServiceBar/>
            <div id="service-group-list" className="mt-5">
                {Array(9).fill(null).map((el, i) => {
                    let v = {
                        id: i,
                        name: "ClusterWeb",
                        description: "Lorem ipsum dolor sit amet, consetetur sadipscing ..",
                        countService: 9,
                        countServiceOnline: i + 1,
                        lastCheck: "5 min"
                    };
                    return <GroupServiceCard key={i} value={v}/>
                })}
            </div>
        </div>
        <Footer/>
    </>
}

export default Index;