import React, {useEffect, useState} from 'react'
import {getAgentInAssociatedToAdmin} from "../../../Api";
import './index.css'
import Dropdown from 'react-bootstrap/Dropdown';
import Loader from "../../../Components/Loader";

export const UserSelector = ({setCurrrentAgent, setDefinedDate}) => {
    const [agents, setAgents] = useState([{name: '', agent_id: ''}])
    const [selectedAgent, setSelectedAgent] = useState('')
    const [loading,setLoading] =  useState(true);
    useEffect(() => {
            const token = localStorage.getItem('token')
            if (token) {
                getAgentInAssociatedToAdmin().then(
                    d => {
                        setSelectedAgent(d[0].name);
                        setCurrrentAgent(d[0].agent_id);
                        setAgents(d);
                        setLoading(false);
                    })
            }
        }
        , [])

    function handleSelect(name, id) {
        setSelectedAgent(name)
        setCurrrentAgent(id)
    }

    return (
        <>
            <div className={'selector-wrapper'}>
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
                        {/*<DateTimePicker onChange={handleChange} value={value} />*/}
                        <input type={'date'} onChange={event => setDefinedDate(event.target.value)}/>
                    </div>
                    <div>
                        <button className={'btn-filled btn-filter'}>SEARCH</button>
                    </div>
                </div>
            </div>
        </>
    )
}
