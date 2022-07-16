import React, {useEffect, useState} from 'react'
import './style.css'
import {UserMap} from "../../Components/MapComponent/userMap";
import {Card, Form, Tab} from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import Loader from "../../Components/Loader";
import {assignTaskToAnAgent, getAgentInAssociatedToAdmin, getAllTasks} from "../../Api";
import Button from "react-bootstrap/Button";


export function Pickup() {
    const [selected, setSelected] = useState(false);
    const [coordinates, setCoordinates] = useState();
    const [agent_id , setAgent_id] =  useState('')
    const [task_subject, setTaskSubject] =  useState('')
    const [task_message,setTaskMessage] =  useState('')
    const [assignmentDetails,setAssignmentDetails] = useState([])
    const [sending,setSending]  =  useState(false)
    function setCoords(coords) {
        setCoordinates(coords)
        if (coords) {
            setSelected(true)
        }
    }
    function assignTask(){
        setSending(true)
        assignTaskToAnAgent(agent_id,coordinates.lat,coordinates.lng,task_subject,task_message).then(response=>{
            if(response[0].task_id){
                setSending(false);
                setSelected(false);
                    setAgent_id('');
                    setTaskSubject('');
                setTaskMessage('');
            }
        })
    }
    useEffect(() => {
        getAllTasks().then(response => {
            setAssignmentDetails(response)
        })
},[selected])
    return (

        <>
            <UserMap pickupModule={true} zoom={4} setCoordinates={setCoords} assignmentDetails={assignmentDetails}/>
            {selected && <AssignPanel sending={sending} setSelected={setSelected} setAgent_id={setAgent_id} assignTask={assignTask} setTaskSubject={setTaskSubject} setTaskMessage={setTaskMessage}/>}
        </>
    )
}

function AssignPanel({sending,setSelected,setAgent_id,assignTask,setTaskSubject,setTaskMessage}) {
    const [loading, setloading] = useState(true)

    const [selectedAgent, setSelectedAgent] = useState('')
    const [agents, setAgents] = useState([])
    useEffect(() => {
        getAgentInAssociatedToAdmin().then(data => {
            setSelectedAgent(data[0].name)
            setAgents(data)
            setAgent_id(data[0].agent_id)
            setloading(false);
        })
    }, [])

    function handleSelect(name, id) {
        setSelectedAgent(name);
        setAgent_id(id);
    }

    function handleSubmit(e) {
        e.preventDefault()
    }

    return (
        <>
            <div className={"container-wrapper-assign box-shadow bg-white"}>
                <div className={' h-100 d-flex justify-content-between flex-column'}>
                    <div className={'heading'}>
                        <div>
                            <h1>Assing task</h1>
                        </div>
                        <div className={'close-icon-container'} onClick={() => setSelected(false)}><img
                            src={'/icons/close.png'}/></div>
                    </div>
                    <div className={'form-container'}>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                {!loading ? selectedAgent : <Loader/>}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {agents.map((item, index) => (
                                    <Dropdown.Item key={index}
                                                   onClick={() => handleSelect(item.name, item.agent_id)}>{item.name}</Dropdown.Item>
                                ))
                                }
                            </Dropdown.Menu>
                        </Dropdown>

                    </div>
                    <div>

                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Subject*</Form.Label>
                                <Form.Control type="text" placeholder="Subject" onChange={(e)=>setTaskSubject(e.target.value)}/>
                                <Form.Text className="text-muted">
                                    Add a subject to your location.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Message*</Form.Label>
                                <Form.Control type="text" placeholder="message" className={'message-container'} onChange={(e)=>setTaskMessage(e.target.value)}/>
                            </Form.Group>
                            <Button variant="primary" type="submit" disabled={!selectedAgent.length === 0} onClick={()=>assignTask()}>
                                {!sending ?'Assign':<Loader />}
                            </Button>
                        </Form>

                    </div>
                </div>
            </div>
        </>
    )
}