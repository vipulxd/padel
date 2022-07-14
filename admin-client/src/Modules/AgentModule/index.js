import {CreateAgent} from "./CreateAgent";
import './index.css'
import {AgentList} from "./AgentList";
import {useEffect, useState} from "react";
import {createAgent, getAgentInAssociatedToAdmin} from "../../Api";

export function AgentModule() {
    const [data , setData] = useState([])
    const [info, setInfo] = useState({username: '', password: '', uname: ''})


    function handleChange(e) {
        e.preventDefault();
        setInfo(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    function handleSubmit(e) {
        e.preventDefault()
        createAgent(info).then(response => {
            const _u = data
            _u.push(response[0])
            setData(_u)
        }).catch(e=>{
        })
    }
    useEffect(()=>{
        getAgentInAssociatedToAdmin().then(d=>{
            setData(d)
        })
    },[])
    return (
        <>
            <h2><b>
                <center>Agent control center</center>
            </b></h2>
            <div className={'wrapper-container'}>
                <div>
                    <AgentList data={data}/>
                </div>
                <div className={''}>
                    <div>
                        <CreateAgent handleChange={handleChange} handleSubmit={handleSubmit} info={info}/>
                    </div>
                </div>
            </div>
        </>
    )
}
