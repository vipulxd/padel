import React, {useEffect, useState} from 'react'
import {getAgentInAssociatedToAdmin} from "../../../Api";
import './index.css'

export const UserSelector = ({setCurrrentAgent}) => {
    const [agents, setAgents] = useState([{name: '', agent_id: ''}])

    useEffect(() => {
            getAgentInAssociatedToAdmin().then(
                d => {
                    setAgents(d);
                    setCurrrentAgent(d[0].agent_id)
                })
        }
        , [])

    return (
        <>
            <div className={'selector-wrapper'}>
                <div className={'container-wrapper'}>
                    <div>
                        <select defaultValue={'agents'} name={"agents"}>
                            {agents && agents.map((item, index) => (
                                <option key={index} value={`${item.name}`}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        date-filter
                    </div>
                    <div>
                        <button className={'btn-filled btn-filter'}>SEARCH</button>
                    </div>
                </div>
            </div>
        </>
    )
}
