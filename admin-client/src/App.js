import './App.css';
import React from "react"
import {Shell} from './Shell'
import {Routes, Route} from "react-router";
import {Navigate} from "react-router";
import {Authentication} from "./Modules/Authentication";
import {Preview} from "./Modules/Preview";
import {MapModule} from "./Modules/MapModule";
import {AgentModule} from "./Modules/AgentModule";
import {Report} from "./Modules/Report";


function App() {

    return (

        <Routes>
            <Route path="/" element={<Shell/>} >
                <Route path="report" element={<Report />} />
                <Route path="agents"  element={<AgentModule />} />
                <Route path="map" element={<MapModule/>} />
            </Route>
            <Route path="/preview" element={<Preview/> } />
            <Route path="/authentication" element={<Authentication/>} />
            <Route path="*" element={<Navigate to="/preview"/>} />
        </Routes>

    );
}

export default App;
