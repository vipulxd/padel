import React, {useEffect, useState} from 'react'
import {Map, Marker} from "pigeon-maps";
import Cluster from 'pigeon-cluster'

export const UserMap = () => {
    const agentId = '6081abde-aa64-43a6-9601-e628ef38a9dc';
    const [data, setData] = useState([])
    const makeAPICall = async () => {
        try {
            const response = await fetch(`http://localhost:2001/api/agent/location/${agentId}`, {mode: 'cors'});
            const data = await response.json();
            setData(data.locations)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        makeAPICall()
    }, [])
    return (
        data.length > 0 && <div>
            <Map height={'100vh'}
                 defaultCenter={[Number(data[data.length - 1].latitude), Number(data[data.length - 1].longitude)]}
                 defaultZoom={18}>
                {data.map((item, i ) => (
                    <Marker key={i} width={30}
                            anchor={[Number(item.latitude), Number(item.longitude)]}/>
                ))}
                <img src="./../../public/icons/locationMarker.svg" width={150} height={150} alt=""/>
            </Map>

        </div>
    )
}


