import React, {useEffect, useState} from 'react'
import {MapContainer, Marker, Polyline, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import marker from '../../Icons/locationMarker.svg'
import L from 'leaflet';

const newicon = new L.Icon({
    iconUrl: marker,
    iconSize: [20, 20]
});

export const UserMap = ({data, zoom, report, lastOccurance, setPolylinePoints, polylinePoints, loading}) => {
    const [center, setCenter] = useState([{latitude: 0, longitude: 0}])
    const polyline_options = {color: '#db7a69', weight: '3',};


    return (
        <>

            {!loading && center && report ? (
                <MapContainer
                    center={{lat: Number(lastOccurance[0].latitude), lng: Number(lastOccurance[0].longitude)}}
                    zoom={zoom}
                    style={{height: "100vh", width: "100vw"}}
                    scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {report &&
                        <Polyline
                            positions={polylinePoints}
                            pathOptions={polyline_options}/>

                    }
                    {
                        !loading && report && polylinePoints.map((item, index) => (
                            <Marker key={index} position={{lat: item[0], lng: item[1]}} icon={newicon}/>
                        ))
                    }
                    }
                </MapContainer>
            ) : (
                <>

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
                </>

            )
            }
        </>
    )
}


