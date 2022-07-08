import React, {useEffect, useState} from 'react'
import { MapContainer,Marker,   TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import marker from '../../Icons/locationMarker.svg'
import L from 'leaflet';
const newicon = new L.Icon({
    iconUrl: marker,
    iconSize: [30, 30]
});

export const UserMap = () => {
    const agentId = '6081abde-aa64-43a6-9601-e628ef38a9dc';
    const [data, setData] = useState([])
    const makeAPICall = async () => {
        try {
            const response = await fetch(`https://padel-config-api0server.herokuapp.com/api/agent/location/${agentId}`, {mode: 'cors'});
            const data = await response.json();
            setData(data.locations)
        } catch (e) {
        }
    }


    useEffect(() => {
        makeAPICall()
    }, [])
    return (
        data.length > 0 && (
            <MapContainer
               center={{lat:data[data.length -1].latitude,lng:data[data.length -1].longitude}}
                zoom={20}
                style={{height: "100vh", width: "100%"}}
                scrollWheelZoom={true}> <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
                {data &&  data.map((item,index)=>(
                         <Marker key={index} position={[item.latitude,item.longitude]} icon={newicon} />
                     ))
               }

           </MapContainer>
        )

    )
}


