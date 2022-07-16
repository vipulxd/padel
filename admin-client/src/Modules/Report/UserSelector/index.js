import React, {useEffect, useState} from 'react'
import {getAgentInAssociatedToAdmin} from "../../../Api";
import './index.css'
import Dropdown from 'react-bootstrap/Dropdown';
import Loader from "../../../Components/Loader";

export const UserSelector = ({setCurrrentAgent, setDefinedDate , redefineDate,makeApiCall ,loading}) => {
    const [agents, setAgents] = useState([{name: '', agent_id: ''}])
    const [selectedAgent, setSelectedAgent] = useState('')
    useEffect(() => {
            const token = localStorage.getItem('token')
            if (token) {
                getAgentInAssociatedToAdmin().then(
                    d => {
                        setSelectedAgent(d[0].name);
                        setCurrrentAgent(d[0].agent_id);
                        setAgents(d);
                    })
            }
        }
        , [])

    function handleSelect(name, id) {
        setSelectedAgent(name)
        setCurrrentAgent(id)
    }
    var curr = new Date();
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substring(0,10);
    return (
        <>
            <div className={'selector-wrapper bg-white'}>
                <div className={'container-wrapper'}>
                    <div>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                { !loading ? selectedAgent : <Loader />}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {agents.map((items,index) => (
                                    <Dropdown.Item key={index}
                                        onClick={() => handleSelect(items.name, items.agent_id)}>{items.name}</Dropdown.Item>
                                ))
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div>
                        <input type={'date'} defaultValue={date} onChange={event =>  {redefineDate(event.target.value)}}/>
                    </div>
                    <div>
                        <button className={'btn-filled btn-filter'} onClick={()=>makeApiCall()}>{!loading ?  'SEARCH': <Loader />}</button>
                    </div>
                </div>
            </div>
        </>
    )
}
