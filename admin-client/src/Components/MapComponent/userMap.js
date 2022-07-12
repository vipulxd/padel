import React, {useEffect, useState} from 'react'
import {MapContainer, Marker, Polyline, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import marker from '../../Icons/locationMarker.svg'
import L from 'leaflet';
import {getAgentLocationByid} from "../../Api";

const newicon = new L.Icon({
    iconUrl: marker,
    iconSize: [30, 30]
});

export const UserMap = ({userId, zoom, report, agentId}) => {
    const [lastOccurance, setlastOccurance] = useState([{latitude: 0, longitude: 0}]);
    const [polylinePoints, setPolylinePoints] = useState([{
        from_latitude: 0,
        from_longitude: 0,
        to_latitude: 0,
        to_longitude: 0
    }])
    const makeAPICall = async () => {
        try {
            userId && getAgentLocationByid(userId).then(data => {
                setlastOccurance([{
                    latitude: data[data.length - 1].latitude,
                    longitude: data[data.length - 1].longitude
                }])
                drawPolyline(data)
            })
        } catch (e) {
        }
    }

    /**
     * The drawPolyline function formats the data in [[lat,lng]] format
     * @param data
     */
    function drawPolyline(data) {
        let points = [];
        setPolylinePoints([])
        for (let i = 0; i < data.length - 1; i++) {
            points.push(
                [Number(data[i].latitude),
                    Number(data[i].longitude)]
            )
        }
        setPolylinePoints(points)
    }

    const polyline_options = {color: '#db7a69', weight: '3',};
    useEffect(() => {
        makeAPICall()
    }, [userId, agentId])
    return (
        <>
            {lastOccurance[0].latitude !== 0 && (
                <MapContainer
                    center={{lat: Number(lastOccurance[0].latitude), lng: Number(lastOccurance[0].longitude)}}
                    zoom={zoom}
                    style={{height: "100vh", width: "100vw"}}
                    scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Polyline
                        positions={polylinePoints}
                        pathOptions={polyline_options}/>

                    }
                    {
                        polylinePoints && polylinePoints.map((item, index) => (
                            <Marker key={index} position={{lat: item[0], lng: item[1]}} icon={newicon}/>
                        ))
                    }
                </MapContainer>
            )
            }
        </>
    )
}


