import {Outlet} from "react-router";
import {Navbar} from "./Navbar";


export function Shell(){

    return (
<>
        <div>
            <Navbar />
            <Outlet />

        </div>
        </>
    )
}
