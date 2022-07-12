import React, {useEffect, useState} from 'react'
import { MapContainer,Marker,   TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import marker from '../../Icons/locationMarker.svg'
import L from 'leaflet';
import {getAgentLocationByid} from "../../Api";
const newicon = new L.Icon({
    iconUrl: marker,
    iconSize: [30, 30]
});

export const UserMap = ({userId,zoom}) => {
    const [data, setData] = useState([{latitude:0,longitude:0}])
    const makeAPICall = async () => {
        try {
          userId && getAgentLocationByid(userId).then(data=> {
               setData(data)
           })
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
                zoom={zoom}
                style={{height: "100vh", width: "100vw"}}
                scrollWheelZoom={true}> <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
                {userId &&  data &&  data.map((item,index)=>(
                         <Marker key={index} position={[item.latitude,item.longitude]} icon={newicon} />
                     ))
               }

           </MapContainer>
        )

    )
}


