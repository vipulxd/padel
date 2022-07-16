import {UserMap} from "../../Components/MapComponent/userMap";
import {useEffect} from "react";
import {getLiveLocations} from "../../Api";

/**
 * Live locations of every single agent can be seen here
 */

export function MapModule(){
 useEffect(()=>{
     getLiveLocations().then(data=>{

     })
 },[])
    return (
       <><UserMap zoom={3} liveModule={true}/></>
    )
}
