import {UserMap} from "../../Components/MapComponent/userMap";
import './index.css'
import {UserSelector} from "./UserSelector";
import {useEffect, useState} from "react";
import {getAgentLocationByid} from "../../Api";

export function Report() {
    // const agentId = '6081abde-aa64-43a6-9601-e628ef38a9dc';
    const [selectedAgentId, setSelectedAgentId] = useState('')
    const [data , setData] = useState([]);
    const [date , setDate] =  useState(new Date().toLocaleDateString('zh-Hans-CN',{ year: 'numeric', month: '2-digit', day: '2-digit' }).replaceAll('/','-'));
    const [timeState, setTimeState] = useState({
        from: date + 'T01:0:0.000Z',
        to: date + 'T23:59:59.000Z'
    });
    const [loading ,setLoading] = useState(true);

    const [polylinePoints, setPolylinePoints] = useState([{
        from_latitude: 0,
        from_longitude: 0,
        to_latitude: 0,
        to_longitude: 0
    }])
    const [lastOccurance, setlastOccurance] = useState([{latitude: 0, longitude: 0}]);

    function setCurrrentAgent(id) {
        setSelectedAgentId(id)
    }
    const makeAPICall = async () => {
        try {
            selectedAgentId  && getAgentLocationByid(selectedAgentId, timeState.from, timeState.to).then(data => {
                if (data.length > 0) {
                    setlastOccurance([{
                        latitude: data[data.length - 1].latitude,
                        longitude: data[data.length - 1].longitude
                    }])

                }
                setData(date)
                drawPolyline(data)
                setLoading(false)
            })
            !loading && (
                setLoading(false)
            )
        } catch (e) {
        }
    }

    function redefineDate(changedDate) {
        setTimeState({
            from: changedDate + 'T01:00:00.000Z',
            to: changedDate + 'T23:59:59.000Z'
        });
    }
    useEffect(()=>{

            makeAPICall()

    },[selectedAgentId])
    function drawPolyline(data) {
        let points = [];
        if ( data && data.length > 0) {
            for (let i = 0; i < data.length - 1; i++) {
                points.push(
                    [Number(data[i].latitude),
                        Number(data[i].longitude)]
                )
            }
            setPolylinePoints(points)
        }
    }
    return (
        <>
            <UserSelector setCurrrentAgent={setCurrrentAgent} setDefinedDate={setDate} redefineDate={redefineDate} makeApiCall={makeAPICall}/>
            <UserMap zoom={16} userId={selectedAgentId} loading={loading} report={true} date={date} data={data} lastOccurance={lastOccurance} setPolylinePoints={setPolylinePoints} polylinePoints={polylinePoints} />
        </>
    )
}
