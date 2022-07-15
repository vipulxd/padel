import {UserMap} from "../../Components/MapComponent/userMap";

/**
 * Live locations of every single agent can be seen here
 */

export function MapModule(){

    return (
       <><UserMap zoom={3} report={false}/></>
    )
}
