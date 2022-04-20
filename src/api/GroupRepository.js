import axios from "axios";
import Group, {GroupService} from "./Models/Group";

export async function getPublicGroups(){
    const response = await axios.get("/api/groups/public")

    return response.data.map(x=>{
        let g = new Group();
        g.ref = x.ref
        g.mainGroupRef = x.mainGroupRef
        g.name = x.name
        g.description = x.description
        g.lastCheck = new Date(x.lastCheck)
        g.services = x.services.map(y=>{
            let s = new GroupService()
            s.ref = y.ref;
            s.state = y.state;
            s.lastCheck = new Date(y.lastCheck);
            return s;
        })


        return g;
    })
}