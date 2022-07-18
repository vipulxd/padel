import React, { useState} from 'react'
import {MapContainer, Marker, Polyline, Popup, TileLayer, useMapEvents} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import marker from '../../Icons/locationMarker.svg'
import pickupMarker from '../../Icons/truck-image.png'
import L from 'leaflet';
import {pickStatusEnum} from "../../Utils/enums";
const newicon = new L.Icon({
    iconUrl: marker,
    iconSize: [35, 35]
});
const pickupImage = new L.Icon({
    iconUrl : pickupMarker ,
    iconSize : [35,35]
})

export const UserMap = ({
                            data,
                            zoom,
                            reportModule,
                            liveModule,
                            lastOccurance,
                            setPolylinePoints,
                            polylinePoints,
                            loading,
                            pickupModule,
                            setCoordinates,
                            assignmentDetails
                        }) => {
    const [center, setCenter] = useState([{latitude: 0, longitude: 0}])
    const polyline_options = {color: '#db7a69', weight: '3',};

    function Locator() {
        const map = useMapEvents({
            click: (l) => {
                setCoordinates(l.latlng)
            }
        })
        return null
    }
    return (
        <>

            {!loading && center && reportModule && (
                <MapContainer
                    center={{lat: Number(lastOccurance[0].latitude), lng: Number(lastOccurance[0].longitude)}}
                    zoom={zoom}
                    style={{height: "100vh", width: "100vw"}}
                    scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {polylinePoints.length > 1 &&
                        <Polyline
                            positions={polylinePoints}
                            pathOptions={polyline_options}/>

                    }
                    {
                        !loading && polylinePoints.length > 0 && polylinePoints.map((item, index) => (
                            <Marker key={index} position={{lat: item[0], lng: item[1]}} icon={newicon}/>
                        ))
                    }
                    }
                </MapContainer>
            )
            }
            {liveModule && (

                <MapContainer
                    center={{lat: Number(center[0].latitude), lng: Number(center[0].longitude)}}
                    zoom={zoom}
                    style={{height: "100vh", width: "100vw"}}
                    scrollWheelZoom={true}>

                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>

            )

            }
            {
                pickupModule && (
                    <MapContainer
                        center={{lat: 0, lng: 0}}
                        zoom={zoom}
                        style={{height: "100vh", width: "100vw"}}
                        scrollWheelZoom={true}>
                        <Locator/>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {
                         assignmentDetails && assignmentDetails.map((item,index)=>   <Marker key={index} position={{lat: item.latitude, lng: item['longitude']}} icon={pickupImage}>
                                 <Popup>
                                     { item.task_subject} {' is ' } <span style={item.status === pickStatusEnum.pending ? {color:'red'}:{color:'green'}}> {item.status.toLowerCase()}</span>
                                     { item.status !== pickStatusEnum.pending && ' by '}
                                     {item.completed_by && item.completed_by}
                                 </Popup>
                         </Marker>
                             )
                        }
                        </MapContainer>
                )
            }
        </>
    )
}


