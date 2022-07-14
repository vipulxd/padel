import React, {useEffect, useState} from 'react'
import {ListGroup} from "react-bootstrap";
import {getAgentInAssociatedToAdmin} from "../../../Api";

export function AgentList({data}){
    const [D,setD] = useState(data)
    useEffect(()=>{
        setD(data)
    },[data])
    return (
        <>
            {D  &&  <ListGroup as="ol" numbered style={{width:'400px'}}>
                { D.map((item,index)=>(<ListGroup.Item key={index} as="li">{item.name}</ListGroup.Item>))}
            </ListGroup>
            }
                </>
    )
}