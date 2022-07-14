import React, {useEffect, useState} from 'react'
import {getAgentInAssociatedToAdmin} from "../../../Api";
import './index.css'
import Dropdown from 'react-bootstrap/Dropdown';
import DateTimePicker from "react-datetime-picker";

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
    const value =  new Date();
    function handleChange(e){
        console.log(e)
    }
    return (
        <>
            <div className={'selector-wrapper'}>
                <div className={'container-wrapper'}>
                    <div>
                        <Dropdown >
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                Select agent
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                { agents.map(items =>(
                                    <Dropdown.Item onClick={setCurrrentAgent(items.agent_id)}>{items.name}</Dropdown.Item>
                                    ))
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div>
                        <DateTimePicker onChange={handleChange} value={value} />
                    </div>
                    <div>
                        <button className={'btn-filled btn-filter'}>SEARCH</button>
                    </div>
                </div>
            </div>
        </>
    )
}
