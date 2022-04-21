import React, {useEffect, useState} from "react";
import useDocumentTitle from "../../useDocumentTitle";
import {getGroup} from "../../api/GroupRepository";
import Group from "../../api/Models/Group";
import {Navigate, useParams} from "react-router-dom";
import "../../assets/app/pages/Group/groupOverview.scss"
import Badge from "../../components/UI/Badge";
import ServiceType from "../../api/Models/Service/ServiceType";
import Team from "../../api/Models/Team";
import {getTeamsByRef} from "../../api/TeamRepository";
import {getServiceTypesByRef} from "../../api/ServiceTypesRepository";
import ServiceCard from "../../components/ServiceCard";


const GroupOverview = () => {

    useDocumentTitle("Groupes")

    const id = useParams<"id">().id;
    if (id === undefined)
        return <Navigate to={"/"}/>

    const [groups, setGroups] = useState<Group>(new Group())
    const [serviceType, setServiceType] = useState<ServiceType[]>([])
    const [team, setTeam] = useState<Team[]>([]);

    useEffect(() => {
        getGroup(id).then(setGroups)
    }, []);

    useEffect(() => {
        groups.services.map(x => {
            getServiceTypesByRef(x.serviceTypeRef).then(x => setServiceType(prevState => {
                if (!prevState.find(search => search.ref === x.ref)) {
                    return [...prevState, x];
                }
                return prevState;
            }));
        });

        groups.teamsRef.map(x => {
            getTeamsByRef(x).then(x => setTeam(prevState => {
                if (!prevState.find(search => search.ref === x.ref)) {
                    return [...prevState, x];
                }
                return prevState;
            }))
        });
    }, [groups])

    return <div className={"content group-overview-card"}>
        <div className={"overview"}>
            <h2>{groups.name}</h2>
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
        </div>
        <div className={"services"}>
            {
                groups.services.map(x => {
                  return <ServiceCard key={x.ref} value={x} />
                })
            }
        </div>
    </div>
}

export default GroupOverview;
