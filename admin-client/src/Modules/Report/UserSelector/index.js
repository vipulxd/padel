import React from 'react'


export const UserSelector = ({setCurrrentAgent}) => {
    const [agents,setAgents] =  useState([{name:'',agent_id:''}])
    return (
        <>
            <div className={'selector-wrapper'}>
                <label htmlFor="cars">Select an Agent</label>

                {agents.map((item,index)=>(
                <
                ))}
            </div>
        </>
    )
}
