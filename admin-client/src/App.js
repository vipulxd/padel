import './App.css';
import React from "react"
import {Shell} from './Shell'
import {Routes, Route} from "react-router";
import {Navigate} from "react-router";
import {AgentModule, Report ,MapModule,Preview,Pickup,AuthenticationModule} from "./Modules";


function App() {

    return (

        <Routes>
            <Route path="/" element={<Navigate to="/preview"/>}/>
            <Route path="/dashboard/" element={<Shell/> }>
                <Route path="report" element={<Report/>}/>
                <Route path="agents" element={<AgentModule/>}/>
                <Route path="map" element={<MapModule/>}/>
                <Route path="pickup" element={<Pickup />} />
            </Route>
            <Route path={"preview"}
                   element={<Preview/>}/>
            <Route path="/authentication" element={<AuthenticationModule/>}/>
            <Route path="*" element={<Navigate to="/preview"/>}/>
        </Routes>

    );
}


export default App;
