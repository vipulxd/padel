import {UserMap} from "../../Components/MapComponent/userMap";
import './index.css'
import {UserSelector} from "./UserSelector";
import {useState} from "react";

export function Report() {
    // const agentId = '6081abde-aa64-43a6-9601-e628ef38a9dc';
    const [selectedAgentId , setSelectedAgentId] =  useState('')

    function setCurrrentAgent(id){
    setSelectedAgentId(id)
    }
    return (
        <>
            <UserSelector setCurrrentAgent={setCurrrentAgent}/>
            <UserMap zoom={6} userId={selectedAgentId}/>
        </>
    )
}
