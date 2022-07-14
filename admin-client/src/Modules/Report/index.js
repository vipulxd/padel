import {UserMap} from "../../Components/MapComponent/userMap";
import './index.css'
import {UserSelector} from "./UserSelector";
import {useState} from "react";

export function Report() {
    // const agentId = '6081abde-aa64-43a6-9601-e628ef38a9dc';
    const [selectedAgentId, setSelectedAgentId] = useState('')
    const [date , setDate] =  useState(new Date().toISOString());
    function setCurrrentAgent(id) {
        setSelectedAgentId(id)
    }
    return (
        <>
            <UserSelector setCurrrentAgent={setCurrrentAgent} setDefinedDate={setDate}/>
            <UserMap zoom={16} userId={selectedAgentId} report={true} date={date} />
        </>
    )
}
