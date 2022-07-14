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

export const UserMap = ({userId, zoom, report, agentId, date}) => {
    const polyline_options = {color: '#db7a69', weight: '3',};
    const [timeState, setTimeState] = useState({
        from: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
        to: new Date(new Date().setHours(23, 59, 59, 999)).toISOString()
    });
    const [loading ,setLoading] = useState(true);
    const [lastOccurance, setlastOccurance] = useState([{latitude: 0, longitude: 0}]);
    const [polylinePoints, setPolylinePoints] = useState([{
        from_latitude: 0,
        from_longitude: 0,
        to_latitude: 0,
        to_longitude: 0
    }])
    const makeAPICall = async () => {
            try {
                userId && report && getAgentLocationByid(userId, timeState.from, timeState.to).then(data => {
                    if (data.length > 0) {
                        setlastOccurance([{
                            latitude: data[data.length - 1].latitude,
                            longitude: data[data.length - 1].longitude
                        }])
                        drawPolyline(data)
                    }
                    setLoading(false)
                })
                !report && (
                    setLoading(false)
            )
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
        if (data.length > 0) {
            for (let i = 0; i < data.length - 1; i++) {
                points.push(
                    [Number(data[i].latitude),
                        Number(data[i].longitude)]
                )
            }
            setPolylinePoints(points)
        }
    }

    /**
     * Format date defined
     */
    function redefineDate() {
       if(date) {
           setTimeState({
               from: new Date(new Date(date).setHours(0, 0, 0, 0)).toISOString(),
               to: new Date(new Date(date).setHours(23, 59, 59, 999)).toISOString()
           });
       }
    }
    useEffect(() => {
        setPolylinePoints([])
        makeAPICall()
        redefineDate()
    }, [userId, agentId, date])
    return (
        <>
            { !loading  && (
                <MapContainer
                    center={{lat: Number(lastOccurance[0].latitude), lng: Number(lastOccurance[0].longitude)}}
                    zoom={zoom}
                    style={{height: "100vh", width: "100vw"}}
                    scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    { report &&
                    <Polyline
                        positions={polylinePoints}
                        pathOptions={polyline_options}/>

                    }
                    {
                       !loading && polylinePoints.map((item, index) => (
                            <Marker key={index} position={{lat: item[0], lng: item[1]}} icon={newicon}/>
                        ))
                    }
                    }
                </MapContainer>
            )
            }
        </>
    )
}


