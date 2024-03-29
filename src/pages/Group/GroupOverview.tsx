import React, {useEffect, useState} from "react";
import useDocumentTitle from "../../useDocumentTitle";
import {getGroup} from "../../api/GroupRepository";
import Group from "../../api/Models/Group";
import {Link, Navigate, useParams} from "react-router-dom";
import "../../assets/app/pages/Group/groupOverview.scss"
import Badge from "../../components/UI/Badge";
import ServiceType from "../../api/Models/Service/ServiceType";
import Team from "../../api/Models/Team";
import {getTeamsByRef} from "../../api/TeamRepository";
import {getServiceTypeByRef} from "../../api/ServiceTypesRepository";
import ServiceCard from "../../components/ServiceCard";
import {getHistoryOfAGroup} from "../../api/HistoryEntryRepository";
import {ServiceState} from "../../api/Models/Service/Service";
import {ResponsiveLineCanvas, Serie} from "@nivo/line";
import {BasicTooltip} from '@nivo/tooltip';
import {useAppSelector} from "../../Store/store";
import Error from "../Error";
import GroupService from "../../Services/GroupService";
import FileInput from "../../components/UI/Input/FileInput";
import GroupAvatar from "../../components/GroupAvatar";


const imagesContentType = ["image/gif", "image/png", "image/jpeg", "image/bmp", "image/webp"]

const convertDate = (date: Date) => {
    return date.getFullYear().toString() + "-" + date.getMonth().toString() + "-" + date.getUTCDate().toString() + " " + date.getHours() + "h" + date.getMinutes() + "m";
}

const GroupOverview = () => {

    useDocumentTitle("Groupes")

    const user = useAppSelector(state => state.auth.user);

    const id = useParams<"id">().id;
    if (id === undefined)
        return <Navigate to={"/"}/>

    const [groups, setGroups] = useState<Group | undefined | false>(undefined)
    const [serviceType, setServiceType] = useState<ServiceType[]>([])
    const [team, setTeam] = useState<Team[]>([]);

    //Charts
    const [data, setData] = useState<Serie[]>([])
    const [maxY, setMaxy] = useState<number>(0)

    useEffect(() => {
        getGroup(id).then(setGroups)
            .catch(() => setGroups(false))
    }, []);

    useEffect(() => {
        if (!groups)
            return
        //Get type of service
        groups.services.map(x => {
            getServiceTypeByRef(x.serviceTypeRef).then(x => setServiceType(prevState => {
                if (!prevState.find(search => search.ref === x.ref)) {
                    return [...prevState, x];
                }
                return prevState;
            }));
        });
        //Get linked teams
        groups.teamsRef.map(x => {
            getTeamsByRef(x).then(x => setTeam(prevState => {
                if (!prevState.find(search => search.ref === x.ref)) {
                    return [...prevState, x];
                }
                return prevState;
            }))
        });
        //Get History of services
        getHistoryOfAGroup(id).then(x => {
            const serie: Serie = {
                id: "Service online",
                data: [],
                color: "black"
            }
            let maxYTmp = 0;

            const rememberService:[x:string,y:string][] = []

            x.forEach((elt) => {

                const idserie = serie.data.findIndex(x => {
                    return x.x == convertDate(new Date(elt.dateTime));
                });

                if (idserie !== -1) {
                    console.log(rememberService);
                    if(rememberService.find(w => w[0] == convertDate(new Date(elt.dateTime)) && w[1] == elt.serviceRef))
                        return

                    const checkY = serie.data[idserie].y
                    if (typeof (checkY) === "number") {
                        serie.data[idserie].y = checkY + 1
                        rememberService.push([convertDate(new Date(elt.dateTime)), elt.serviceRef])
                        if (checkY + 1 > maxYTmp) {
                            maxYTmp = checkY + 1
                        }
                    }

                } else {

                    serie.data.push({
                        x: convertDate(new Date(elt.dateTime)),
                        y: (elt.state === ServiceState.Online) ? 1 : 0
                    })

                    rememberService.push([convertDate(new Date(elt.dateTime)), elt.serviceRef])
                }
            })

            setMaxy(maxYTmp)
            setData([serie])

        })

    }, [groups])

    if (groups === undefined)
        return <div className={"fluid-content hstack stack-center"}>
            <p>Chargement en cours ....</p>
        </div>


    if (groups === false)
        return <Error code={404}/>


    const fileChange = async (file: File | undefined) => {
        await GroupService.updateAvatar(file, groups)
    }

    const clearAvatar = () => GroupService.updateAvatar(undefined, groups)

    const hasRight = (): boolean => {
        if (!user)
            return false;

        return user.isAdmin() || groups.teamsRef.filter(x => user.teamsRef.includes(x)).length != 0
    }


    return <div className={"fluid-content group-overview-card"}>
        <div className={"overview"}>
            <div id="group-header" className="mb-4">
                <GroupAvatar group={groups}/>
                <h2>{groups.name}</h2>
            </div>
            <p>{groups.description}</p>
            <div className={"badges"}>
                {
                    (team.length == 0) ?
                        <Badge value={`Aucune équipe`} icon={"group"} color={"grey"} customClass={"badge-reverse"}/> :
                        team.map(x => {
                            return <Badge key={x.ref} value={`Equipe: ${x.name}`} icon={"group"} color={"grey"}
                                          customClass={"badge-reverse"}/>
                        })
                }

                {
                    serviceType.map(x => {
                        return <Badge key={x.ref} value={x.name} icon={"style"} color={"grey"}
                                      customClass={"badge-reverse"}/>
                    })
                }

            </div>

            <div className={"chart"}>
                <h3>Évolution des services</h3>
                <div>
                    {!data[0] || data[0].data.length == 0 ?
                        <div className="hstack stack-vcenter h-100"><p>Pas encore de donneés ;(</p></div> :
                        <ResponsiveLineCanvas data={data} enableGridX={false} enableGridY={false}
                                              enableArea={true} yScale={{type: 'linear', stacked: true, max: maxY + 1}}
                                              enableCrosshair={false}
                                              curve="monotoneX"
                                              xScale={{type: 'point'}}
                                              enablePoints={false}
                                              legends={[
                                                  {
                                                      anchor: 'bottom-right',
                                                      direction: 'column',
                                                      itemWidth: 0,
                                                      itemHeight: 0,
                                                      effects: [{
                                                          on: 'hover',
                                                          style: {
                                                              itemOpacity: 0
                                                          }
                                                      }]
                                                  }
                                              ]}
                                              tooltip={(v) => {
                                                  return <BasicTooltip value={""} id={""} color={"black"}
                                                                       renderContent={() => {
                                                                           return <>{v.point.data.y} service en ligne
                                                                               le <br/> {v.point.data.x}</>
                                                                       }}/>
                                              }}

                        />
                    }
                </div>
            </div>


            <div className={"hstack stack-end stack-vcenter"}>
                {hasRight() && <>
                    <Link to={"/groups/" + groups.id + "/delete"} className="btn btn-red">
                        <span className="material-icons">delete</span>
                        Supprimer le groupe
                    </Link>
                    <Link to={"/groups/" + groups.id + "/edit"} className="btn">
                        <span className="material-icons">edit</span>
                        Editer le groupe
                    </Link>
                </>
                }
            </div>

            {hasRight() && <>
                <h3 className="mt-6">Avatar de l'équipe : </h3>
                <p>Cet avatar est visible par autres utilisateurs (et publiquement si cela est activé). Cela permet de
                    mettre en avant une identité visuel, afin de faciliter la reconnaissance faites par les
                    utilisateurs </p>
                <div className={"hstack stack-end stack-vcenter mt-4"}>

                    <button className="btn btn-orange" onClick={clearAvatar}>
                        <span className="material-icons">delete</span>
                        <span>Supprimer</span>
                    </button>
                    <FileInput onFileChange={fileChange} contentTypes={imagesContentType}>
                        <span className="material-icons">cloud_upload</span>
                        <span>&nbsp; Changer</span>
                    </FileInput>

                </div>
            </>}
        </div>
        <div className={"services mt-4"}>
            <h3>Liste de services : </h3>
            {
                groups.services.length == 0 ? <p>Ce groupe ne contient aucun service.</p> :
                    groups.services.map(x => {
                        return <ServiceCard key={x.ref} value={x}/>
                    })
            }
            <div className={"hstack stack-end mt-5"}>
                {hasRight() && <Link to={"/services/add/checktype"} className="btn btn-green">
                    <span className="material-icons">add</span> &nbsp;
                    Ajouter un service
                </Link>
                }
            </div>
        </div>
    </div>
}

export default GroupOverview;
